import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export default function PracticeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latihan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});
