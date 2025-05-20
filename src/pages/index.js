// pages/index.js
import Head from "next/head";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

// --- HAPUS ATAU KOMENTARI DUMMY DATA INI ---
// const dummyNews = [
//   {
//     id: "1",
//     title: "Berita Utama dari Sumber A: Teknologi Terbaru (Dummy)",
//     source: "Sumber A",
//     time: "2 jam lalu",
//     imageUrl: "https://via.placeholder.com/150/007bff/FFFFFF?text=Dummy+News+1",
//     excerpt:
//       "Ini adalah kutipan singkat berita tentang teknologi terbaru yang menarik perhatian.",
//     content: "Konten lengkap berita dummy 1.",
//   },
//   {
//     id: "2",
//     title: "Berita Utama dari Sumber B: Ekonomi Global (Dummy)",
//     source: "Sumber B",
//     time: "4 jam lalu",
//     imageUrl: "https://via.placeholder.com/150/28a745/FFFFFF?text=Dummy+News+2",
//     excerpt:
//       "Analisis mendalam tentang dampak ekonomi global dan prediksi pasar.",
//     content: "Konten lengkap berita dummy 2.",
//   },
//   {
//     id: "3",
//     title: "Berita Utama dari Sumber C: Olahraga Terkini (Dummy)",
//     source: "Sumber C",
//     time: "1 hari lalu",
//     imageUrl: "https://via.placeholder.com/150/ffc107/FFFFFF?text=Dummy+News+3",
//     excerpt:
//       "Sorotan pertandingan olahraga terbaru dan wawancara eksklusif dengan atlet.",
//     content: "Konten lengkap berita dummy 3.",
//   },
// ];
// --- AKHIR DUMMY DATA ---

export default function Home({ news }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Logika untuk melindungi route (tetap sama)
  if (status === "loading") {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontSize: "1.5em",
          color: "#555",
        }}
      >
        Loading autentikasi...
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontSize: "1.5em",
          color: "#777",
        }}
      >
        Anda belum login. Mengarahkan ke halaman login...
      </div>
    );
  }

  // Debugging: Log data 'news' yang diterima komponen
  console.log("News data received by Home component:", news);

  // Jika sudah diautentikasi (status === "authenticated"), tampilkan konten halaman utama
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Head>
        <title>Portal Berita</title>
        <meta name="description" content="Portal Berita Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          borderBottom: "1px solid #eee",
          paddingBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0, color: "#333" }}>Portal Berita</h1>
        <nav>
          {session ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "15px", color: "#555" }}>
                Halo, {session.user.name || session.user.email}!
              </span>
              <button
                onClick={() => signOut()}
                style={{
                  padding: "8px 15px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              style={{
                textDecoration: "none",
                color: "#0070f3",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          )}
        </nav>
      </header>

      <main>
        <h2 style={{ marginBottom: "30px", color: "#555" }}>Berita Utama</h2>
        {news && news.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "30px",
            }}
          >
            {news.map((item) => (
              <div
                key={item.id} // Pastikan key unik
                style={{
                  background: "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      margin: "0 0 10px 0",
                      fontSize: "1.2em",
                      color: "#333",
                    }}
                  >
                    <Link
                      href={`/news/${item.id}`}
                      style={{ textDecoration: "none", color: "#333" }}
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9em",
                      color: "#777",
                      margin: "0 0 15px 0",
                    }}
                  >
                    {item.source} - {item.time}
                  </p>
                  <p style={{ fontSize: "1em", color: "#555" }}>
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/news/${item.id}`}
                    style={{
                      display: "inline-block",
                      marginTop: "15px",
                      padding: "8px 15px",
                      backgroundColor: "#0070f3",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#777",
              fontSize: "1.2em",
              marginTop: "50px",
            }}
          >
            Tidak ada berita yang tersedia saat ini. Silakan coba lagi nanti.
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

// Bagian getStaticProps untuk mengambil data dari News API
export async function getStaticProps() {
  console.log("Running getStaticProps with News API...");
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  if (!NEWS_API_KEY) {
    console.error("ERROR: NEWS_API_KEY is not set in .env.local!");
    return {
      props: {
        news: [], // Kirim array kosong jika API key tidak ada
      },
      revalidate: 1, // Coba lagi lebih sering jika ada masalah
    };
  }

  // Anda bisa mengganti sumber berita ini sesuai keinginan Anda
  // Contoh: 'bbc-news,cnn,reuters,techcrunch,the-verge'
  const sources = "bbc-news,cnn,reuters";
  // Atau cari berita teratas secara umum
  // const url = `https://newsapi.org/v2/top-headlines?country=id&pageSize=9&apiKey=${NEWS_API_KEY}`;
  // Atau campurkan sumber dan kategori
  const url = `https://newsapi.org/v2/everything?q=(teknologi OR ekonomi OR olahraga)&sortBy=publishedAt&pageSize=9&apiKey=${NEWS_API_KEY}`;

  let news = [];
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`HTTP error! status: ${res.status}, body: ${errorBody}`);
      // Jika ada masalah API key atau kuota, status bisa 401, 429
      if (res.status === 401) {
        console.error("News API: Unauthorized. Check your API Key.");
      } else if (res.status === 429) {
        console.error(
          "News API: Too Many Requests. You've hit your API rate limit."
        );
      }
      throw new Error(`Failed to fetch news from API: Status ${res.status}`);
    }
    const data = await res.json();

    if (data.status === "ok" && data.articles && data.articles.length > 0) {
      news = data.articles.slice(0, 9).map((article, index) => ({
        // Pastikan ID unik. Menggunakan URL jika ada, jika tidak, gabungan judul dan indeks.
        id:
          article.url ||
          `news-${index}-${
            article.title
              ? article.title
                  .replace(/\s+/g, "-")
                  .toLowerCase()
                  .substring(0, 50)
              : Math.random().toString(36).substring(7)
          }`,
        title: article.title || "Judul Tidak Tersedia",
        source: article.source.name || "Sumber Tidak Diketahui",
        time: article.publishedAt
          ? new Date(article.publishedAt).toLocaleString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Waktu Tidak Tersedia",
        imageUrl:
          article.urlToImage ||
          "https://via.placeholder.com/150/cccccc/FFFFFF?text=No+Image",
        excerpt: article.description || "Tidak ada deskripsi tersedia.",
        content:
          article.content ||
          article.description ||
          "Tidak ada konten tersedia.", // Konten lengkap mungkin tidak selalu ada di API gratis
        url: article.url || "#", // URL asli berita
      }));
    } else {
      console.log(
        "News API returned no articles or status not 'ok'. Full response:",
        data
      );
    }
  } catch (error) {
    console.error("Caught error fetching news from News API:", error);
    // Jika ada error, kita akan mengembalikan array kosong, atau bisa juga fallback ke dummy data
    // news = dummyNews; // Aktifkan ini jika Anda ingin fallback ke dummyNews saat ada error
  }

  console.log("Data prepared in getStaticProps (from API):", news);

  return {
    props: {
      news,
    },
    revalidate: 60, // Regenerasi halaman setiap 60 detik (ISR)
  };
}
