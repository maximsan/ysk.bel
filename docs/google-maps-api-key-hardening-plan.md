# Google Maps API key hardening plan

## Summary

Split the work into manual Google Cloud/deployment operations that must be done by a human with account access, and repo changes that can be implemented by an agent. The goal is to keep the current Maps feature working while reducing billing/security risk and preventing silent production deploys without a key.

## Human-only manual operations

- [x] **Human: Audit the existing Google Maps API key.**  
  **Done when:** the owner confirms whether the currently used key is restricted, which APIs it can call, and whether there is any suspicious usage.

- [x] **Human: Restrict the production browser key.**  
  **Done when:** the key is restricted to Maps JavaScript API only and HTTP referrers for `https://уск.бел/*`, `https://www.уск.бел/*`, `https://xn--j1anf.xn--90ais/*`, and `https://www.xn--j1anf.xn--90ais/*`.

- [ ] **Human: Configure billing protections.**  
  **Done when:** Google Cloud has budget alerts and a reasonable daily quota/usage cap for Maps JavaScript API, and unused APIs in the same project are disabled.

- [x] **Human: Rotate the key if needed.**  
  **Done when:** a new restricted key exists, the old key is disabled/deleted after the new one works in production, and no deploy references the old key.

- [x] **Human: Add/update the GitHub Actions secret.**  
  **Done when:** the repository has a `GOOGLE_MAPS_API_KEY` secret containing the restricted production browser key.

- [ ] **Human: Verify the live deployment after restrictions.**  
  **Done when:** the live site loads the map on the allowed domain, the browser console has no Maps key/referrer errors, and Google Cloud usage shows only expected Maps JavaScript API traffic.

## Agent-implementable code changes

- [x] **Agent: Pass `GOOGLE_MAPS_API_KEY` into the CI build step.**  
  **Done when:** `.github/workflows/ci.yaml` passes `secrets.GOOGLE_MAPS_API_KEY` to `yarn build`, because the key is injected at build time.

- [x] **Agent: Add a production-build guard.**  
  **Done when:** builds fail with a clear error only when `REQUIRE_GOOGLE_MAPS_API_KEY=1` and `GOOGLE_MAPS_API_KEY` is missing; local and PR builds without the key still work.

- [x] **Agent: Enable the guard only for production deploy builds.**  
  **Done when:** CI sets `REQUIRE_GOOGLE_MAPS_API_KEY=1` for main-branch production builds, so deploys cannot silently ship without Maps.

- [x] **Agent: Add an accessible fallback for missing or failed Maps.**  
  **Done when:** the contacts map area provides a visible, accessible link to open the estate coordinates in Google Maps if the API key is absent, blocked, or rejected.

- [x] **Agent: Update `googleMapInit` failure handling.**  
  **Done when:** missing-key and script-load-error paths remove the loading state, reveal the fallback, and successful Maps loading behaves as it did before.

- [x] **Agent: Make automated tests independent of live Google Maps.**  
  **Done when:** Playwright blocks Maps endpoints where appropriate and tests assert shell/fallback behavior instead of requiring live map tiles.

- [x] **Agent: Document the environment contract.**  
  **Done when:** `README.md` and `.env.example` explain that the key is public browser configuration, must be Google-side restricted, is injected during `yarn build`, and is required for production CI.

- [x] **Agent: Verify no literal key is committed.**  
  **Done when:** tracked files contain only variable names/placeholders, not an actual `AIza...` key.

## Test plan

- [x] **Agent: Build locally without a key.**  
  **Done when:** `yarn build` succeeds, the fallback map UI exists, and no Maps script URL with a real key is emitted.

- [x] **Agent: Build with the production guard but no key.**  
  **Done when:** `REQUIRE_GOOGLE_MAPS_API_KEY=1 yarn build` fails with the intended clear error.

- [x] **Agent: Build with a dummy key.**  
  **Done when:** `REQUIRE_GOOGLE_MAPS_API_KEY=1 GOOGLE_MAPS_API_KEY=test-key yarn build` succeeds.

- [x] **Agent: Run repo checks.**  
  **Done when:** `yarn lint`, `yarn lint:styles`, `yarn test:unit`, `yarn test:a11y`, and `yarn test:e2e` pass.

- [x] **Agent: Run visual coverage.**  
  **Done when:** `yarn test:visual:home` passes or intentional fallback-related diffs are reviewed.

- [ ] **Human: Validate production after deploy.**  
  **Done when:** the deployed site works with the restricted key and Google Cloud usage/errors look normal.

## Findings, assumptions, and risks

**Findings**

- The key is injected at build time in `eleventy.config.js`.
- A Maps JavaScript API key is public in the browser by design.
- Current tracked files do not contain a real key.
- Current CI build needs explicit key wiring, otherwise production can be built without Maps.

**Assumptions**

- GitHub Actions is the production deploy path for `main`.
- The human has Google Cloud and GitHub repository secret access.
- Both Cyrillic and punycode domain referrers should be allowed.

**Risks**

- The production guard will block deploys until the GitHub secret is configured.
- Incorrect Google Cloud referrer restrictions can break the live map.
- The key can never be fully hidden in this architecture; restrictions, quotas, alerts, and key separation are the real protections.
