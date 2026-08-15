// Variabel Global Auto Scroll
let isAutoScrolling = false;
let autoScrollInterval;

// SVG Ikon Play (▶) & Pause (⏸)
const iconPlay = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
const iconPause = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

document.addEventListener("DOMContentLoaded", function () {
  const btnOpen = document.getElementById("btn-open");
  const bottomNav = document.getElementById("bottom-nav-container");
  const bgMusic = document.getElementById("bg-music");
  const btnMusik = document.getElementById("btn-musik");

  // Kunci scroll di awal saat web pertama dimuat
  document.body.classList.add("no-scroll");

  // Set ikon tombol Auto Scroll di awal ke Play (▶)
  const btnAutoScroll = document.getElementById("btn-toggle-autoscroll");
  if (btnAutoScroll) {
    btnAutoScroll.innerHTML = iconPlay;
  }

  // ==========================================
  // 1. FUNGSI BUKA UNDANGAN (OPEN INVITATION)
  // ==========================================
  if (btnOpen) {
    btnOpen.addEventListener("click", function () {
      const mainContent = document.getElementById("main-content");
      const mempelaiSection = document.getElementById("mempelai");

      // A. Sembunyikan tombol "Open Invitation"
      btnOpen.style.display = "none";

      // B. Munculkan konten utama dan mempelai
      if (mainContent) mainContent.style.display = "flex";
      if (mempelaiSection) mempelaiSection.style.display = "flex";

      // C. Buka kunci scroll
      document.body.classList.remove("no-scroll");

      // D. Tampilkan Bottom Navigation
      if (bottomNav) {
        bottomNav.classList.add("show");
      }

      // E. Putar Musik Pernikahan
      if (bgMusic) {
        bgMusic
          .play()
          .then(() => {
            if (btnMusik) btnMusik.classList.add("play");
          })
          .catch((err) => {
            console.log("Autoplay diblokir oleh browser:", err);
          });
      }

      // F. Scroll ke #main-content lalu AKTIFKAN AUTO SCROLL OTO M ATIS
      setTimeout(() => {
        if (mainContent) {
          mainContent.scrollIntoView({ behavior: "smooth" });
        }

        // Aktifkan Auto-Scroll (Ikon akan otomatis berubah jadi Pause ⏸)
        setTimeout(() => {
          startAutoScroll();
        }, 1000);
      }, 100);
    });
  }

  // ==========================================
  // 7. COUNTDOWN TIMER
  // ==========================================
  const tanggalAcara = new Date(2026, 11, 31, 8, 0, 0).getTime();

  const timer = setInterval(function () {
    const sekarang = new Date().getTime();
    const selisih = tanggalAcara - sekarang;

    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor(
      (selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    const detik = Math.floor((selisih % (1000 * 60)) / 1000);

    const elHari = document.getElementById("hari");
    const elJam = document.getElementById("jam");
    const elMenit = document.getElementById("menit");
    const elDetik = document.getElementById("detik");

    if (elHari) elHari.innerText = hari < 10 ? "0" + hari : hari;
    if (elJam) elJam.innerText = jam < 10 ? "0" + jam : jam;
    if (elMenit) elMenit.innerText = menit < 10 ? "0" + menit : menit;
    if (elDetik) elDetik.innerText = detik < 10 ? "0" + detik : detik;

    if (selisih < 0) {
      clearInterval(timer);
      const elCountdown = document.getElementById("countdown");
      if (elCountdown) {
        elCountdown.innerHTML =
          "<p style='font-weight: 900; font-size: 25px; color: #f74701;'>Acara Telah Berlangsung</p>";
      }
    }
  }, 1000);

  // ==========================================
  // 2. TOMBOL TOGGLE MUSIK (PLAY / PAUSE)
  // ==========================================
  if (btnMusik && bgMusic) {
    btnMusik.addEventListener("click", function () {
      if (bgMusic.paused) {
        bgMusic.play();
        btnMusik.classList.add("play");
      } else {
        bgMusic.pause();
        btnMusik.classList.remove("play");
      }
    });
  }
});

// ==========================================
// 8. GALERI SLIDESHOW
// ==========================================
const daftarFoto = [
  "images/foto-pose1.jpg",
  "images/foto-pose2.jpg",
  "images/foto-pose3.jpg",
  "images/foto-pose4.jpg",
  "images/foto-pose5.jpg",
];

let indexFoto = 0;
const elemenFoto = document.getElementById("foto-galeri");

function gantiFoto() {
  if (!elemenFoto) return;
  elemenFoto.classList.remove("active");

  setTimeout(() => {
    indexFoto = (indexFoto + 1) % daftarFoto.length;
    elemenFoto.src = daftarFoto[indexFoto];
    elemenFoto.classList.add("active");
  }, 200);
}

if (elemenFoto) {
  setInterval(gantiFoto, 3000);
}

function tambahElemenPesan(nama, status, pesan) {
  let statusClass = "status-hadir";
  if (status === "Tidak Hadir") statusClass = "status-tidak-hadir";
  else if (status === "Ragu-ragu") statusClass = "status-ragu";

  const itemBaru = document.createElement("div");
  itemBaru.className = "item-pesan";
  itemBaru.innerHTML = `
    <div class="header-pesan">
      <span class="nama-pengirim">${nama}</span>
      <span class="badge-status ${statusClass}">${status}</span>
    </div>
    <p class="isi-pesan">${pesan}</p>
  `;

  if (listPesan) {
    listPesan.insertBefore(itemBaru, listPesan.firstChild);
  }
}

function salinRekening(elementId, btnElement) {
  const el = document.getElementById(elementId);
  if (!el) return;

  navigator.clipboard.writeText(el.innerText).then(() => {
    const teksAsli = btnElement.innerText;
    btnElement.innerText = "Tersalin!";
    btnElement.classList.add("berhasil");

    setTimeout(() => {
      btnElement.innerText = teksAsli;
      btnElement.classList.remove("berhasil");
    }, 2000);
  });
}

// ==========================================
// 3. FUNGSI AUTO SCROLL (SMOOTH & TOUCH AWARE)
// ==========================================
let autoScrollFrameId = null; // Menyimpan ID animasi

function startAutoScroll() {
  const wrapper = document.querySelector(".invitation-wrapper");
  const btnAutoScroll = document.getElementById("btn-toggle-autoscroll");
  if (!wrapper || isAutoScrolling) return;

  isAutoScrolling = true;

  if (btnAutoScroll) {
    btnAutoScroll.innerHTML = iconPause;
  }

  // Gunakan requestAnimationFrame agar 60 FPS mulus di HP
  function scrollStep() {
    if (!isAutoScrolling) return;

    // Nilai kecepatan scroll (bisa disesuaikan, misal 0.8 atau 1)
    wrapper.scrollTop += 0.8; 

    // Berhenti otomatis jika sudah sampai dasar halaman
    if (wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 2) {
      stopAutoScroll();
      return;
    }

    autoScrollFrameId = requestAnimationFrame(scrollStep);
  }

  autoScrollFrameId = requestAnimationFrame(scrollStep);
}

function stopAutoScroll() {
  const btnAutoScroll = document.getElementById("btn-toggle-autoscroll");
  isAutoScrolling = false;

  if (autoScrollFrameId) {
    cancelAnimationFrame(autoScrollFrameId);
  }

  if (btnAutoScroll) {
    btnAutoScroll.innerHTML = iconPlay; // Pastikan kamu punya variabel iconPlay
  }
}

// ==========================================
// DETEKSI TOUCH/SCROLL MANUAL (AGAR TIDAK BENTROK)
// ==========================================
const wrapper = document.querySelector(".invitation-wrapper");

if (wrapper) {
  // Matikan Auto Scroll jika pengguna menyentuh layar HP
  wrapper.addEventListener("touchstart", () => {
    if (isAutoScrolling) stopAutoScroll();
  }, { passive: true });

  // Matikan Auto Scroll jika pengguna menggeser pakai Scroll Wheel Mouse (Desktop)
  wrapper.addEventListener("wheel", () => {
    if (isAutoScrolling) stopAutoScroll();
  }, { passive: true });
}

function stopAutoScroll() {
  const btnAutoScroll = document.getElementById("btn-toggle-autoscroll");

  clearInterval(autoScrollInterval);
  isAutoScrolling = false;

  // Ubah ikon tombol ke Play ▶ saat auto scroll mati
  if (btnAutoScroll) {
    btnAutoScroll.innerHTML = iconPlay;
  }
}

function toggleAutoScroll() {
  if (isAutoScrolling) {
    stopAutoScroll();
  } else {
    startAutoScroll();
  }
}

// ==========================================
// 4. FUNGSI NAVIGASI TOMBOL BAWAH (SCROLL TO)
// ==========================================
function scrollToSection(sectionId) {
  // Matikan auto scroll jika user menekan menu navigasi
  stopAutoScroll();

  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

// ==========================================
// 5. FUNGSI BUKA/TUTUP NAVBAR BAWAH (TOGGLE NAV)
// ==========================================
function toggleNavMenu() {
  const bottomNav = document.getElementById("bottom-nav-container");
  if (bottomNav) {
    bottomNav.classList.toggle("hidden");
  }
}

window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loading-screen");
  const coverContainer = document.querySelector(".cover-container");

  if (loadingScreen) {
    // 1. Beri jeda sebentar lalu sembunyikan loading screen
    setTimeout(function () {
      loadingScreen.classList.add("hidden");

      // 2. Tunggu transisi fade-out loading selesai (400ms), baru pemicu animasi cover dijalankan
      setTimeout(function () {
        if (coverContainer) {
          coverContainer.classList.add("animate");
        }
      }, 50);
    }, 4000); // Durasi tampilnya loading screen
  }
});

// Fungsi untuk memicu Fullscreen bawaan Browser
function triggerFullScreen() {
  const docEl = document.documentElement;

  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch((err) => {
        console.log("Fullscreen diblokir browser:", err);
      });
    } else if (docEl.webkitRequestFullscreen) {
      /* Safari / iOS */
      docEl.webkitRequestFullscreen();
    } else if (docEl.msRequestFullscreen) {
      /* IE/Edge */
      docEl.msRequestFullscreen();
    }
  }
}

