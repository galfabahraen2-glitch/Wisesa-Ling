import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import { COLORS } from '../../theme/colors';
import { useProgressStore } from '../../store/progressStore';
import { getWordsForDay } from '../../data/dictionary';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WritingScreen() {
  const router = useRouter();
  const ref = useRef<any>();
  const currentDay = useProgressStore((state) => state.currentDay);
  const words = getWordsForDay(currentDay);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClear = () => {
    ref.current?.clearSignature();
  };
  
  const handleNext = () => {
    handleClear();
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.back();
    }
  };

  const currentWord = words[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.header}>Menulis Hanzi</Text>
      </View>
      
      <Text style={styles.subtitle}>Coba tulis karakter: {currentWord.hanzi} ({currentWord.pinyin}) - {currentWord.meaning}</Text>
      <Text style={styles.progressText}>Kata {currentIndex + 1} dari {words.length}</Text>
      
      <View style={styles.canvasContainer}>
        <SignatureScreen
          ref={ref}
          onOK={() => {}}
          onEmpty={() => console.log('Empty')}
          descriptionText="Tulis di dalam kotak ini"
          clearText="Hapus"
          confirmText="Selesai"
          webStyle={`
            .m-signature-pad { box-shadow: none; border: none; }
            .m-signature-pad--body { border: none; }
            body,html { width: 100%; height: 100%; margin: 0; padding: 0; }
          `}
          autoClear={false}
          imageType="image/png"
        />
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
          <Text style={styles.clearBtnText}>Hapus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextBtnText}>{currentIndex === words.length - 1 ? 'Selesai' : 'Kata Selanjutnya'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 24, paddingTop: 48 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backBtn: { marginRight: 16 },
  header: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
  subtitle: { fontSize: 18, color: COLORS.text, marginBottom: 8, fontWeight: '600' },
  progressText: { fontSize: 14, color: COLORS.primary, marginBottom: 24, fontWeight: 'bold' },
  canvasContainer: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 20, overflow: 'hidden', borderColor: COLORS.border, borderWidth: 1, marginBottom: 20 },
  btnRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  clearBtn: { flex: 1, backgroundColor: COLORS.surface, padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: COLORS.error },
  clearBtnText: { color: COLORS.error, fontWeight: 'bold', fontSize: 16 },
  nextBtn: { flex: 2, backgroundColor: COLORS.primary, padding: 16, borderRadius: 12, alignItems: 'center' },
  nextBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 }
});
