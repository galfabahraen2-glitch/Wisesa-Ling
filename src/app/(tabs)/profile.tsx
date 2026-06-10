import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { COLORS } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as ImagePicker from 'expo-image-picker';
import { useProgressStore } from '../../store/progressStore';

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const currentDay = useProgressStore((state) => state.currentDay);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

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
              <div class="stat">Hari Kurikulum: <strong>Hari ${currentDay} dari 365</strong></div>
              <div class="stat">Kosakata Dikuasai: <strong>${currentDay * 10} Kata</strong></div>
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
        Alert.alert('Sukses', 'PDF berhasil dibuat, namun perangkat Anda tidak mendukung fitur Share.');
      }
    } catch (error) {
      Alert.alert('Gagal', 'Terjadi kesalahan saat membuat PDF.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="camera" size={40} color={COLORS.primary} />
            </View>
          )}
          <View style={styles.editBadge}>
            <Ionicons name="pencil" size={12} color={COLORS.white} />
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>Pelajar Aktif</Text>
        <Text style={styles.level}>Klik foto untuk mengubah</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{currentDay * 10}</Text>
          <Text style={styles.statLabel}>Kata</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{currentDay}</Text>
          <Text style={styles.statLabel}>Hari</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{currentDay * 3}</Text>
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
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.primaryLight + '40',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  level: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    padding: 24,
    borderRadius: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 3,
    marginBottom: 40,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 6,
    fontWeight: '500',
  },
  exportBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 20,
    gap: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  exportBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  }
});
