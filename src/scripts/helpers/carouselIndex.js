/**
 * Next index when moving by `delta` in a ring of `length` items (prev/next arrows).
 */
export function stepCarouselIndex(currentIndex, delta, length) {
  if (length <= 0) {
    return 0;
  }
  return (currentIndex + delta + length) % length;
}
