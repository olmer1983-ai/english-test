import React, { useState, useMemo } from 'react';
import { TestSubmission } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface ResultsViewerProps {
  submissions: TestSubmission[];
  onBack: () => void;
}

const ResultsViewer: React.FC<ResultsViewerProps> = ({ submissions, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubmissions = useMemo(() => {
    return submissions
      .filter(s => s.studentName.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  }, [submissions, searchTerm]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <button onClick={onBack} className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline mb-4">
        <ChevronLeftIcon className="w-4 h-4 mr-1"/> Назад на главную
      </button>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Результаты учеников</h2>
        
        <input
          type="text"
          placeholder="Поиск по имени ученика..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 block w-full max-w-sm px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />

        <div className="overflow-x-auto">
          {filteredSubmissions.length > 0 ? (
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Имя ученика</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Название теста</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Результат</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Дата сдачи</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                {filteredSubmissions.map(sub => (
                  <tr key={sub.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{sub.studentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">{sub.testTitle}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">{sub.score} / {sub.totalQuestions} ({Math.round(sub.score/sub.totalQuestions * 100)}%)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">{new Date(sub.submittedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
             <div className="text-center py-10">
              <p className="text-slate-500 dark:text-slate-400">По вашему запросу ничего не найдено.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsViewer;