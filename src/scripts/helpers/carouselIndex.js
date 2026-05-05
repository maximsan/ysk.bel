export function stepCarouselIndex(currentIndex, delta, length) {
  if (length <= 0) {
    return 0;
  }
  return (currentIndex + delta + length) % length;
}
