// pages/login.js
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Ini adalah bagian penting untuk redirect setelah login
  useEffect(() => {
    if (status === "authenticated") {
      // Jika sudah login, redirect ke halaman utama ('/')
      // Pastikan path ini sesuai dengan halaman daftar berita utama Anda
      router.push("/");
    }
  }, [status, router]); // Dependency array: efek ini akan berjalan ketika 'status' atau 'router' berubah

  if (status === "loading") {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
    );
  }

  // Jika sudah login dan sudah di-redirect, komponen ini seharusnya tidak terlihat
  // Tapi untuk jaga-jaga, tampilkan pesan jika user entah bagaimana masih di sini
  if (status === "authenticated") {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Anda sudah login sebagai {session.user.name}. Mengarahkan...</p>
        <button
          onClick={() => signOut()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Logout
        </button>
        <p>
          <Link href="/">Kembali ke Beranda</Link>
        </p>
      </div>
    );
  }

  // ... (bagian form login jika belum authenticated) ...
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "30px", color: "#333" }}>Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(
              "Ini hanya contoh form, gunakan login dengan Google di bawah."
            );
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Username"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Password"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Login Manual
          </button>
        </form>
        <div
          style={{
            marginTop: "20px",
            borderTop: "1px solid #eee",
            paddingTop: "20px",
          }}
        >
          <p>Atau login dengan:</p>
          <button
            onClick={() => signIn("google")} // Ini yang memicu login Google OAuth2
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#db4437",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Login dengan Google
          </button>
        </div>
      </div>
    </div>
  );
}
