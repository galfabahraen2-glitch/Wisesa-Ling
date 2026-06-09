import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function ProfileScreen() {
  
  const generatePDF = async () => {
    try {
      const html = `
        <html>
          <head>
            <style>
              body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; }
              h1 { color: #8BAA91; text-align: center; font-size: 36px; margin-bottom: 5px; }
              h2 { text-align: center; color: #666; font-weight: normal; margin-top: 0; }
              .card { border: 2px solid #E2E8E4; border-radius: 16px; padding: 30px; margin-top: 40px; }
              .stat { font-size: 24px; margin: 15px 0; border-bottom: 1px solid #eee; padding-bottom: 15px; }
              .stat strong { color: #3A403F; }
              .footer { text-align: center; margin-top: 50px; font-size: 14px; color: #999; }
            </style>
          </head>
          <body>
            <h1>Wisesa Ling</h1>
            <h2>Rapor Perkembangan Belajar</h2>
            
            <div class="card">
              <div class="stat">Nama Pelajar: <strong>Pelajar Aktif</strong></div>
              <div class="stat">Hari Kurikulum: <strong>Hari 1 dari 365</strong></div>
              <div class="stat">Kosakata Dikuasai: <strong>10 Kata</strong></div>
              <div class="stat">Akurasi Kuis: <strong>100%</strong></div>
            </div>
            
            <div class="footer">Dicetak langsung dari aplikasi Wisesa Ling</div>
          </body>
        </html>
      `;
      
      const { uri } = await Print.printToFileAsync({ html });
      console.log('PDF Generated at:', uri);
      
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      } else {
        Alert.alert('Sukses', 'PDF berhasil dibuat, namun perangkat tidak mendukung fitur Share.');
      }
    } catch (error) {
      Alert.alert('Gagal', 'Terjadi kesalahan saat membuat PDF.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={COLORS.primary} />
        </View>
        <Text style={styles.name}>Pelajar Aktif</Text>
        <Text style={styles.level}>Pemula - HSK 1</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>10</Text>
          <Text style={styles.statLabel}>Kata</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Hari</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Kuis</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.exportBtn} onPress={generatePDF}>
        <Ionicons name="document-text" size={24} color={COLORS.white} />
        <Text style={styles.exportBtnText}>Unduh Rapor PDF</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight + '50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  level: {
    fontSize: 16,
    color: COLORS.primary,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    padding: 24,
    borderRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 40,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  exportBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  exportBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  }
});
