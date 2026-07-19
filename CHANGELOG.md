# Changelog

Semua perubahan penting pada proyek **indonesia-utils** akan didokumentasikan di berkas ini.

Format berkas ini merujuk pada [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), dan proyek ini mematuhi aturan [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-19

### Added
- Rilis perdana pustaka **indonesia-utils**.
- Modul `currency`: `formatRupiah`, `parseRupiah`, dan `formatCurrency`.
- Modul `date`: `formatTanggalIndonesia`, `formatHariIndonesia`, `formatDateTimeIndonesia`, `getNamaBulan`, dan `getNamaHari`.
- Modul `phone`: `normalizePhone`, `validatePhone`, `formatPhone`, dan `maskPhone`.
- Modul `email`: `maskEmail` dan `validateEmail`.
- Modul `id`: `validateNIK`, `formatNIK`, `validateNPWP`, dan `formatNPWP`.
- Modul `string`: `slugify`, `capitalize`, `titleCase`, `camelCase`, `snakeCase`, `kebabCase`, `truncate`, dan `removeAccents`.
- Modul `random`: `randomString`, `randomNumber`, `generateUUID`, dan `generateOTP`.
- Modul `number`: `clamp`, `between`, `padNumber`, dan `formatNumber`.
- Modul `validation`: `isEmpty`, `isNumeric`, `isAlphabet`, `isURL`, `isJSON`, dan `isUUID`.
- Alur CI menggunakan GitHub Actions.
- Pengujian unit lengkap dengan vitest (cakupan kode > 90%).
- Konfigurasi TypeScript, tsup (ESM/CJS), ESLint, dan Prettier.
