import type {
  AboutContent,
  Article,
  ContactInfo,
  EventItem,
  GalleryItem,
  HomeContent,
  Message,
  NewsContent,
  Panitia,
  SiteSettings,
  TeamContent,
} from "../types/content";
import { slugify } from "./utils";

/**
 * Seed konten PUFA Law (port dari `legacy/data.js` → `PufaData.defaults`).
 * Fase 1: dipakai langsung oleh situs. Fase 2: dipakai untuk seed database.
 */

export const homeContent: HomeContent = {
  eyebrow: "PUFA Law Collection 2026",
  title: "THE GOLDEN | HOUR | COLLECTION",
  sub: "Excellence in Law. Elevate Every Case.",
  btn1: "JELAJAHI EVENTS",
  btn2: "LIHAT GALLERY",
  stats: [
    { num: "8+", label: "Tahun Berdiri" },
    { num: "120+", label: "Events Sukses" },
    { num: "5K+", label: "Anggota" },
  ],
  ctaEyebrow: "Bergabunglah Bersama Kami",
  ctaTitle: "Jadilah Bagian dari Keluarga PUFA Law",
  ctaDesc: "Bersama kami, setiap momen menjadi kenangan yang tak terlupakan.",
  ctaBtn: "HUBUNGI KAMI SEKARANG",
};

export const aboutContent: AboutContent = {
  badgeNum: "8+",
  badgeLabel: "YEARS OF EXCELLENCE",
  quote: '"Setiap kasus adalah kepercayaan. Kami menjaganya dengan integritas."',
  para1:
    "PUFA Law didirikan pada tahun 2018 dengan visi sederhana namun kuat: menghadirkan layanan hukum yang tidak hanya kompeten secara teknis, tetapi juga bermakna bagi setiap anggota dan klien yang kami layani.",
  para2:
    "Kami percaya bahwa keunggulan hukum bukan sekadar tentang menang atau kalah, melainkan tentang perhatian terhadap detail, ketulusan dalam advokasi, dan keadilan yang terukir dalam setiap putusan.",
  values: [
    {
      name: "Integritas",
      desc: "Standar etika tertinggi dalam setiap aspek pelaksanaan tugas dan pelayanan hukum.",
    },
    {
      name: "Keunggulan",
      desc: "Komitmen pada kualitas yang tak tertandingi dalam setiap kasus yang kami tangani.",
    },
    {
      name: "Komunitas",
      desc: "Membangun jaringan hukum yang kuat dan bermakna antar anggota dan mitra.",
    },
    {
      name: "Inovasi",
      desc: "Selalu menghadirkan pendekatan hukum segar yang adaptif terhadap perubahan zaman.",
    },
  ],
  timeline: [
    { year: "2018", desc: "PUFA Law resmi berdiri dengan 25 anggota founding member." },
    { year: "2020", desc: "Gala Night pertama sukses digelar, dihadiri 300+ tamu." },
    { year: "2022", desc: "Ekspansi ke 5 kota besar di Indonesia, 1000+ anggota aktif." },
    { year: "2026", desc: "Kini hadir secara digital, 5000+ anggota aktif nationwide." },
  ],
};

export const events: EventItem[] = [
  {
    id: 1,
    name: "PUFA Law Gala Night 2026",
    date: "2026-07-15",
    time: "19:00",
    location: "Ballroom Hotel Mulia, Jakarta",
    category: "Gala Dinner",
    status: "Upcoming",
    desc: "Malam gala tahunan PUFA Law yang menampilkan penampilan istimewa, makan malam mewah, dan penghargaan kepada anggota berprestasi.",
    btn: "DAFTAR SEKARANG",
  },
  {
    id: 2,
    name: "Grand Legal Seminar Series 2026",
    date: "2026-08-22",
    time: "14:00",
    location: "JCC Senayan, Jakarta",
    category: "Seminar",
    status: "Upcoming",
    desc: "Seminar hukum eksklusif PUFA Law yang menghadirkan pembicara-pembicara terkemuka dari dunia hukum Indonesia dan internasional.",
    btn: "DAFTAR SEKARANG",
  },
  {
    id: 3,
    name: "Legal Art Exhibition 2025",
    date: "2025-12-10",
    time: "10:00",
    location: "Museum Nasional, Jakarta",
    category: "Exhibition",
    status: "Selesai",
    desc: "Pameran seni dan karya hukum yang menampilkan koleksi dari para praktisi dan akademisi hukum ternama Indonesia.",
    btn: "LIHAT DOKUMENTASI",
  },
  {
    id: 4,
    name: "Legal Writing Masterclass",
    date: "2025-06-05",
    time: "09:00",
    location: "Studio PUFA Law, Jakarta",
    category: "Workshop",
    status: "Selesai",
    desc: "Workshop penulisan hukum eksklusif bersama pakar-pakar hukum kelas dunia untuk anggota PUFA Law.",
    btn: "LIHAT DOKUMENTASI",
  },
];

