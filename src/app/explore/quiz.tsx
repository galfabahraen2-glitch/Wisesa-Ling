import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const QUIZ_QUESTIONS = [
  {
    question: 'Apa arti dari kata "谢谢" (xiè xie)?',
    options: ['Halo', 'Terima kasih', 'Maaf', 'Sama-sama'],
    correctIndex: 1
  },
  {
    question: 'Huruf Hanzi untuk "Saya" adalah...',
    options: ['你 (nǐ)', '他 (tā)', '我 (wǒ)', '好 (hǎo)'],
    correctIndex: 2
  },
  {
    question: 'Bagaimana cara mengucapkan "Baik" dalam Pinyin?',
    options: ['bù', 'hǎo', 'shì', 'ài'],
    correctIndex: 1
  }
];

export default function QuizScreen() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === QUIZ_QUESTIONS[currentQuestion].correctIndex) {
      setScore(score + 1);
    }
    
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="trophy" size={80} color="#FACC15" />
        <Text style={styles.scoreTitle}>Kuis Selesai!</Text>
        <Text style={styles.scoreText}>Skor Anda: {score} / {QUIZ_QUESTIONS.length}</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/')}>
          <Text style={styles.primaryBtnText}>Kembali ke Beranda</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = QUIZ_QUESTIONS[currentQuestion];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.progressText}>Pertanyaan {currentQuestion + 1} / {QUIZ_QUESTIONS.length}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{q.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {q.options.map((opt, index) => (
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
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 48,
  },
  backBtn: {},
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  content: {
    padding: 24,
    flex: 1,
  },
  questionCard: {
    backgroundColor: COLORS.surface,
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    marginBottom: 32,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  optionBtn: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  optionText: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  scoreTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 24,
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 18,
    color: COLORS.textLight,
    marginBottom: 32,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 100,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  }
});
