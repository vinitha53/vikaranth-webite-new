const defaultImage = { url: "/hero-home-poster.webp", width: 1280, height: 720, alt: "Food ingredients supplied by Vikranth Chemical Corporation" };

export function withSocialMetadata(metadata) {
  const images = metadata.openGraph?.images || [defaultImage];
  return {
    ...metadata,
    robots: { index: true, follow: true, ...metadata.robots, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1, ...metadata.robots?.googleBot } },
    openGraph: { type: "website", siteName: "Vikranth Chemical Corporation", locale: "en_IN", title: metadata.title, description: metadata.description, url: metadata.alternates?.canonical, ...metadata.openGraph, images },
    twitter: { card: "summary_large_image", title: metadata.title, description: metadata.description, ...metadata.twitter, images: metadata.twitter?.images || images.map(image => typeof image === "string" ? image : image.url) },
  };
}
