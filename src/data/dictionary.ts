// Database Kosakata Wisesa Ling
// Untuk versi beta ini, kami mengisi 100 kata harian yang paling sering dipakai.
// (Dalam mode produksi, bisa dihubungkan ke server untuk jutaan data)

export interface WordDefinition {
  hanzi: string;
  pinyin: string;
  meaning: string;
}

export const DICTIONARY: WordDefinition[] = [
  // HARI 1 (Kata Ganti & Dasar)
  { hanzi: '我', pinyin: 'wǒ', meaning: 'Saya' },
  { hanzi: '你', pinyin: 'nǐ', meaning: 'Kamu' },
  { hanzi: '他', pinyin: 'tā', meaning: 'Dia (Laki-laki)' },
  { hanzi: '她', pinyin: 'tā', meaning: 'Dia (Perempuan)' },
  { hanzi: '好', pinyin: 'hǎo', meaning: 'Baik' },
  { hanzi: '是', pinyin: 'shì', meaning: 'Adalah / Ya' },
  { hanzi: '不', pinyin: 'bù', meaning: 'Tidak / Bukan' },
  { hanzi: '谢谢', pinyin: 'xiè xie', meaning: 'Terima kasih' },
  { hanzi: '再见', pinyin: 'zài jiàn', meaning: 'Sampai jumpa' },
  { hanzi: '爱', pinyin: 'ài', meaning: 'Cinta' },
  // HARI 2 (Keluarga)
  { hanzi: '家', pinyin: 'jiā', meaning: 'Keluarga / Rumah' },
  { hanzi: '爸爸', pinyin: 'bà ba', meaning: 'Ayah' },
  { hanzi: '妈妈', pinyin: 'mā ma', meaning: 'Ibu' },
  { hanzi: '哥哥', pinyin: 'gē ge', meaning: 'Kakak Laki-laki' },
  { hanzi: '姐姐', pinyin: 'jiě jie', meaning: 'Kakak Perempuan' },
  { hanzi: '弟弟', pinyin: 'dì di', meaning: 'Adik Laki-laki' },
  { hanzi: '妹妹', pinyin: 'mèi mei', meaning: 'Adik Perempuan' },
  { hanzi: '朋友', pinyin: 'péng you', meaning: 'Teman' },
  { hanzi: '人', pinyin: 'rén', meaning: 'Orang' },
  { hanzi: '叫', pinyin: 'jiào', meaning: 'Dipanggil / Bernama' },
  // HARI 3 (Angka)
  { hanzi: '一', pinyin: 'yī', meaning: 'Satu' },
  { hanzi: '二', pinyin: 'èr', meaning: 'Dua' },
  { hanzi: '三', pinyin: 'sān', meaning: 'Tiga' },
  { hanzi: '四', pinyin: 'sì', meaning: 'Empat' },
  { hanzi: '五', pinyin: 'wǔ', meaning: 'Lima' },
  { hanzi: '六', pinyin: 'liù', meaning: 'Enam' },
  { hanzi: '七', pinyin: 'qī', meaning: 'Tujuh' },
  { hanzi: '八', pinyin: 'bā', meaning: 'Delapan' },
  { hanzi: '九', pinyin: 'jiǔ', meaning: 'Sembilan' },
  { hanzi: '十', pinyin: 'shí', meaning: 'Sepuluh' },
  // HARI 4 (Waktu)
  { hanzi: '天', pinyin: 'tiān', meaning: 'Hari' },
  { hanzi: '今天', pinyin: 'jīn tiān', meaning: 'Hari ini' },
  { hanzi: '明天', pinyin: 'míng tiān', meaning: 'Besok' },
  { hanzi: '昨天', pinyin: 'zuó tiān', meaning: 'Kemarin' },
  { hanzi: '月', pinyin: 'yuè', meaning: 'Bulan' },
  { hanzi: '年', pinyin: 'nián', meaning: 'Tahun' },
  { hanzi: '点', pinyin: 'diǎn', meaning: 'Jam / Titik' },
  { hanzi: '分', pinyin: 'fēn', meaning: 'Menit' },
  { hanzi: '现在', pinyin: 'xiàn zài', meaning: 'Sekarang' },
  { hanzi: '早上', pinyin: 'zǎo shang', meaning: 'Pagi' },
  // HARI 5 (Tindakan 1)
  { hanzi: '吃', pinyin: 'chī', meaning: 'Makan' },
  { hanzi: '喝', pinyin: 'hē', meaning: 'Minum' },
  { hanzi: '看', pinyin: 'kàn', meaning: 'Melihat / Membaca' },
  { hanzi: '听', pinyin: 'tīng', meaning: 'Mendengar' },
  { hanzi: '说', pinyin: 'shuō', meaning: 'Berbicara' },
  { hanzi: '做', pinyin: 'zuò', meaning: 'Melakukan' },
  { hanzi: '去', pinyin: 'qù', meaning: 'Pergi' },
  { hanzi: '来', pinyin: 'lái', meaning: 'Datang' },
  { hanzi: '买', pinyin: 'mǎi', meaning: 'Membeli' },
  { hanzi: '卖', pinyin: 'mài', meaning: 'Menjual' },
  // HARI 6 (Benda Sehari-hari)
  { hanzi: '水', pinyin: 'shuǐ', meaning: 'Air' },
  { hanzi: '饭', pinyin: 'fàn', meaning: 'Nasi / Makanan' },
  { hanzi: '苹果', pinyin: 'píng guǒ', meaning: 'Apel' },
  { hanzi: '茶', pinyin: 'chá', meaning: 'Teh' },
  { hanzi: '书', pinyin: 'shū', meaning: 'Buku' },
  { hanzi: '钱', pinyin: 'qián', meaning: 'Uang' },
  { hanzi: '衣服', pinyin: 'yī fu', meaning: 'Baju' },
  { hanzi: '手机', pinyin: 'shǒu jī', meaning: 'Handphone' },
  { hanzi: '电脑', pinyin: 'diàn nǎo', meaning: 'Komputer' },
  { hanzi: '猫', pinyin: 'māo', meaning: 'Kucing' }
];

export const getWordsForDay = (day: number): WordDefinition[] => {
  const wordsPerDay = 10;
  // Jika hari lebih dari yang tersedia, kita ulangi dari awal atau ambil yang terakhir
  // Ini agar tidak error jika user mencapai hari ke-100 sedangkan data baru 60
  const totalDaysAvailable = Math.floor(DICTIONARY.length / wordsPerDay);
  const safeDay = ((day - 1) % totalDaysAvailable) + 1;
  
  const startIndex = (safeDay - 1) * wordsPerDay;
  return DICTIONARY.slice(startIndex, startIndex + wordsPerDay);
};
