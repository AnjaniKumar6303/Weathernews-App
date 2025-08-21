export type Article = {
  title: string;
  description: string | null;
  url: string;
  source: string;
  publishedAt: string;
};

export async function fetchNews(categories: string[], apiKey: string): Promise<Article[]> {
  const endpoint = "https://newsapi.org/v2/top-headlines";
  const country = "us";
  const results: Article[] = [];

  for (const cat of categories) {
    const url = `${endpoint}?country=${country}&category=${cat}&pageSize=10`;
    const res = await fetch(url, { headers: { "X-Api-Key": apiKey } });
    const data = await res.json();
    const mapped: Article[] = (data.articles || []).map((a: any) => ({
      title: a.title,
      description: a.description,
      url: a.url,
      source: a.source?.name || "",
      publishedAt: a.publishedAt,
    }));
    results.push(...mapped);
  }
  return results;
}
