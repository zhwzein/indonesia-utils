# indonesia-utils

[![CI](https://github.com/zhwzein/indonesia-utils/actions/workflows/test.yml/badge.svg)](https://github.com/zhwzein/indonesia-utils/actions/workflows/test.yml)
[![npm version](https://img.shields.io/npm/v/indonesia-utils.svg)](https://www.npmjs.com/package/indonesia-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Pustaka JavaScript/TypeScript utilitas teringan, modular, _tree-shakeable_, dan tanpa dependensi pihak ketiga (_zero dependencies_) yang dirancang khusus untuk memenuhi kebutuhan pengembang di Indonesia.

Mulai dari pemformatan mata uang Rupiah, validasi nomor telepon lokal, validasi nomor identitas (NIK/NPWP), manipulasi penanggalan Indonesia, hingga manipulasi string umum dan validasi data.

---

## Fitur Utama

- 🇮🇩 **Identitas Indonesia**: Validasi & Pemformatan NIK dan NPWP (Format Baru 16 digit & Format Lama 15 digit).
- 💰 **Mata Uang Rupiah**: Konversi angka menjadi format Rupiah formal maupun informal, serta parsing string Rupiah kembali ke angka.
- 📞 **Nomor Telepon**: Normalisasi, validasi, pemformatan, dan sensor (_masking_) nomor telepon Indonesia (+62 / 08).
- 📅 **Penanggalan Indonesia**: Format hari dan nama bulan dalam Bahasa Indonesia KBBI standar.
- 🔠 **Teks & String**: Konversi ke camelCase, snake_case, kebab-case, titleCase, slugify, pembuangan aksen, dan pembatasan panjang teks (_truncate_).
- 🎲 **Penghasil Acak**: Pembuatan UUID v4, OTP, angka acak, dan string acak.
- 🧪 **Kualitas Produksi**: 100% ditulis dengan TypeScript, cakupan pengujian (_coverage_) 94%+, _tree-shakeable_, dan mendukung ESM + CommonJS secara _out-of-the-box_.

---

## Instalasi

Gunakan npm, yarn, pnpm, atau bun untuk menginstal pustaka:

```bash
npm install indonesia-utils
# atau
yarn add indonesia-utils
# atau
pnpm add indonesia-utils
# atau
bun add indonesia-utils
```

---

## Mulai Cepat

Pustaka ini mendukung impor modul ESM (modern) maupun CommonJS (klasik).

### Menggunakan ESM (TypeScript / Modern Node)

```ts
import { formatRupiah, validateNIK, formatTanggalIndonesia } from 'indonesia-utils';

// Format Rupiah
console.log(formatRupiah(1500000)); // "Rp1.500.000"
console.log(formatRupiah(1500000, { formal: true })); // "Rp 1.500.000"

// Validasi NIK
const isValid = validateNIK('3171011708450001');
console.log(isValid); // true

// Tanggal Indonesia
console.log(formatTanggalIndonesia(new Date(), { day: true })); // "Minggu, 19 Juli 2026"
```

### Menggunakan CommonJS

```js
const { normalizePhone, generateOTP } = require('indonesia-utils');

console.log(normalizePhone('0812-3456-7890')); // "+6281234567890"
console.log(generateOTP(6)); // "482015"
```

---

## Referensi API

### 💰 Mata Uang (`currency`)

#### `formatRupiah(value, options?)`

Memformat angka menjadi string mata uang Rupiah.

- **Parameter**:
  - `value: number`
  - `options?: { formal?: boolean; symbol?: string; decimalDigits?: number }`
- **Contoh**: `formatRupiah(1500000)` &rarr; `"Rp1.500.000"`

#### `parseRupiah(value)`

Mengembalikan angka dari string format Rupiah.

- **Parameter**: `value: string`
- **Contoh**: `parseRupiah("Rp 1.500.000,50")` &rarr; `1500000.5`

#### `formatCurrency(value, currencyCode?, locale?)`

Memformat angka sesuai standar mata uang global.

- **Parameter**: `value: number`, `currencyCode?: string = "IDR"`, `locale?: string = "id-ID"`

---

### 📅 Tanggal Indonesia (`date`)

#### `formatTanggalIndonesia(date, options?)`

Memformat objek Date atau ISO string menjadi format tanggal Indonesia.

- **Parameter**:
  - `date: Date | string | number`
  - `options?: { day?: boolean; monthFormat?: "long" | "short"; time?: boolean }`
- **Contoh**: `formatTanggalIndonesia("1945-08-17", { day: true })` &rarr; `"Jumat, 17 Agustus 1945"`

#### `formatDateTimeIndonesia(date, options?)`

Memformat waktu lengkap beserta jam, menit, dan detik.

- **Parameter**: `options?: { second?: boolean }`

#### `getNamaBulan(monthIndex, options?)`

Mendapatkan nama bulan Indonesia berdasarkan indeks (0-11).

#### `getNamaHari(dayIndex, options?)`

Mendapatkan nama hari Indonesia berdasarkan indeks (0-6, 0 = Minggu).

---

### 📞 Telepon (`phone`)

#### `normalizePhone(phone)`

Menormalisasi nomor telepon lokal menjadi format E.164 (+628xxxx).

#### `validatePhone(phone)`

Memvalidasi apakah nomor merupakan nomor handphone Indonesia yang sah.

#### `formatPhone(phone, format?)`

Memformat nomor handphone menjadi format lokal (`local`), internasional (`international`), atau dengan tanda hubung spasi (`spaced`).

#### `maskPhone(phone, options?)`

Mensensor bagian tengah nomor telepon untuk menjaga privasi pengguna.

- **Contoh**: `maskPhone("081234567890")` &rarr; `"0812****7890"`

---

### 📧 Email (`email`)

#### `maskEmail(email)`

Mensensor bagian username email untuk privasi.

- **Contoh**: `maskEmail("john.doe@example.com")` &rarr; `"j******e@example.com"`

---

### 🇮🇩 Identitas (`id`)

#### `validateNIK(nik)`

Memvalidasi struktur NIK 16-digit (memeriksa kode provinsi/kabupaten/kecamatan terdaftar, tanggal lahir valid, dan struktur angka).

#### `validateNPWP(npwp)`

Memvalidasi kode NPWP 15-digit (menggunakan algoritma modulo 11 checksum) maupun NPWP 16-digit (berbasis NIK).

#### `formatNIK(nik)` / `formatNPWP(npwp)`

Memformat nomor identitas mentah menjadi format bertitik yang rapi untuk ditampilkan.

---

### 🔠 Manipulasi Teks (`string`)

- `slugify(str)`: Membuat URL-slug dari kalimat.
- `capitalize(str)`: Mengubah huruf pertama menjadi huruf besar.
- `titleCase(str)`: Mengubah awal setiap kata menjadi huruf besar.
- `camelCase(str)` / `snakeCase(str)` / `kebabCase(str)`: Konversi format kasus penulisan.
- `truncate(str, length, omission?)`: Memotong teks dengan aman pada batas panjang tertentu.
- `removeAccents(str)`: Membuang tanda aksen/diakritik (e.g. `Café` &rarr; `Cafe`).

---

### 🎲 Nilai Acak (`random`)

- `randomString(length, options?)`: Membuat string acak (kustom numerik, huruf besar/kecil).
- `randomNumber(min, max)`: Menghasilkan bilangan bulat acak di antara `min` dan `max` (inklusif).
- `generateUUID()`: Menghasilkan UUID v4 secara aman menggunakan API Crypto bawaan.
- `generateOTP(length?, options?)`: Membuat kode OTP numerik atau alfanumerik.

---

### 🧮 Angka (`number`)

- `clamp(val, min, max)`: Membatasi angka pada batas bawah dan atas.
- `between(val, min, max, inclusive?)`: Memeriksa apakah angka berada di dalam rentang.
- `padNumber(val, size)`: Menambahkan nol di awal angka agar mencapai panjang tertentu (e.g. `padNumber(7, 3)` &rarr; `"007"`).
- `formatNumber(val, options?)`: Memformat angka sesuai aturan pemisah ribuan lokal (id-ID).

---

### 🔍 Validasi (`validation`)

- `isEmpty(val)`: Mengecek apakah nilai null, undefined, string kosong, array kosong, atau objek kosong.
- `isNumeric(val)`: Mengecek apakah nilai bertipe angka atau string numerik.
- `isAlphabet(val)`: Mengecek apakah string hanya berisi huruf alfabet.
- `isURL(val)` / `isJSON(val)` / `isUUID(val)`: Validasi format data standar.

---

## Kontribusi

Kontribusi dari komunitas sangat dihargai! Silakan merujuk ke berkas [CONTRIBUTING.md](CONTRIBUTING.md) untuk detail panduan memulai pengembangan, pelaporan isu, dan cara mengajukan Pull Request.

---

## Lisensi

Pustaka ini dirilis di bawah lisensi [MIT](LICENSE) &copy; 2026 Zen.
