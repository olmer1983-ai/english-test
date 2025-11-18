import React, { useState, useCallback } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { Role, Test, TestSubmission } from './types';

import RoleSelection from './components/RoleSelection';
import TeacherDashboard from './components/TeacherDashboard';
import StudentLogin from './components/StudentLogin';
import StudentDashboard from './components/StudentDashboard';
import TestCreator from './components/TestCreator';
import ResultsViewer from './components/ResultsViewer';
import TestTaker from './components/TestTaker';
import TestResult from './components/TestResult';
import TeacherLogin from './components/TeacherLogin';

// Different views for cleaner state management
enum AppView {
  ROLE_SELECTION,
  STUDENT_LOGIN,
  STUDENT_DASHBOARD,
  STUDENT_TAKING_TEST,
  STUDENT_TEST_RESULT,
  TEACHER_LOGIN,
  TEACHER_DASHBOARD,
  TEACHER_TEST_CREATOR,
  TEACHER_RESULTS_VIEWER
}

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.ROLE_SELECTION);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // State for navigation within views
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  const [lastSubmission, setLastSubmission] = useState<TestSubmission | null>(null);

  // Data stored in localStorage
  const [tests, setTests] = useLocalStorage<Test[]>('english-tests', []);
  const [submissions, setSubmissions] = useLocalStorage<TestSubmission[]>('english-test-submissions', []);

  const handleRoleSelect = useCallback((role: Role) => {
    if (role === Role.TEACHER) {
      setView(AppView.TEACHER_LOGIN);
    } else if (role === Role.STUDENT) {
      setView(AppView.STUDENT_LOGIN);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setActiveTest(null);
    setEditingTest(null);
    setLastSubmission(null);
    setView(AppView.ROLE_SELECTION);
  }, []);

  // --- Student Flow Handlers ---
  const handleStudentLogin = useCallback((name: string) => {
    setCurrentUser(name);
    setView(AppView.STUDENT_DASHBOARD);
  }, []);

  const handleStartTest = useCallback((test: Test) => {
    setActiveTest(test);
    setView(AppView.STUDENT_TAKING_TEST);
  }, []);

  const handleSubmitTest = useCallback((submission: TestSubmission) => {
    setSubmissions(prev => [...prev, submission]);
    setLastSubmission(submission);
    setActiveTest(null);
    setView(AppView.STUDENT_TEST_RESULT);
  }, [setSubmissions]);
  
  // --- Teacher Flow Handlers ---
  const handleTeacherLogin = useCallback((name: string) => {
    setCurrentUser(name);
    setView(AppView.TEACHER_DASHBOARD);
  }, []);

  const handleShowTestCreator = useCallback((test?: Test) => {
    setEditingTest(test || null);
    setView(AppView.TEACHER_TEST_CREATOR);
  }, []);

  const handleSaveTest = useCallback((testToSave: Test) => {
    setTests(prevTests => {
      const testExists = prevTests.some(t => t.id === testToSave.id);
      if (testExists) {
        return prevTests.map(t => t.id === testToSave.id ? testToSave : t);
      }
      return [...prevTests, testToSave];
    });
    setEditingTest(null);
    setView(AppView.TEACHER_DASHBOARD);
  }, [setTests]);

  const handleDeleteTest = useCallback((testId: string) => {
    setTests(prev => prev.filter(t => t.id !== testId));
  }, [setTests]);

  const renderContent = () => {
    switch (view) {
      case AppView.ROLE_SELECTION:
        return <RoleSelection onSelectRole={handleRoleSelect} />;
      
      case AppView.STUDENT_LOGIN:
        return <StudentLogin onLogin={handleStudentLogin} onBack={() => setView(AppView.ROLE_SELECTION)} />;
      
      case AppView.STUDENT_DASHBOARD:
        if (!currentUser) return <StudentLogin onLogin={handleStudentLogin} onBack={() => setView(AppView.ROLE_SELECTION)} />;
        return <StudentDashboard studentName={currentUser} tests={tests} onStartTest={handleStartTest} onLogout={handleLogout} />;
      
      case AppView.STUDENT_TAKING_TEST:
        if (!activeTest || !currentUser) return <StudentDashboard studentName={currentUser || ''} tests={tests} onStartTest={handleStartTest} onLogout={handleLogout} />;
        return <TestTaker test={activeTest} studentName={currentUser} onSubmitTest={handleSubmitTest} onBackToDashboard={() => setView(AppView.STUDENT_DASHBOARD)} />;

      case AppView.STUDENT_TEST_RESULT:
        if (!lastSubmission) return <StudentDashboard studentName={currentUser || ''} tests={tests} onStartTest={handleStartTest} onLogout={handleLogout} />;
        return <TestResult submission={lastSubmission} onBackToDashboard={() => setView(AppView.STUDENT_DASHBOARD)} />;

      case AppView.TEACHER_LOGIN:
        return <TeacherLogin onLogin={handleTeacherLogin} onBack={() => setView(AppView.ROLE_SELECTION)} />;

      case AppView.TEACHER_DASHBOARD:
        if (!currentUser) return <TeacherLogin onLogin={handleTeacherLogin} onBack={() => setView(AppView.ROLE_SELECTION)} />;
        return <TeacherDashboard teacherName={currentUser} tests={tests} onShowCreator={handleShowTestCreator} onShowResults={() => setView(AppView.TEACHER_RESULTS_VIEWER)} onDeleteTest={handleDeleteTest} onLogout={handleLogout}/>;
      
      case AppView.TEACHER_TEST_CREATOR:
        if (!currentUser) return <TeacherLogin onLogin={handleTeacherLogin} onBack={() => setView(AppView.ROLE_SELECTION)} />;
        return <TestCreator teacherName={currentUser} onSaveTest={handleSaveTest} onCancel={() => setView(AppView.TEACHER_DASHBOARD)} existingTest={editingTest} />;

      case AppView.TEACHER_RESULTS_VIEWER:
        if (!currentUser) return <TeacherLogin onLogin={handleTeacherLogin} onBack={() => setView(AppView.ROLE_SELECTION)} />;
        return <ResultsViewer submissions={submissions} onBack={() => setView(AppView.TEACHER_DASHBOARD)} />;
        
      default:
        return <RoleSelection onSelectRole={handleRoleSelect} />;
    }
  };

  return <div className="App">{renderContent()}</div>;
};

export default App;
