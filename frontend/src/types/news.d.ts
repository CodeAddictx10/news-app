export interface INews {
  id: string;
  author: string[];
  title: string;
  source: string;
  publishedAt: string;
  publishedAtFormatted: string;
  description: string;
  category: string;
  url: string;
  images: {
    url: string;
  };
  provider: string;
}
