import createCache from "@emotion/cache";

export default function createEmotionCache() {
  return createCache({
    key: "mui",
    insertionPoint: document.querySelector(
      'meta[name="emotion-insertion-point"]'
    ) as HTMLElement,
  });
}
