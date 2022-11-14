export interface QuizParams {
  id: number;
  name: string;
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
  completed: boolean;
  maxScore: number;
  userScore: number;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      quiz: {
        id: number;
        name: string;
        question: string;
        incorrectAnswers: string[];
        correctAnswer: string;
        completed: boolean;
        maxScore: number;
        userScore: number;
      };
    }
  }
}
