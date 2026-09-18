/** Scale stroke to match a 24x24-icon stroke width on non-24 viewBoxes */
export function scaledStrokeWidth(strokeWidth, viewBoxSize) {
  return strokeWidth * (viewBoxSize / 24);
}
