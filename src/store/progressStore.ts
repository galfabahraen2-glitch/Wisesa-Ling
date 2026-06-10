import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProgressState {
  currentDay: number;
  totalScore: number;
  learnedWords: string[];
  completeDay: (day: number) => void;
  addScore: (points: number) => void;
  addLearnedWord: (word: string) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      currentDay: 1,
      totalScore: 0,
      learnedWords: [],
      completeDay: (day) => set((state) => ({ 
        currentDay: state.currentDay === day ? state.currentDay + 1 : state.currentDay 
      })),
      addScore: (points) => set((state) => ({ totalScore: state.totalScore + points })),
      addLearnedWord: (word) => set((state) => ({ 
        learnedWords: state.learnedWords.includes(word) ? state.learnedWords : [...state.learnedWords, word] 
      })),
      resetProgress: () => set({ currentDay: 1, totalScore: 0, learnedWords: [] }),
    }),
    {
      name: 'wisesaling-progress',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
