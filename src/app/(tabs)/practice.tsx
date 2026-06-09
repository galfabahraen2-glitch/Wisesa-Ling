import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PracticeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24, paddingTop: 48 }}>
      <Text style={styles.headerTitle}>Pusat Latihan</Text>
      <Text style={styles.headerSubtitle}>Asah kemampuan Mandarinmu dengan berbagai mode interaktif berikut.</Text>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/explore/quiz')}>
        <View style={[styles.iconBg, { backgroundColor: COLORS.success + '20' }]}>
          <Ionicons name="game-controller" size={32} color={COLORS.success} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>Kuis Kosakata</Text>
          <Text style={styles.cardDesc}>Pilihan ganda dan uji ingatan dari pelajaran harian.</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={COLORS.border} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/explore/writing')}>
        <View style={[styles.iconBg, { backgroundColor: '#D6C4E130' }]}>
          <Ionicons name="pencil" size={32} color="#9D7BB0" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>Menulis Hanzi</Text>
          <Text style={styles.cardDesc}>Goreskan jarimu untuk melatih tulisan karakter Mandarin.</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={COLORS.border} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/explore/conversation')}>
        <View style={[styles.iconBg, { backgroundColor: COLORS.secondary + '20' }]}>
          <Ionicons name="chatbubbles" size={32} color={COLORS.secondary} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>Percakapan AI</Text>
          <Text style={styles.cardDesc}>Simulasi obrolan langsung dengan Groq AI Llama3.</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={COLORS.border} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 32,
    lineHeight: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  iconBg: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 18,
  }
});
