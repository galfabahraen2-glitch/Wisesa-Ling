import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useProgressStore } from '../../store/progressStore';
import { getWordsForDay, DICTIONARY } from '../../data/dictionary';

function shuffleArray(array: any[]) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function QuizScreen() {
  const router = useRouter();
  const currentDay = useProgressStore((state) => state.currentDay);
  const completeDay = useProgressStore((state) => state.completeDay);
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const words = getWordsForDay(currentDay);
    const generated = words.map(word => {
      // Pick 3 random wrong meanings from dictionary
      const wrongOptions = DICTIONARY
        .filter(w => w.meaning !== word.meaning)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => w.meaning);
        
      const options = shuffleArray([word.meaning, ...wrongOptions]);
      return {
        question: `Apa arti dari "${word.hanzi}" (${word.pinyin})?`,
        options,
        correctIndex: options.indexOf(word.meaning)
      };
    });
    setQuestions(generated);
  }, [currentDay]);

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === questions[currentQuestion].correctIndex) {
      setScore(score + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
      completeDay(currentDay); // Pindah ke hari berikutnya!
    }
  };

  if (questions.length === 0) return null;

  if (isFinished) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="trophy" size={80} color="#FACC15" />
        <Text style={styles.scoreTitle}>Hari {currentDay} Selesai!</Text>
        <Text style={styles.scoreText}>Skor Anda: {score} / {questions.length}</Text>
        <Text style={styles.successMessage}>Luar biasa! Anda kini maju ke Hari {currentDay + 1}!</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/')}>
          <Text style={styles.primaryBtnText}>Kembali ke Beranda</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = questions[currentQuestion];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.progressText}>Pertanyaan {currentQuestion + 1} / {questions.length}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{q.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {q.options.map((opt: string, index: number) => (
            <TouchableOpacity 
              key={index} 
              style={styles.optionBtn}
              onPress={() => handleAnswer(index)}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centerContainer: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', padding: 24 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 24, paddingTop: 48 },
  backBtn: {},
  progressText: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary },
  content: { padding: 24, flex: 1 },
  questionCard: { backgroundColor: COLORS.surface, padding: 32, borderRadius: 24, alignItems: 'center', justifyContent: 'center', minHeight: 200, marginBottom: 32, shadowColor: COLORS.black, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  questionText: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, textAlign: 'center', lineHeight: 32 },
  optionsContainer: { gap: 16 },
  optionBtn: { backgroundColor: COLORS.surface, padding: 20, borderRadius: 16, borderWidth: 2, borderColor: COLORS.border },
  optionText: { fontSize: 18, color: COLORS.text, fontWeight: '600', textAlign: 'center' },
  scoreTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, marginTop: 24, marginBottom: 8 },
  scoreText: { fontSize: 18, color: COLORS.textLight, marginBottom: 12 },
  successMessage: { fontSize: 16, color: COLORS.success, fontWeight: 'bold', marginBottom: 32, textAlign: 'center' },
  primaryBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 32, paddingVertical: 16, borderRadius: 100 },
  primaryBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' }
});
