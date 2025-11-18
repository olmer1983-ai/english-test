import React, { useState } from 'react';
import { Test, Question, AnswerOption } from '../types';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface TestCreatorProps {
  teacherName: string;
  onSaveTest: (test: Test) => void;
  onCancel: () => void;
  existingTest?: Test | null;
}

const TestCreator: React.FC<TestCreatorProps> = ({ teacherName, onSaveTest, onCancel, existingTest }) => {
  const [title, setTitle] = useState(existingTest?.title || '');
  const [questions, setQuestions] = useState<Question[]>(existingTest?.questions || []);

  const handleQuestionChange = (index: number, text: string) => {
    const newQuestions = [...questions];
    newQuestions[index].text = text;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, text: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = text;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (qIndex: number, optionId: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswerId = optionId;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: crypto.randomUUID(),
        text: '',
        options: [
          { id: crypto.randomUUID(), text: '' },
          { id: crypto.randomUUID(), text: '' },
        ],
        correctAnswerId: '',
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };
  
  const addOption = (qIndex: number) => {
    const newQuestions = [...questions];
    if(newQuestions[qIndex].options.length < 5) {
        newQuestions[qIndex].options.push({ id: crypto.randomUUID(), text: '' });
        setQuestions(newQuestions);
    }
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    const newQuestions = [...questions];
    const removedOptionId = newQuestions[qIndex].options[oIndex].id;
    newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, i) => i !== oIndex);
    if(newQuestions[qIndex].correctAnswerId === removedOptionId) {
        newQuestions[qIndex].correctAnswerId = '';
    }
    setQuestions(newQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || questions.length === 0 || questions.some(q => !q.text || q.options.length < 2 || q.options.some(o => !o.text) || !q.correctAnswerId)) {
      alert('Пожалуйста, заполните все поля: название, все вопросы и варианты ответов, а также выберите правильный ответ для каждого вопроса.');
      return;
    }

    const test: Test = {
      id: existingTest?.id || crypto.randomUUID(),
      title,
      teacherName,
      questions,
    };
    onSaveTest(test);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <button onClick={onCancel} className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline mb-4">
         <ChevronLeftIcon className="w-4 h-4 mr-1"/> Назад на главную
      </button>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{existingTest ? 'Редактировать тест' : 'Создать новый тест'}</h2>
          <label htmlFor="test-title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Название теста</label>
          <input
            id="test-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="например, Грамматика - Уровень B1"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {questions.map((q, qIndex) => (
          <div key={q.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 relative">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Вопрос {qIndex + 1}</h3>
            <button
                type="button"
                onClick={() => removeQuestion(qIndex)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
                <TrashIcon className="w-6 h-6"/>
            </button>
            <textarea
              value={q.text}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              placeholder="Введите текст вопроса"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
              required
            />
            <div className="mt-4 space-y-3">
              <h4 className="text-md font-medium text-slate-700 dark:text-slate-300">Варианты ответа</h4>
              {q.options.map((opt, oIndex) => (
                <div key={opt.id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`correct-answer-${qIndex}`}
                    checked={q.correctAnswerId === opt.id}
                    onChange={() => handleCorrectAnswerChange(qIndex, opt.id)}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    placeholder={`Вариант ${oIndex + 1}`}
                    className="block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  {q.options.length > 2 && (
                    <button type="button" onClick={() => removeOption(qIndex, oIndex)} className="text-slate-400 hover:text-red-500">
                      <TrashIcon className="w-5 h-5"/>
                    </button>
                  )}
                </div>
              ))}
              {q.options.length < 5 && (
                 <button type="button" onClick={() => addOption(qIndex)} className="flex items-center text-sm text-indigo-600 hover:text-indigo-800">
                    <PlusIcon className="w-4 h-4 mr-1"/> Добавить вариант
                 </button>
              )}
            </div>
          </div>
        ))}
        
        <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="w-5 h-5 mr-2"/> Добавить вопрос
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Сохранить тест
            </button>
        </div>
      </form>
    </div>
  );
};

export default TestCreator;