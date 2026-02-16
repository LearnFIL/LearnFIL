import { useState, useEffect } from 'react';
import { BookMarked, User, Github } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { ProfileDropdown } from './components/ProfileDropdown';
import type { Module, Lesson } from './lib/supabase';
import { LandingPage } from './components/LandingPage';
import { ModuleCard } from './components/ModuleCard';
import { LessonList } from './components/LessonList';
import { LessonContent } from './components/LessonContent';
import { CodeEditor, TestResult } from './components/CodeEditor';
import { AuthPage } from './components/AuthPage';
import { CelebrationPage } from './components/CelebrationPage';
import { useProgress } from './hooks/useProgress';
import { runTests } from './utils/codeRunner';
import { getModules, saveModules, getLessons, saveLessons } from './utils/localStorage';
import { SEED_MODULES, SEED_LESSONS } from './data/seedData';
import CertificateButton from './components/CertificateButton';


type View = 'landing' | 'modules' | 'lessons' | 'lesson' | 'celebration' | 'auth-signup' | 'auth-login';

function App() {
  const [view, setView] = useState<View>('landing');
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentCode, setCurrentCode] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const { loading, markLessonComplete, isLessonComplete, getCompletedLessonIds } = useProgress(user?.id || 'demo-user');
  const allModulesCompleted = modules.length > 0 && modules.every(module => {
  const moduleLessons = getLessons().filter(l => l.module_id === module.id);
  return moduleLessons.every(l => isLessonComplete(l.id));
});


  useEffect(() => {
    loadModules();
  }, []);

  const initializeData = () => {
    const existingModules = getModules();
    const existingLessons = getLessons();

    if (existingModules.length === 0) {
      saveModules(SEED_MODULES);
    }
    if (existingLessons.length === 0) {
      saveLessons(SEED_LESSONS);
    }
  };

  const loadModules = () => {
    initializeData();
    const data = getModules();
    setModules(data);
  };

  const loadLessons = (moduleId: string) => {
    const allLessons = getLessons();
    const filteredLessons = allLessons
      .filter(lesson => lesson.module_id === moduleId)
      .sort((a, b) => a.order_index - b.order_index);
    setLessons(filteredLessons);
  };

  const handleModuleClick = (module: Module) => {
    setCurrentModule(module);
    loadLessons(module.id);
    setView('lessons');
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setCurrentCode(lesson.starter_code);
    setTestResults([]);
    setView('lesson');
  };

  const handleBackToModules = () => {
    setView('modules');
    setCurrentModule(null);
    setLessons([]);
  };

  const handleRunCode = async (code: string) => {
    if (!currentLesson) return;

    setIsRunning(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const results = runTests(code, currentLesson.validation_tests);
    setTestResults(results);

    const allPassed = results.every(r => r.passed);
    if (allPassed && !isLessonComplete(currentLesson.id)) {
      await markLessonComplete(currentLesson.id, code);
      setView('celebration');
    }

    setIsRunning(false);
  };

  const handleMarkComplete = async () => {
    if (!currentLesson) return;
    await markLessonComplete(currentLesson.id, currentCode);
    setView('celebration');
  };


  useEffect(() => {
    if (!authLoading && !user && view !== 'landing' && view !== 'auth-signup' && view !== 'auth-login') {
      setView('landing');
    }
  }, [authLoading, user, view]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-cream-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sunshine-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-800 font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  if (loading && view !== 'landing' && view !== 'auth-signup' && view !== 'auth-login') {
    return (
      <div className="min-h-screen bg-cream-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sunshine-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-800 font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('auth-signup')} onLogin={() => setView('auth-login')} />;
  }

  if (view === 'auth-signup') {
    return <AuthPage onBack={() => setView('landing')} onSuccess={() => setView('modules')} initialMode="signup" />;
  }

  if (view === 'auth-login') {
    return <AuthPage onBack={() => setView('landing')} onSuccess={() => setView('modules')} initialMode="login" />;
  }

  if (view === 'celebration' && currentLesson && currentModule) {
    const allLessons = getLessons();
    const moduleLessons = allLessons.filter(l => l.module_id === currentModule.id);
    const completedCount = moduleLessons.filter(l => isLessonComplete(l.id)).length;
    const totalCount = moduleLessons.length;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    const hasNextLesson = currentIndex !== -1 && currentIndex < lessons.length - 1;
    const nextLesson = hasNextLesson ? lessons[currentIndex + 1] : null;

    return (
      <CelebrationPage
        lesson={currentLesson}
        moduleTitle={currentModule.title}
        completedCount={completedCount}
        totalCount={totalCount}
        hasNextLesson={hasNextLesson}
        onContinue={() => setView('lessons')}
        onNextLesson={nextLesson ? () => handleLessonSelect(nextLesson) : undefined}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cream-200 flex flex-col">
      <header className="bg-white border-b-4 border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <button
            onClick={() => setView('landing')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 rounded-full bg-sunshine-400 border-3 border-gray-900 flex items-center justify-center">
              <BookMarked className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LearnFIL</h1>
              <p className="text-sm text-gray-700 font-semibold">Master Filecoin Development</p>
            </div>
          </button>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Fatumayattani/LearnFIL"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full bg-sunshine-400 hover:bg-sunshine-500 border-3 border-gray-900 flex items-center justify-center transition-all"
              >
                <User className="w-5 h-5 text-gray-900" />
              </button>
              <ProfileDropdown isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {view === 'modules' && (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
               {/* ---------- CERTIFICATE BUTTON ---------- */}
      {allModulesCompleted && (
        <div className="mb-8 text-center">
          <p className="mb-2 font-semibold text-lg">You’ve completed all modules! 🎉</p>
          <CertificateButton
            userName={user?.name || 'Anonymous'}
            walletAddress={user?.walletAddress || '0x000...'}
            trackName="LearnFIL Core Developer Track"
          />
        </div>
      )}
              <div className="mb-10 bg-white rounded-3xl p-8 border-4 border-gray-900 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-teal-300 rounded-full border-3 border-gray-900"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-sunshine-400 rounded-full border-3 border-gray-900"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl font-bold text-gray-900 mb-3">
                    Welcome to LearnFIL
                  </h2>
                  <p className="text-lg text-gray-800 font-semibold">
                    Start your journey to becoming a Filecoin developer with interactive, hands-on lessons.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map(module => {
                  const allLessons = getLessons();
                  const moduleLessons = allLessons.filter(l => l.module_id === module.id);
                  const completedCount = moduleLessons.filter(l => isLessonComplete(l.id)).length;
                  const totalCount = moduleLessons.length;

                  return (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      lessonsCount={totalCount}
                      completedCount={completedCount}
                      onClick={() => handleModuleClick(module)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {view === 'lessons' && currentModule && (
          <div className="flex-1 flex overflow-hidden">
            <LessonList
              lessons={lessons}
              completedLessonIds={getCompletedLessonIds()}
              currentLessonId={currentLesson?.id || null}
              onLessonSelect={handleLessonSelect}
              onBack={handleBackToModules}
              moduleTitle={currentModule.title}
            />
            <div className="flex-1 flex items-center justify-center bg-cream-100">
              <div className="text-center max-w-md px-6">
                <div className="w-24 h-24 rounded-full bg-blob-200 border-4 border-gray-900 flex items-center justify-center mx-auto mb-6">
                  <BookMarked className="w-12 h-12 text-gray-900" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Select a lesson to begin
                </h3>
                <p className="text-gray-800 font-semibold">
                  Choose a lesson from the sidebar to start learning about {currentModule.title.toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
        )}

        {view === 'lesson' && currentLesson && currentModule && (
          <div className="flex-1 flex overflow-hidden">
            <LessonList
              lessons={lessons}
              completedLessonIds={getCompletedLessonIds()}
              currentLessonId={currentLesson.id}
              onLessonSelect={handleLessonSelect}
              onBack={handleBackToModules}
              moduleTitle={currentModule.title}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 flex overflow-hidden">
                <LessonContent
                  lesson={currentLesson}
                  isCompleted={isLessonComplete(currentLesson.id)}
                  onMarkComplete={handleMarkComplete}
                />
                {currentLesson.starter_code && (
                  <div className="w-1/2 border-l border-gray-200">
                    <CodeEditor
                      initialCode={currentLesson.starter_code}
                      onCodeChange={setCurrentCode}
                      onRun={handleRunCode}
                      testResults={testResults}
                      isRunning={isRunning}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
