# News Portal (Next.js)

Simple web portal berita dengan login Google (OAuth2) dan sumber berita dari NewsAPI.

## Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Copy .env.example menjadi .env.local
cp .env.example .env.local
#   lalu isi GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEWSAPI_KEY

# 3. Jalankan developer server
npm run dev
```

Buka `http://localhost:3000` di browser.

## Fitur
- Login dengan Google menggunakan **next-auth**.
- Menampilkan daftar berita utama dari **NewsAPI**.
- Halaman detail membuka berita dengan `iframe`.