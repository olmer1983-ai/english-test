import React from 'react';
import { Role } from '../types';
import AcademicCapIcon from './icons/AcademicCapIcon';
import UserGroupIcon from './icons/UserGroupIcon';

interface RoleSelectionProps {
  onSelectRole: (role: Role) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">Добро пожаловать!</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-12">Пожалуйста, выберите вашу роль, чтобы продолжить.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            onClick={() => onSelectRole(Role.TEACHER)}
            className="group flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <AcademicCapIcon className="w-16 h-16 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
            <span className="mt-4 text-2xl font-semibold text-slate-700 dark:text-slate-200">Я Учитель</span>
          </button>
          <button
            onClick={() => onSelectRole(Role.STUDENT)}
            className="group flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <UserGroupIcon className="w-16 h-16 text-teal-500 group-hover:text-teal-600 transition-colors" />
            <span className="mt-4 text-2xl font-semibold text-slate-700 dark:text-slate-200">Я Ученик</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
