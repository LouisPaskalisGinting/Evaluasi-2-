// src/components/NewsCard.js
import Link from "next/link";

export default function NewsCard({ article }) {
  return (
    <article className="bg-white shadow-md rounded-xl p-4 mb-6">
      <h2 className="text-xl font-bold mb-2">{article.title}</h2>
      <p className="mb-2">{article.description}</p>
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full max-w-md rounded-lg mb-2"
        />
      )}
      <p className="text-sm text-gray-500 mb-2">
        {new Date(article.publishedAt).toLocaleString("id-ID")}
      </p>
      <Link
        href={`/detail?url=${encodeURIComponent(article.url)}`}
        className="text-blue-600 hover:underline"
      >
        Lihat detail
      </Link>
    </article>
  );
}
