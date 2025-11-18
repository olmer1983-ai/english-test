import React, { useState } from 'react';

interface StudentLoginProps {
  onLogin: (name: string) => void;
  onBack: () => void;
}

const StudentLogin: React.FC<StudentLoginProps> = ({ onLogin, onBack }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
      <div className="w-full max-w-sm">
        <button onClick={onBack} className="absolute top-4 left-4 text-indigo-600 dark:text-indigo-400 hover:underline">
          &larr; Назад к выбору роли
        </button>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-200 mb-6">Регистрация ученика</h2>
          <div className="mb-4">
            <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2" htmlFor="fullname">
              Полное имя
            </label>
            <input
              id="fullname"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="например, Иван Иванов"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-300"
            >
              Начать обучение
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;