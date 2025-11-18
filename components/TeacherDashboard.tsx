import React from 'react';
import { Test } from '../types';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

interface TeacherDashboardProps {
  teacherName: string;
  tests: Test[];
  onShowCreator: (test?: Test) => void;
  onShowResults: () => void;
  onDeleteTest: (testId: string) => void;
  onLogout: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ teacherName, tests, onShowCreator, onShowResults, onDeleteTest, onLogout }) => {
  const teacherTests = tests.filter(t => t.teacherName === teacherName);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Панель учителя</h1>
            <p className="text-slate-600 dark:text-slate-400">С возвращением, {teacherName}!</p>
          </div>
          <div className="flex gap-2">
            <button
                onClick={() => onShowCreator()}
                className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Создать тест
            </button>
            <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Выйти
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Ваши тесты</h2>
            {teacherTests.length > 0 ? (
              <div className="space-y-4">
                {teacherTests.map(test => (
                  <div key={test.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white">{test.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{test.questions.length} вопросов</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onShowCreator(test)} className="text-sm bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold py-1 px-3 rounded-md transition-colors">
                        Редакт.
                      </button>
                      <button onClick={() => {if(window.confirm('Вы уверены, что хотите удалить этот тест? Это действие нельзя отменить.')) onDeleteTest(test.id)}} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                 <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Вы еще не создали ни одного теста.</h3>
                 <button onClick={() => onShowCreator()} className="mt-4 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Создайте свой первый тест</button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
               <h2 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Аналитика</h2>
               <button
                  onClick={onShowResults}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  Посмотреть результаты учеников
               </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;