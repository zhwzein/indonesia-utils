const BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const BULAN_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

const HARI_SHORT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

function toDate(date: Date | string | number): Date {
  if (date instanceof Date) return date;
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) {
    throw new Error('Invalid Date input');
  }
  return parsed;
}

/**
 * Gets the Indonesian name of a month by index (0-11).
 *
 * @param monthIndex - The month index (0 for January, 11 for December)
 * @param options - Formatting options
 * @param options.short - If true, returns the short month name (e.g., "Jan", "Agu"). Default is false.
 * @returns Month name
 *
 * @example
 * ```ts
 * getNamaBulan(0) // "Januari"
 * getNamaBulan(7, { short: true }) // "Agu"
 * ```
 */
export function getNamaBulan(monthIndex: number, options: { short?: boolean } = {}): string {
  if (monthIndex < 0 || monthIndex > 11) {
    throw new Error('Month index must be between 0 and 11');
  }
  return options.short ? BULAN_SHORT[monthIndex] : BULAN[monthIndex];
}

/**
 * Gets the Indonesian name of a day by index (0-6).
 *
 * @param dayIndex - The day index (0 for Sunday, 6 for Saturday)
 * @param options - Formatting options
 * @param options.short - If true, returns the short day name (e.g., "Min", "Sen"). Default is false.
 * @returns Day name
 *
 * @example
 * ```ts
 * getNamaHari(0) // "Minggu"
 * getNamaHari(1, { short: true }) // "Sen"
 * ```
 */
export function getNamaHari(dayIndex: number, options: { short?: boolean } = {}): string {
  if (dayIndex < 0 || dayIndex > 6) {
    throw new Error('Day index must be between 0 and 6');
  }
  return options.short ? HARI_SHORT[dayIndex] : HARI[dayIndex];
}

/**
 * Formats a date into a standard Indonesian date format.
 *
 * @param date - Date object, ISO string, or timestamp
 * @param options - Formatting options
 * @param options.day - If true, includes the day name (e.g., "Jumat, 17 Agustus 1945"). Default is false.
 * @param options.monthFormat - Format of the month name ("long" | "short"). Default is "long".
 * @param options.time - If true, includes the time. Default is false.
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * formatTanggalIndonesia(new Date("1945-08-17T10:00:00Z")) // "17 Agustus 1945"
 * formatTanggalIndonesia("1945-08-17", { day: true }) // "Jumat, 17 Agustus 1945"
 * formatTanggalIndonesia("1945-08-17T10:00:00", { time: true }) // "17 Agustus 1945 10:00"
 * ```
 */
export function formatTanggalIndonesia(
  date: Date | string | number,
  options: { day?: boolean; monthFormat?: 'long' | 'short'; time?: boolean } = {},
): string {
  const d = toDate(date);
  const dateNum = d.getDate();
  const monthName = getNamaBulan(d.getMonth(), { short: options.monthFormat === 'short' });
  const year = d.getFullYear();

  let result = `${dateNum} ${monthName} ${year}`;

  if (options.day) {
    const dayName = getNamaHari(d.getDay());
    result = `${dayName}, ${result}`;
  }

  if (options.time) {
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    result = `${result} ${hours}:${minutes}`;
  }

  return result;
}

/**
 * Gets the Indonesian day name of a given date.
 *
 * @param date - Date object, ISO string, or timestamp
 * @returns Day name in Indonesian
 *
 * @example
 * ```ts
 * formatHariIndonesia(new Date("1945-08-17")) // "Jumat"
 * ```
 */
export function formatHariIndonesia(date: Date | string | number): string {
  const d = toDate(date);
  return getNamaHari(d.getDay());
}

/**
 * Formats a date into a standard Indonesian date and time format (with seconds support).
 *
 * @param date - Date object, ISO string, or timestamp
 * @param options - Formatting options
 * @param options.second - If true, includes seconds (e.g., "17 Agustus 1945 10:00:00"). Default is true.
 * @returns Formatted date-time string
 *
 * @example
 * ```ts
 * formatDateTimeIndonesia("1945-08-17T10:00:00") // "17 Agustus 1945 10:00:00"
 * formatDateTimeIndonesia("1945-08-17T10:00:00", { second: false }) // "17 Agustus 1945 10:00"
 * ```
 */
export function formatDateTimeIndonesia(
  date: Date | string | number,
  options: { second?: boolean } = {},
): string {
  const { second = true } = options;
  const d = toDate(date);
  const baseDate = formatTanggalIndonesia(d, { time: false });
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const timeStr = second
    ? `${hours}:${minutes}:${String(d.getSeconds()).padStart(2, '0')}`
    : `${hours}:${minutes}`;
  return `${baseDate} ${timeStr}`;
}
