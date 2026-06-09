import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import { COLORS } from '../../theme/colors';

export default function WritingScreen() {
  const ref = useRef<any>();

  const handleClear = () => {
    ref.current?.clearSignature();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Latihan Menulis</Text>
      <Text style={styles.subtitle}>Coba tulis karakter: 好 (Hǎo) - Baik</Text>
      
      <View style={styles.canvasContainer}>
        <SignatureScreen
          ref={ref}
          onOK={() => {}}
          onEmpty={() => console.log('Empty')}
          descriptionText="Tulis di dalam kotak ini"
          clearText="Hapus"
          confirmText="Selesai"
          webStyle={`
            .m-signature-pad {
              box-shadow: none;
              border: none;
            }
            .m-signature-pad--body {
              border: none;
            }
            body,html {
              width: 100%; height: 100%; margin: 0; padding: 0;
            }
          `}
          autoClear={false}
          imageType="image/png"
        />
      </View>
      <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
        <Text style={styles.clearBtnText}>Hapus Kanvas</Text>
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
  canvasContainer: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: COLORS.border,
    borderWidth: 1,
    marginBottom: 20,
  },
  clearBtn: {
    backgroundColor: COLORS.error,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  clearBtnText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
