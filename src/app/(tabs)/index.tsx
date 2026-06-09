import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Halo, Pelajar!</Text>
          <Text style={styles.subtitle}>Siap menguasai Mandarin hari ini?</Text>
        </View>
        <View style={styles.avatarPlaceholder}>
          <Ionicons name="person" size={24} color={COLORS.primary} />
        </View>
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.cardTitle}>Kurikulum 365 Hari</Text>
        <Text style={styles.cardSubtitle}>Hari 1 dari 365</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '2%' }]} />
        </View>
        <Text style={styles.progressText}>10 Kata Baru Menunggu</Text>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/explore/lesson')}
        >
          <Text style={styles.buttonText}>Mulai Belajar Hari Ini</Text>
          <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Eksplorasi</Text>
      <View style={styles.grid}>
        <TouchableOpacity 
          style={styles.gridItem}
          onPress={() => router.push('/explore/pronunciation')}
        >
          <View style={[styles.iconWrapper, { backgroundColor: COLORS.primaryLight }]}>
            <Ionicons name="volume-high" size={28} color={COLORS.primary} />
          </View>
          <Text style={styles.gridItemText}>Pengucapan</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.gridItem}
          onPress={() => router.push('/explore/conversation')}
        >
          <View style={[styles.iconWrapper, { backgroundColor: COLORS.secondary + '40' }]}>
            <Ionicons name="chatbubbles" size={28} color={COLORS.secondary} />
          </View>
          <Text style={styles.gridItemText}>Percakapan</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.gridItem}
          onPress={() => router.push('/explore/quiz')}
        >
          <View style={[styles.iconWrapper, { backgroundColor: COLORS.success + '40' }]}>
            <Ionicons name="game-controller" size={28} color={COLORS.success} />
          </View>
          <Text style={styles.gridItemText}>Kuis</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.gridItem}
          onPress={() => router.push('/explore/writing')}
        >
          <View style={[styles.iconWrapper, { backgroundColor: '#D6C4E140' }]}>
            <Ionicons name="pencil" size={28} color="#9D7BB0" />
          </View>
          <Text style={styles.gridItemText}>Menulis</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 12,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight + '50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
    marginBottom: 32,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 16,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginBottom: 12,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  gridItem: {
    width: '48%',
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  gridItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
});