export const panitia: Panitia[] = [
  { id: 1, name: "Budi Santoso", role: "Ketua Panitia", division: "Koordinasi Umum", event: "PUFA Law Gala Night 2026" },
  { id: 2, name: "Siti Rahayu", role: "Wakil Ketua", division: "Koordinasi Umum", event: "PUFA Law Gala Night 2026" },
  { id: 3, name: "Ahmad Fauzi", role: "Koordinator Logistik", division: "Divisi Logistik", event: "PUFA Law Gala Night 2026" },
  { id: 4, name: "Dewi Lestari", role: "Koordinator Humas", division: "Divisi Humas", event: "PUFA Law Gala Night 2026" },
  { id: 5, name: "Rizki Pratama", role: "Ketua Panitia", division: "Koordinasi Umum", event: "Grand Legal Seminar Series 2026" },
  { id: 6, name: "Maya Putri", role: "Wakil Ketua", division: "Divisi Acara", event: "Grand Legal Seminar Series 2026" },
  { id: 7, name: "Hendra Gunawan", role: "Koordinator Dana", division: "Divisi Keuangan", event: "Grand Legal Seminar Series 2026" },
  { id: 8, name: "Putri Salsabila", role: "Talent Coordinator", division: "Divisi Talent", event: "Grand Legal Seminar Series 2026" },
];

export const gallery: GalleryItem[] = [
  { id: 1, title: "Legal Collection Shoot", category: "Events", bg: "linear-gradient(135deg,#f0e8d0,#C9A84C)", label: "LEGAL ART" },
  { id: 2, title: "Gala Night 2025", category: "Events", bg: "linear-gradient(135deg,#8B1A2B,#C9A84C)", label: "GALA NIGHT" },
  { id: 3, title: "Legal Seminar Series", category: "Seminar", bg: "linear-gradient(135deg,#2C2420,#8B6914)", label: "SEMINAR" },
  { id: 4, title: "Golden Hour Collection", category: "Events", bg: "linear-gradient(135deg,#e8e0c8,#C9A84C)", label: "GOLDEN HOUR" },
  { id: 5, title: "Team Behind the Scenes", category: "Team", bg: "linear-gradient(135deg,#1A1410,#8B1A2B)", label: "TEAM" },
  { id: 6, title: "Art Exhibition 2025", category: "Workshop", bg: "linear-gradient(135deg,#d4c898,#8B6914)", label: "EXHIBITION" },
  { id: 7, title: "PUFA Law Celebration", category: "Events", bg: "linear-gradient(135deg,#8B1A2B,#C9A84C)", label: "CELEBRATION" },
  { id: 8, title: "Legal Writing Workshop", category: "Workshop", bg: "linear-gradient(135deg,#f0e8d0,#C9A84C)", label: "WORKSHOP" },
];

export const galleryFilters: string[] = ["Semua", "Events", "Seminar", "Workshop", "Team"];

export const teamContent: TeamContent = {
  featured: {
    name: "Ayu Maharani",
    role: "Ketua Umum & Founder",
    bio: 'Ayu Maharani mendirikan PUFA Law dengan visi menciptakan komunitas hukum yang inklusif namun tetap profesional. Dengan pengalaman 15+ tahun di bidang hukum dan advokasi, beliau membawa PUFA Law menjadi organisasi hukum terkemuka di Indonesia. Filosofinya sederhana: "Keadilan sejati adalah tentang bagaimana setiap orang merasa dihargai dan dilindungi."',
  },
  members: [
    { id: 1, name: "Reza Firmansyah", role: "Creative Director", dept: "Divisi Kreatif & Desain", status: "Aktif" },
    { id: 2, name: "Indah Permata", role: "Head of Events", dept: "Divisi Event & Produksi", status: "Aktif" },
    { id: 3, name: "Hendra Gunawan", role: "CFO", dept: "Divisi Keuangan", status: "Aktif" },
    { id: 4, name: "Dewi Lestari", role: "Head of PR", dept: "Divisi Humas & Media", status: "Aktif" },
    { id: 5, name: "Rizki Pratama", role: "Operations Manager", dept: "Divisi Operasional", status: "Aktif" },
    { id: 6, name: "Maya Putri", role: "Legal Director", dept: "Divisi Hukum & Advokasi", status: "Aktif" },
    { id: 7, name: "Budi Santoso", role: "Partnership Manager", dept: "Divisi Kemitraan", status: "Aktif" },
    { id: 8, name: "Siti Rahayu", role: "Member Relations", dept: "Divisi Keanggotaan", status: "Aktif" },
  ],
};

