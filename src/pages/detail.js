import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  const { url } = router.query;

  if (!url) return <p>Memuat...</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Detail Berita</h1>
      <iframe src={url} width="100%" height="600px" title="berita" />
    </main>
  );
}