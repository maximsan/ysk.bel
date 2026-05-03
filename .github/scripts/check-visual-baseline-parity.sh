#!/usr/bin/env bash
# Compare Playwright snapshot basename lists per platform (darwin vs linux).
# Fails CI if either side is missing files — see update-visual-snapshots workflow.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

check_visual_parity() {
  local dir="$1"
  local label="$2"
  local abs="$ROOT/$dir"
  (
    cd "$abs"
    darwin=$(ls *-darwin.png 2>/dev/null | sed 's/-darwin\.png$//' | sort)
    linux=$(ls *-linux.png 2>/dev/null | sed 's/-linux\.png$//' | sort)
    if ! diff <(echo "$darwin") <(echo "$linux") > "/tmp/parity-${label}.diff"; then
      echo "::error::Visual baseline mismatch ($label) — every test must have both '-darwin.png' and '-linux.png'."
      echo "Missing on one side (left = darwin-only, right = linux-only):"
      cat "/tmp/parity-${label}.diff"
      echo ""
      echo "Fix: run 'yarn test:visual:update' locally for '-darwin' and apply the 'update-visual-snapshots' label for '-linux'."
      exit 1
    fi
    echo "Baselines in $label: ($(echo "$darwin" | wc -l | tr -d ' ') tests × 2 platforms)."
  )
}

check_visual_parity tests/visual/home-snapshots home-snapshots
check_visual_parity tests/visual/width-snapshots width-snapshots
