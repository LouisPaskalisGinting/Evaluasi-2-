export default async function fetchNews() {
  const apiKey = process.env.NEWSAPI_KEY;

  const res = await fetch(
    `https://newsapi.org/v2/everything?q=indonesia&pageSize=10&apiKey=${apiKey}`
  );

  if (!res.ok) {
    console.error("Gagal fetch data berita:", res.statusText);
    return [];
  }

  const data = await res.json();

  console.log("API Response:", data);

  return (
    data.articles?.map((a) => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.urlToImage,
      publishedAt: a.publishedAt,
    })) || []
  );
}
