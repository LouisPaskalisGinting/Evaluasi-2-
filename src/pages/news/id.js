// pages/news/[id].js
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

// --- HAPUS ATAU KOMENTARI DUMMY DATA INI ---
// const dummyNews = [ /* ... */ ];
// --- AKHIR DUMMY DATA ---

export default function NewsDetailPage({ newsItem }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>; // Tampilkan loading saat fallback
  }

  if (!newsItem) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "#dc3545" }}>
        Berita tidak ditemukan atau terjadi kesalahan.
        <br />
        <Link href="/">Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Head>
        <title>{newsItem.title}</title>
        <meta name="description" content={newsItem.excerpt} />
      </Head>

      <header
        style={{
          marginBottom: "30px",
          borderBottom: "1px solid #eee",
          paddingBottom: "20px",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#0070f3",
            fontSize: "1.1em",
          }}
        >
          &larr; Kembali ke Beranda
        </Link>
        <h1 style={{ marginTop: "20px", color: "#333" }}>{newsItem.title}</h1>
        <p style={{ fontSize: "0.9em", color: "#777", margin: "10px 0 0 0" }}>
          {newsItem.source} - {newsItem.time}
        </p>
      </header>

      <main>
        <img
          src={newsItem.imageUrl}
          alt={newsItem.title}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            marginBottom: "30px",
          }}
        />
        {/* Gunakan dangerouslySetInnerHTML untuk merender konten HTML */}
        <div
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
          style={{ lineHeight: "1.7", color: "#444", fontSize: "1.1em" }}
        ></div>
        {newsItem.url && (
          <p
            style={{
              marginTop: "30px",
              borderTop: "1px solid #eee",
              paddingTop: "20px",
            }}
          >
            Baca selengkapnya di sumber aslinya:{" "}
            <a
              href={newsItem.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0070f3", textDecoration: "underline" }}
            >
              {newsItem.url}
            </a>
          </p>
        )}
      </main>

      <footer
        style={{
          textAlign: "center",
          marginTop: "60px",
          paddingTop: "20px",
          borderTop: "1px solid #eee",
          color: "#777",
        }}
      >
        <p>
          &copy; {new Date().getFullYear()} Portal Berita. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

// getStaticPaths untuk menentukan path yang akan digenerate saat build time
export async function getStaticPaths() {
  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  if (!NEWS_API_KEY) {
    console.warn(
      "NEWS_API_KEY is not set for getStaticPaths in [id].js. Paths might be empty."
    );
    return { paths: [], fallback: "blocking" };
  }

  // Ambil data untuk membuat paths. Sesuaikan dengan query di index.js
  const url = `https://newsapi.org/v2/everything?q=(teknologi OR ekonomi OR olahraga)&sortBy=publishedAt&pageSize=9&apiKey=${NEWS_API_KEY}`;
  let articles = [];
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === "ok" && data.articles) {
      articles = data.articles.slice(0, 9); // Ambil beberapa artikel saja
    }
  } catch (error) {
    console.error("Error fetching articles for getStaticPaths:", error);
  }

  // Buat paths berdasarkan URL artikel
  const paths = articles
    .filter((article) => article.url) // Pastikan URL ada
    .map((article) => ({
      params: { id: encodeURIComponent(article.url) }, // Gunakan URL sebagai ID, encode agar aman di URL
    }));

  return {
    paths,
    fallback: "blocking", // 'blocking' akan menunggu halaman digenerate saat request pertama
  };
}

// getStaticProps untuk mengambil data detail berita
export async function getStaticProps({ params }) {
  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  if (!NEWS_API_KEY) {
    console.error("NEWS_API_KEY is not set for getStaticProps in [id].js.");
    return { props: { newsItem: null }, revalidate: 1 };
  }

  const decodedUrl = decodeURIComponent(params.id); // Decode URL kembali

  // Ini tidak efisien karena fetch semua berita lagi.
  // Cara yang lebih baik adalah jika News API memiliki endpoint detail berdasarkan ID unik.
  // Karena tidak, kita fetch semua dan cari.
  const url = `https://newsapi.org/v2/everything?q=(teknologi OR ekonomi OR olahraga)&sortBy=publishedAt&pageSize=9&apiKey=${NEWS_API_KEY}`;
  let newsItem = null;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === "ok" && data.articles) {
      // Cari artikel yang URL-nya cocok
      const foundArticle = data.articles.find(
        (article) => article.url === decodedUrl
      );

      if (foundArticle) {
        newsItem = {
          id: foundArticle.url, // ID adalah URL
          title: foundArticle.title || "Judul Tidak Tersedia",
          source: foundArticle.source.name || "Sumber Tidak Diketahui",
          time: foundArticle.publishedAt
            ? new Date(foundArticle.publishedAt).toLocaleString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Waktu Tidak Tersedia",
          imageUrl:
            foundArticle.urlToImage ||
            "https://via.placeholder.com/600x400/cccccc/FFFFFF?text=No+Image",
          excerpt: foundArticle.description || "Tidak ada deskripsi tersedia.",
          content:
            foundArticle.content ||
            foundArticle.description ||
            "Tidak ada konten tersedia.",
          url: foundArticle.url || "#",
        };
      }
    }
  } catch (error) {
    console.error("Error fetching detail news:", error);
  }

  return {
    props: {
      newsItem,
    },
    revalidate: 60, // Revalidate detail halaman setiap 60 detik
  };
}