const rawArticles: Omit<Article, "slug">[] = [
  {
    id: 1,
    title: "Koleksi Publikasi Eksklusif: The Golden Hour Series",
    category: "Hukum",
    author: "Admin",
    date: "2026-05-15",
    status: "Published",
    excerpt:
      "Peluncuran koleksi publikasi terbaru yang terinspirasi dari dedikasi hukum dan keadilan Indonesia...",
    content: `PUFA Law dengan bangga memperkenalkan The Golden Hour Series — koleksi publikasi eksklusif yang merangkum pemikiran, riset, dan refleksi hukum dari para praktisi serta akademisi terbaik di lingkungan PUFA Law. Koleksi ini lahir dari keyakinan bahwa ilmu hukum tumbuh paling subur ketika dibagikan secara terbuka.

Setiap edisi dalam seri ini membahas isu hukum kontemporer secara mendalam, mulai dari hukum bisnis, perlindungan data pribadi, hingga akses keadilan bagi masyarakat. Penyajiannya dirancang agar tetap kredibel secara akademik namun mudah dipahami oleh pembaca umum.

The Golden Hour Series juga menjadi ruang kolaborasi: anggota PUFA Law dari berbagai kota turut menyumbang artikel, studi kasus, dan catatan praktik. Dengan begitu, koleksi ini merefleksikan keberagaman pengalaman hukum di seluruh Indonesia.

Koleksi perdana akan tersedia bagi seluruh anggota aktif. Untuk informasi pemesanan dan kontribusi naskah edisi berikutnya, silakan hubungi tim PUFA Law melalui halaman kontak.`,
    bg: "linear-gradient(135deg,#f0e8d0,#C9A84C)",
    label: "HUKUM",
  },
  {
    id: 2,
    title: "Persiapan Gala Night PUFA Law 2026 Telah Dimulai",
    category: "Event",
    author: "Admin",
    date: "2026-05-10",
    status: "Published",
    excerpt:
      "Tim PUFA Law mulai mempersiapkan acara gala tahunan yang akan digelar di Ballroom Hotel Mulia Jakarta...",
    content: `Persiapan PUFA Law Gala Night 2026 resmi dimulai. Acara puncak tahunan ini akan digelar di Ballroom Hotel Mulia, Jakarta, dan diproyeksikan menjadi gala terbesar yang pernah diselenggarakan PUFA Law sepanjang sejarahnya.

Panitia yang terdiri dari berbagai divisi — mulai dari acara, logistik, hingga humas — telah memulai rapat koordinasi mingguan. Tahun ini, konsep yang diusung adalah "The Golden Hour", sebuah perayaan atas dedikasi, integritas, dan pencapaian para anggota sepanjang tahun.

Selain jamuan makan malam mewah, gala akan menampilkan penghargaan kepada anggota berprestasi, penampilan istimewa, serta sesi jejaring (networking) bersama tokoh-tokoh hukum nasional. Kehadiran tamu undangan dari kalangan akademisi dan praktisi turut memperkaya makna acara.

Pendaftaran keikutsertaan akan dibuka dalam waktu dekat. Anggota yang ingin terlibat sebagai panitia atau memperoleh informasi tiket dapat menghubungi tim PUFA Law melalui halaman kontak.`,
    bg: "linear-gradient(135deg,#2C2420,#8B1A2B)",
    label: "EVENT",
  },
  {
    id: 3,
    title: "PUFA Law Mencapai 5.000 Anggota Aktif di Seluruh Indonesia",
    category: "Komunitas",
    author: "Admin",
    date: "2026-05-05",
    status: "Published",
    excerpt:
      "Tonggak sejarah baru tercapai: PUFA Law kini memiliki 5.000 anggota aktif yang tersebar di 15 kota...",
    content: `Sebuah tonggak sejarah baru tercapai: PUFA Law kini resmi memiliki 5.000 anggota aktif yang tersebar di 15 kota besar di seluruh Indonesia. Pencapaian ini menandai pertumbuhan organisasi yang konsisten sejak didirikan pada 2018.

Pertumbuhan ini tidak lepas dari komitmen PUFA Law membangun komunitas hukum yang inklusif namun tetap profesional. Melalui seminar, workshop, dan program pendampingan, anggota memperoleh ruang untuk berkembang sekaligus berkontribusi bagi masyarakat.

Ekspansi ke berbagai kota juga memperkuat jaringan kolaborasi antar-anggota lintas daerah. Banyak inisiatif hukum pro bono kini lahir dari kolaborasi antar-cabang, memberi dampak nyata bagi akses keadilan di komunitas lokal.

Ke depan, PUFA Law menargetkan penguatan program digital agar anggota di seluruh nusantara dapat terhubung tanpa hambatan jarak. Bagi yang ingin bergabung, informasi keanggotaan tersedia melalui halaman kontak.`,
    bg: "linear-gradient(135deg,#e8e0c8,#8B6914)",
    label: "KOMUNITAS",
  },
];