// Option A: Pasang pada Tombol "Open Invitation" (Paling Disukai & Natural)
const openBtn = document.querySelector(".btn-open"); // Sesuaikan class tombolmu
if (openBtn) {
  openBtn.addEventListener("click", function () {
    triggerFullScreen(); // Notifikasi "To exit full screen..." akan muncul di sini!
  });
}

// Option B: Pasang di seluruh area layar (Setiap kali ada sentuhan/klik pertama kali)
document.addEventListener(
  "click",
  function () {
    triggerFullScreen();
  },
  { once: true },
); // 'once: true' memastikan skrip ini hanya berjalan 1 kali saja

document.addEventListener("DOMContentLoaded", function () {
  // Ambil seluruh section utama termasuk .section-penutup
  const animatedSections = document.querySelectorAll(
    "#cover-container, #main-content, .mempelai-container, #acara, #galeri, #rsvp, #amplop, .section-penutup",
  );

  if (animatedSections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          } else {
            entry.target.classList.remove("fade-in");
          }
        });
      },
      {
        threshold: 0.15, // Terpicu saat 15% area section masuk ke layar
      },
    );

    animatedSections.forEach((section) => observer.observe(section));
  }
});

// GANTI DENGAN URL WEB APP HASIL DEPLOY KAMU
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxkvdd8I1BxMYMIJNr8vYsfeFMJ6MxOYDyDC8PIZ4s44-MlDDamWYop5sitsGPRproA/exec";

