import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://developerdiary.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      images: ["https://developerdiary.vercel.app/images/home-image.jpg"],
    },
    {
      url: "https://developerdiary.vercel.app/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      images: ["https://developerdiary.vercel.app/images/blog-image.jpg"],
    },
    {
      url: "https://developerdiary.vercel.app/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      images: ["https://developerdiary.vercel.app/images/about-image.jpg"],
    },
    {
      url: "https://developerdiary.vercel.app/photos",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      images: ["https://developerdiary.vercel.app/images/about-image.jpg"],
    },
    {
      url: "https://developerdiary.vercel.app/work",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      images: ["https://developerdiary.vercel.app/images/about-image.jpg"],
    },
    {
      url: "https://developerdiary.vercel.app/blog/category/my-journey",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      images: ["https://developerdiary.vercel.app/images/about-image.jpg"],
    },
  ];
}