export const newsContent: NewsContent = {
  featured: {
    title: "PUFA Law Annual Seminar 2026: Mendefinisikan Ulang Hukum Indonesia",
    category: "Hukum",
    author: "Siti Rahayu",
    date: "2026-05-20",
    readtime: "5 menit baca",
    excerpt:
      "Seminar tahunan PUFA Law kembali hadir dengan lebih spektakuler dari sebelumnya. Tahun ini, menghadirkan 28 pembicara dari seluruh nusantara dan 5 nama internasional, menciptakan kolaborasi hukum yang memukau...",
    content: `PUFA Law Annual Seminar 2026 kembali hadir dengan skala yang lebih besar dan ambisi yang lebih berani: mendefinisikan ulang arah hukum Indonesia di tengah perubahan zaman. Tahun ini, seminar menghadirkan 28 pembicara dari seluruh nusantara serta 5 nama internasional.

Mengangkat tema besar tentang transformasi hukum di era digital, seminar membahas isu-isu mendesak seperti perlindungan data pribadi, kecerdasan buatan dan tanggung jawab hukum, hingga reformasi akses keadilan bagi kelompok rentan.

Format seminar dirancang interaktif: selain sesi pleno, peserta dapat mengikuti diskusi kelompok terfokus, lokakarya penulisan hukum, dan sesi mentoring bersama praktisi senior. Pendekatan ini memastikan setiap peserta pulang dengan wawasan yang dapat langsung diterapkan.

Kolaborasi lintas generasi dan lintas daerah menjadi ruh acara ini. PUFA Law percaya bahwa masa depan hukum Indonesia ditentukan oleh kemampuan kita berdialog, berbagi, dan bekerja sama.

Informasi pendaftaran dan kemitraan untuk seminar tahun ini dapat diperoleh melalui halaman kontak PUFA Law.`,
  },
  articles: rawArticles.map((a) => ({ ...a, slug: slugify(a.title) })),
};

export const contactInfo: ContactInfo = {
  tagline: "Mari Wujudkan Tujuan Hukum Bersama PUFA Law",
  desc: "Kami siap membantu Anda merencanakan dan melaksanakan kebutuhan hukum Anda. Tim profesional PUFA Law selalu siap memberikan konsultasi dan solusi terbaik.",
  address: "Jl. Jenderal Sudirman No. 88\nJakarta Pusat, DKI Jakarta 10220",
  phone: "+62 21 5555 7890\n+62 812 3456 7890 (WhatsApp)",
  email: "hello@pufalaw.id\nevents@pufalaw.id",
  hours: "Senin – Jumat: 09.00 – 18.00 WIB\nSabtu: 10.00 – 15.00 WIB",
  formOptions: [
    "Konsultasi Hukum",
    "Informasi Keanggotaan",
    "Kerjasama & Partnership",
    "Pertanyaan Umum",
  ],
};

export const siteSettings: SiteSettings = {
  siteName: "PUFA LAW",
  tagline: "Excellence in Law",
  emailUtama: "hello@pufalaw.id",
  whatsapp: "+62 812 3456 7890",
  copyright: "© 2026 PUFA Law. All Rights Reserved.",
  footerDesc:
    "Organisasi hukum terkemuka yang menghadirkan pengalaman eksklusif dan pelayanan profesional untuk setiap kebutuhan hukum Anda.",
  footerRight: "Excellence in Law",
};

export const messages: Message[] = [
  {
    id: 1,
    name: "Budi Prasetyo",
    email: "budi@gmail.com",
    purpose: "Konsultasi Hukum",
    date: "2026-06-01",
    status: "Belum Dibaca",
    msg: "Saya ingin konsultasi terkait permasalahan hukum perusahaan.",
  },
  {
    id: 2,
    name: "Rina Kusuma",
    email: "rina@yahoo.com",
    purpose: "Informasi Keanggotaan",
    date: "2026-05-30",
    status: "Dibaca",
    msg: "Mohon info lebih lanjut mengenai cara bergabung sebagai anggota PUFA Law.",
  },
];