function tambahElemenPesan(nama, status, pesan) {
  let statusClass = "status-hadir";
  if (status === "Tidak Hadir") statusClass = "status-tidak-hadir";
  else if (status === "Ragu-ragu") statusClass = "status-ragu";

  const listPesan = document.getElementById("list-pesan");
  const itemBaru = document.createElement("div");
  itemBaru.className = "item-pesan";
  itemBaru.innerHTML = `
    <div class="header-pesan">
      <span class="nama-pengirim">${nama}</span>
      <span class="badge-status ${statusClass}">${status}</span>
    </div>
    <p class="isi-pesan">${pesan}</p>
  `;

  if (listPesan) {
    listPesan.insertBefore(itemBaru, listPesan.firstChild);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const formRsvp = document.getElementById("form-rsvp");
  const totalPesan = document.getElementById("total-pesan");

  // 1. Muat Semua Ucapan dari Google Sheets saat Halaman Ditinggalkan/Dibuka
  fetch(SCRIPT_URL)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        data.forEach((item) =>
          tambahElemenPesan(item.nama, item.status, item.pesan),
        );
        if (totalPesan) totalPesan.textContent = data.length;
      }
    })
    .catch((err) => console.error("Gagal memuat ucapan:", err));

  // 2. Kirim Ucapan Baru ke Google Sheets
  if (formRsvp) {
    formRsvp.addEventListener("submit", function (e) {
      e.preventDefault();

      const nama = document.getElementById("nama-tamu").value.trim();
      const status = document.getElementById("status-kehadiran").value;
      const pesan = document.getElementById("pesan-ucapan").value.trim();

      if (nama && status && pesan) {
        const payload = { nama, status, pesan };

        // Tampilkan langsung di layar agar responsif
        tambahElemenPesan(nama, status, pesan);
        if (totalPesan)
          totalPesan.textContent = parseInt(totalPesan.textContent || 0) + 1;
        formRsvp.reset();

        // Kirim data ke Google Sheets di background
        fetch(SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(payload),
        }).catch((err) => console.error("Gagal menyimpan ke Sheets:", err));
      }
    });
  }
});

