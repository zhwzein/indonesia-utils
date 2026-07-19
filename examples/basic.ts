import {
  formatRupiah,
  parseRupiah,
  formatTanggalIndonesia,
  formatDateTimeIndonesia,
  normalizePhone,
  validatePhone,
  formatPhone,
  maskPhone,
  maskEmail,
  validateNIK,
  formatNIK,
  validateNPWP,
  formatNPWP,
  slugify,
  titleCase,
  generateOTP,
  generateUUID,
  clamp,
  padNumber,
  isEmpty,
} from '../src/index.js'; // Mengimpor langsung dari src untuk keperluan contoh lokal

console.log('=== CONTOH PENGGUNAAN INDONESIA-UTILS ===\n');

// 1. Currency
console.log('--- Utilitas Mata Uang ---');
console.log('formatRupiah(1500000):', formatRupiah(1500000)); // "Rp1.500.000"
console.log('formatRupiah(1500000, { formal: true }):', formatRupiah(1500000, { formal: true })); // "Rp 1.500.000"
console.log('parseRupiah("Rp 1.500.000,50"):', parseRupiah('Rp 1.500.000,50')); // 1500000.5
console.log();

// 2. Date
console.log('--- Utilitas Penanggalan ---');
const date = new Date('2026-07-19T10:30:00');
console.log('Tanggal Standard:', formatTanggalIndonesia(date)); // "19 Juli 2026"
console.log('Tanggal Lengkap Hari:', formatTanggalIndonesia(date, { day: true })); // "Minggu, 19 Juli 2026"
console.log('Tanggal dan Waktu Detik:', formatDateTimeIndonesia(date)); // "19 Juli 2026 10:30:00"
console.log();

// 3. Phone
console.log('--- Utilitas Nomor Telepon ---');
const rawPhone = '0812-3456-7890';
console.log('Raw Phone:', rawPhone);
console.log('normalizePhone:', normalizePhone(rawPhone)); // "+6281234567890"
console.log('validatePhone:', validatePhone(rawPhone)); // true
console.log('formatPhone (spaced):', formatPhone(rawPhone, 'spaced')); // "+62 812-3456-7890"
console.log('maskPhone:', maskPhone(normalizePhone(rawPhone))); // "+62812****7890"
console.log();

// 4. Email
console.log('--- Utilitas Email ---');
console.log('maskEmail("budi.santoso@example.com"):', maskEmail('budi.santoso@example.com')); // "b**********o@example.com"
console.log();

// 5. Identity
console.log('--- Utilitas Identitas (NIK & NPWP) ---');
const nik = '3171011708450001';
console.log('NIK Valid?:', validateNIK(nik)); // true
console.log('Formatted NIK:', formatNIK(nik)); // "31.71.01.170845.0001"

const npwp = '092542943307000';
console.log('NPWP Valid?:', validateNPWP(npwp)); // true
console.log('Formatted NPWP:', formatNPWP(npwp)); // "09.254.294.3-307.000"
console.log();

// 6. String Utilities
console.log('--- Utilitas Manipulasi String ---');
console.log('slugify("Pancasila Dasar Negara"):', slugify('Pancasila Dasar Negara')); // "pancasila-dasar-negara"
console.log('titleCase("joko widodo"):', titleCase('joko widodo')); // "Joko Widodo"
console.log();

// 7. Random Utilities
console.log('--- Utilitas Nilai Acak ---');
console.log('generateOTP(6):', generateOTP(6)); // e.g. "930214"
console.log('generateUUID():', generateUUID()); // e.g. "123e4567-e89b..."
console.log();

// 8. Number & Validation Utilities
console.log('--- Utilitas Angka dan Validasi ---');
console.log('clamp(15, 0, 10):', clamp(15, 0, 10)); // 10
console.log('padNumber(7, 3):', padNumber(7, 3)); // "007"
console.log('isEmpty([]):', isEmpty([])); // true
console.log('=========================================');
