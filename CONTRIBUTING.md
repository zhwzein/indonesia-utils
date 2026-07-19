# Panduan Kontribusi - indonesia-utils

Terima kasih atas minat Anda untuk berkontribusi pada **indonesia-utils**! Kami menyambut baik kontribusi berupa perbaikan bug, penambahan fitur baru, dokumentasi, maupun masukan lainnya.

Untuk menjaga alur kontribusi tetap tertib, silakan ikuti panduan berikut.

## Kode Etik

Dengan berpartisipasi dalam proyek ini, Anda diharapkan untuk mematuhi aturan perilaku yang berlaku dalam berkas [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Bagaimana Cara Berkontribusi?

### Melaporkan Bug atau Usulan Fitur

Sebelum membuka isu baru (*new issue*), silakan cari di daftar isu yang sudah ada untuk memastikan topik tersebut belum pernah dibahas.
Jika belum ada, gunakan templat isu yang tersedia di GitHub:
- Melaporkan Bug: Berikan deskripsi yang jelas beserta langkah reproduksinya.
- Usulan Fitur: Jelaskan kebutuhan fitur dan contoh cara penggunaannya.

### Mengajukan Pull Request (PR)

1. **Fork** repositori ini ke akun GitHub pribadi Anda.
2. Buat branch baru dari branch `main` dengan nama yang deskriptif:
   ```bash
   git checkout -b fitur/nama-fitur
   # atau
   git checkout -b bugfix/deskripsi-bug
   ```
3. Lakukan perubahan pada kode sumber. Pastikan Anda menulis pengujian unit untuk kode baru Anda.
4. Jalankan pengujian otomatis untuk memastikan semua tes lulus:
   ```bash
   npm run test
   ```
5. Pastikan format kode konsisten dan bebas dari kesalahan linting:
   ```bash
   npm run format
   npm run lint
   ```
6. Lakukan komit perubahan dengan pesan yang deskriptif:
   ```bash
   git commit -m "feat: tambah utilitas X untuk daerah"
   ```
7. Push branch Anda ke repositori GitHub personal Anda:
   ```bash
   git push origin fitur/nama-fitur
   ```
8. Buka **Pull Request** ke repositori utama kami di branch `main` menggunakan templat PR yang disediakan.

## Alur Pengembangan Lokal

1. Kloning repositori hasil fork Anda secara lokal.
2. Instal semua dependensi pengembangan:
   ```bash
   npm install
   ```
3. Lakukan build modul lokal:
   ```bash
   npm run build
   ```

Terima kasih atas kontribusi Anda untuk membantu pengembang Indonesia!
