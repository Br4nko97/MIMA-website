/**
 * The grain texture is applied via `.grain-overlay` class on <body> (see globals.css)
 * — this component is a no-op kept for explicit composability if we want to
 * mount/unmount the grain dynamically per page in the future.
 */
export function Grain() {
  return null;
}
