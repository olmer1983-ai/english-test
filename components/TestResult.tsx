import React from 'react';
import { TestSubmission } from '../types';

interface TestResultProps {
  submission: TestSubmission;
  onBackToDashboard: () => void;
}

const TestResult: React.FC<TestResultProps> = ({ submission, onBackToDashboard }) => {
  const percentage = Math.round((submission.score / submission.totalQuestions) * 100);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md text-center bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Тест завершен!</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 mb-6">Вот ваши результаты по тесту "{submission.testTitle}".</p>
        
        <div className="my-8">
          <div className="text-6xl font-bold text-indigo-600 dark:text-indigo-400">{percentage}%</div>
          <div className="text-lg text-slate-700 dark:text-slate-300 mt-2">
            Вы ответили правильно на <span className="font-bold">{submission.score}</span> из <span className="font-bold">{submission.totalQuestions}</span> вопросов.
          </div>
        </div>
        
        <button
          onClick={onBackToDashboard}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );
};

export default TestResult;