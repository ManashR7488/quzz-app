import { create } from 'zustand';

const useQuizStore = create((set) => ({
  step: 'modal',
  userInfo: { name: '', email: '', phone: '' },
  questions: [],
  answers: [],
  result: null,

  setStep: (step) => set({ step }),
  
  setUserInfo: (userInfo) => set({ userInfo }),
  
  setQuestions: (questions) => set({ questions }),
  
  setAnswer: (questionId, choice) => set((state) => {
    const existingIndex = state.answers.findIndex(a => a.questionId === questionId);
    if (existingIndex >= 0) {
      const newAnswers = [...state.answers];
      newAnswers[existingIndex] = { questionId, choice };
      return { answers: newAnswers };
    }
    return { answers: [...state.answers, { questionId, choice }] };
  }),
  
  setResult: (result) => set({ result }),
  
  reset: () => set({
    step: 'modal',
    userInfo: { name: '', email: '', phone: '' },
    questions: [],
    answers: [],
    result: null
  })
}));

export default useQuizStore;
