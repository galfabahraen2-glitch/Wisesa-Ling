import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const PINYIN_BASICS = [
  { pinyin: 'a', hanzi: '阿', meaning: 'Ah' },
  { pinyin: 'bā', hanzi: '八', meaning: 'Delapan' },
  { pinyin: 'mā', hanzi: '妈', meaning: 'Ibu' },
  { pinyin: 'hǎo', hanzi: '好', meaning: 'Baik' },
  { pinyin: 'nǐ', hanzi: '你', meaning: 'Kamu' },
];

export default function PronunciationScreen() {
  const speak = (text: string) => {
    Speech.speak(text, { language: 'zh-CN', rate: 0.8 });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Pengucapan Dasar</Text>
      <Text style={styles.subtitle}>Klik pada kata untuk mendengarkan pengucapan standar (Nada 1-4).</Text>

      {PINYIN_BASICS.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.card}
          onPress={() => speak(item.hanzi)}
        >
          <View style={styles.cardLeft}>
            <Text style={styles.hanzi}>{item.hanzi}</Text>
            <View>
              <Text style={styles.pinyin}>{item.pinyin}</Text>
              <Text style={styles.meaning}>{item.meaning}</Text>
            </View>
          </View>
          <View style={styles.playBtn}>
            <Ionicons name="volume-medium" size={24} color={COLORS.primary} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 24,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  hanzi: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  pinyin: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
  },
  meaning: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  playBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight + '30',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