// ==========================================
// 2. INISIALISASI SAAT DOM SIAP
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Ambil nama tamu dari URL parameter (?to=NamaTamu)
  const urlParams = new URLSearchParams(window.location.search);
  const namaTamu = urlParams.get("to");

  if (namaTamu) {
    const elemenNamaTamu = document.getElementById("nama-tamu-cover");
    if (elemenNamaTamu) {
      elemenNamaTamu.innerText = namaTamu;
    }
  }

  // Bind event tombol Buka Undangan
  const btnBuka =
    document.getElementById("btn-buka") || document.querySelector(".btn-buka");
  if (btnBuka) {
    btnBuka.addEventListener("click", bukaUndangan);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const rainContainer = document.getElementById("flower-rain-container");
  if (!rainContainer) return;

  // Emoji bunga pilihan (bisa ditambah/diganti)
  const petals = ["🌸", "🌺", "❤️", "🌸"];

  function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");

    // Ambil emoji acak & set ukuran bervariasi
    petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
    petal.style.fontSize = Math.random() * 14 + 14 + "px"; // Ukuran 14px - 28px

    // Posisi horizontal acak di seluruh lebar layar
    petal.style.left = Math.random() * 100 + "vw";

    // Kecepatan jatuh acak (5 - 10 detik)
    const duration = Math.random() * 5 + 5;
    petal.style.animationDuration = duration + "s";

    // Delay acak sebelum jatuh
    petal.style.animationDelay = Math.random() * 3 + "s";

    rainContainer.appendChild(petal);

    // Hapus elemen yang sudah di bawah agar memori browser tidak penuh
    setTimeout(
      () => {
        petal.remove();
      },
      (duration + 3) * 1000,
    );
  }

  // Buat 15 bunga di awal
  for (let i = 0; i < 15; i++) {
    createPetal();
  }

  // Tambahkan bunga baru secara berkala
  setInterval(createPetal, 900);
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("butterfly-container");
  if (!container) return;

  // Palette Warna Kulit (Nude / Soft Tan / Warm Peach / Cream)
  const skinTones = [
    "#e8d5c4", // Nude Cream terang
    "#d9a785", // Soft Warm Tan
    "#be8259", // Warm Brownish Nude (senada tema)
    "#f5ece3", // Light Nude/Ivory
    "#c49a6c", // Cream Gold Nude
  ];

  function createButterfly() {
    const bf = document.createElement("div");
    bf.classList.add("butterfly");

    // Pilih warna kulit acak dari palette
    const color = skinTones[Math.floor(Math.random() * skinTones.length)];

    // SVG Kupu-Kupu presisi dengan 2 sayap terpisah
    bf.innerHTML = `
      <svg viewBox="0 0 64 64" fill="${color}">
        <g class="wing-left">
          <path d="M32,32 C20,10 5,12 8,28 C10,38 24,34 32,32 Z" opacity="0.95"/>
          <path d="M32,32 C18,34 10,48 18,54 C24,58 30,42 32,32 Z" opacity="0.8"/>
        </g>
        <g class="wing-right">
          <path d="M32,32 C44,10 59,12 56,28 C54,38 40,34 32,32 Z" opacity="0.95"/>
          <path d="M32,32 C46,34 54,48 46,54 C40,58 34,42 32,32 Z" opacity="0.8"/>
        </g>
        <!-- Badan Kupu-kupu -->
        <path d="M31,20 C31,18 33,18 33,20 L33,44 C33,46 31,46 31,44 Z" fill="#3b1101"/>
      </svg>
    `;

    // Posisi awal acak (dari area bawah/samping)
    const startX = Math.random() * 90; // 0vw - 90vw
    const startY = 80 + Math.random() * 20; // 80vh - 100vh

    bf.style.left = startX + "vw";
    bf.style.top = startY + "vh";

    // Arah terbang acak (ke atas & menyamping)
    const targetX = (Math.random() - 0.5) * 200; // pergeseran X (-100px s/d 100px)
    const targetY = -(400 + Math.random() * 300); // terbang ke atas (-400px s/d -700px)
    const rotation = (Math.random() - 0.5) * 60; // kemiringan badan (-30deg s/d 30deg)

    bf.style.setProperty("--tx", `${targetX}px`);
    bf.style.setProperty("--ty", `${targetY}px`);
    bf.style.setProperty("--rot", `${rotation}deg`);

    // Kecepatan terbang (8 sampai 14 detik agar terasa anggun)
    const duration = 8 + Math.random() * 6;
    bf.style.animationDuration = duration + "s";

    container.appendChild(bf);

    // Hapus elemen setelah selesai terbang
    setTimeout(() => {
      bf.remove();
    }, duration * 1000);
  }

  // Buat 3 kupu-kupu di awal
  for (let i = 0; i < 3; i++) {
    setTimeout(createButterfly, i * 1500);
  }

  // Munculkan kupu-kupu baru setiap 4 detik
  setInterval(createButterfly, 4000);
});
