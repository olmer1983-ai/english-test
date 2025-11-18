import React, { useState, useEffect } from 'react';
import { Test, TestSubmission, StudentAnswer } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface TestTakerProps {
  test: Test;
  studentName: string;
  onSubmitTest: (submission: TestSubmission) => void;
  onBackToDashboard: () => void;
}

const TestTaker: React.FC<TestTakerProps> = ({ test, studentName, onSubmitTest, onBackToDashboard }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [timeLeft, setTimeLeft] = useState(test.questions.length * 60); // 60 seconds per question

  const currentQuestion = test.questions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers(prev => new Map(prev).set(questionId, answerId));
  };

  const goToNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    let score = 0;
    const studentAnswers: StudentAnswer[] = [];
    
    test.questions.forEach(q => {
      const selectedAnswerId = answers.get(q.id);
      studentAnswers.push({ questionId: q.id, selectedAnswerId: selectedAnswerId || '' });
      if (selectedAnswerId === q.correctAnswerId) {
        score++;
      }
    });

    const submission: TestSubmission = {
      id: crypto.randomUUID(),
      studentName,
      testId: test.id,
      testTitle: test.title,
      answers: studentAnswers,
      score,
      totalQuestions: test.questions.length,
      submittedAt: new Date().toISOString(),
    };
    onSubmitTest(submission);
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center p-4">
      <div className="w-full max-w-3xl">
        <button onClick={onBackToDashboard} className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline mb-4">
          <ChevronLeftIcon className="w-4 h-4 mr-1"/>
          Назад на главную
        </button>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8">
          <header className="mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">{test.title}</h1>
                    <p className="text-slate-500 dark:text-slate-400">Вопрос {currentQuestionIndex + 1} из {test.questions.length}</p>
                </div>
                <div className={`text-lg font-semibold px-3 py-1 rounded-md ${timeLeft < 60 ? 'text-red-600 bg-red-100 dark:bg-red-900/50' : 'text-slate-700 dark:text-slate-200'}`}>
                    {formatTime(timeLeft)}
                </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mt-4">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / test.questions.length) * 100}%` }}></div>
            </div>
          </header>
          
          <main>
            <h2 className="text-xl font-semibold mb-6 text-slate-700 dark:text-slate-200">{currentQuestion.text}</h2>
            <div className="space-y-4">
              {currentQuestion.options.map(option => (
                <label key={option.id} className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${answers.get(currentQuestion.id) === option.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400'}`}>
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option.id}
                    checked={answers.get(currentQuestion.id) === option.id}
                    onChange={() => handleAnswerSelect(currentQuestion.id, option.id)}
                    className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-4 text-slate-800 dark:text-slate-200">{option.text}</span>
                </label>
              ))}
            </div>
          </main>
          
          <footer className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <button
              onClick={goToPrev}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Назад
            </button>
            {currentQuestionIndex === test.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
              >
                Завершить тест
              </button>
            ) : (
              <button
                onClick={goToNext}
                disabled={!answers.has(currentQuestion.id)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Далее
              </button>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TestTaker;