import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useRouter } from 'expo-router';

// Data 10 Kata Hari 1
const DAY_1_WORDS = [
  { hanzi: '我', pinyin: 'wǒ', meaning: 'Saya' },
  { hanzi: '你', pinyin: 'nǐ', meaning: 'Kamu' },
  { hanzi: '他', pinyin: 'tā', meaning: 'Dia (Laki-laki)' },
  { hanzi: '她', pinyin: 'tā', meaning: 'Dia (Perempuan)' },
  { hanzi: '好', pinyin: 'hǎo', meaning: 'Baik' },
  { hanzi: '是', pinyin: 'shì', meaning: 'Adalah / Ya' },
  { hanzi: '不', pinyin: 'bù', meaning: 'Tidak' },
  { hanzi: '谢谢', pinyin: 'xiè xie', meaning: 'Terima kasih' },
  { hanzi: '再见', pinyin: 'zài jiàn', meaning: 'Sampai jumpa' },
  { hanzi: '爱', pinyin: 'ài', meaning: 'Cinta / Suka' },
];

export default function LessonScreen() {
  const router = useRouter();

  const speak = (text: string) => {
    Speech.speak(text, { language: 'zh-CN', rate: 0.8 });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hari 1: Dasar-dasar</Text>
      </View>

      <ScrollView style={styles.listContainer} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.instruction}>Pelajari 10 kata ini hari ini. Klik ikon suara untuk mendengarkan pengucapan!</Text>
        
        {DAY_1_WORDS.map((word, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.wordCard}
            onPress={() => speak(word.hanzi)}
          >
            <View style={styles.wordInfo}>
              <Text style={styles.hanzi}>{word.hanzi}</Text>
              <View>
                <Text style={styles.pinyin}>{word.pinyin}</Text>
                <Text style={styles.meaning}>{word.meaning}</Text>
              </View>
            </View>
            <View style={styles.playIconBg}>
              <Ionicons name="volume-high" size={20} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={styles.finishBtn}
          onPress={() => router.push('/explore/quiz')}
        >
          <Text style={styles.finishBtnText}>Uji Kemampuan (Kuis Hari 1)</Text>
          <Ionicons name="checkmark-circle" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingTop: 48,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  listContainer: {
    padding: 24,
  },
  instruction: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 20,
    lineHeight: 24,
  },
  wordCard: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  wordInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  hanzi: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.text,
    width: 80,
  },
  pinyin: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  meaning: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  playIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight + '30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishBtn: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
  },
  finishBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  }
});
