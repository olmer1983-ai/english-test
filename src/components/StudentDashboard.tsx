import React from 'react';
import { Test } from '../types';

interface StudentDashboardProps {
  studentName: string;
  tests: Test[];
  onStartTest: (test: Test) => void;
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ studentName, tests, onStartTest, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Добро пожаловать, {studentName}!</h1>
            <p className="text-slate-600 dark:text-slate-400">Готовы проверить свои знания?</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Выйти
          </button>
        </header>
        
        <main>
          <h2 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Доступные тесты</h2>
          {tests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tests.map(test => (
                <div key={test.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{test.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Создатель: {test.teacherName}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{test.questions.length} вопросов</p>
                  </div>
                  {/* FIX: Corrected a syntax error in the button's className prop and added the button text. */}
                  <button
                    onClick={() => onStartTest(test)}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Начать тест
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Сейчас нет доступных тестов.</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Пожалуйста, зайдите позже!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;