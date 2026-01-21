import { BookMarked, Code, Zap, Trophy, Rocket, Users, ArrowRight} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-cream-200">
      <header className="bg-white border-b-4 border-gray-900 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12.5 overflow-hidden">
            <img
            src="/lflogo.png"
            alt="Learn logo"
            className="w-full h-full object-cover"
            />
           </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">LearnFIL</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onLogin}
              className="px-6 py-3 bg-white hover:bg-cream-100 text-gray-900 font-bold rounded-full border-3 border-gray-900 transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-3xl p-8 border-4 border-gray-900 relative">
              <div className="absolute -top-3 left-8 bg-white px-3 border-3 border-gray-900 rounded-full text-xs font-bold">
                Start here!
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Master Filecoin
                <br />
                One Lesson at a Time
              </h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Learn decentralized storage development through interactive, hands-on lessons.
                Build real skills with in-browser coding challenges and instant feedback.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-9">
            <button
              onClick={onGetStarted}
              className="group px-8 py-4 bg-sunshine-400 hover:bg-sunshine-500 text-gray-900 font-bold rounded-full border-4 border-gray-900 transition-all flex items-center gap-2 text-lg"
            >
              Start Learning Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-2 text-gray-700 bg-white px-4 py-2 rounded-full border-3 border-gray-900">
              <Rocket className="w-5 h-5" />
              <span className="text-sm font-semibold">In early beta</span>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose LearnFIL?
            </h3>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              The fastest way to go from curious to confident Filecoin developer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border-4 border-gray-900 hover:translate-y-[-4px] transition-transform">
              <div className="w-16 h-16 rounded-full bg-sunshine-400 border-3 border-gray-900 flex items-center justify-center mb-5">
                <Code className="w-8 h-8 text-gray-900" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Interactive Coding
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Write and run code directly in your browser. Get instant feedback with built-in test validation.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border-4 border-gray-900 hover:translate-y-[-4px] transition-transform">
              <div className="w-16 h-16 rounded-full bg-teal-300 border-3 border-gray-900 flex items-center justify-center mb-5">
                <Zap className="w-8 h-8 text-gray-900" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Learn by Doing
              </h4>
              <p className="text-gray-700 leading-relaxed">
                No passive videos. Every lesson includes practical exercises that build real-world skills.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border-4 border-gray-900 hover:translate-y-[-4px] transition-transform">
              <div className="w-16 h-16 rounded-full bg-blob-300 border-3 border-gray-900 flex items-center justify-center mb-5">
                <Trophy className="w-8 h-8 text-gray-900" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Track Progress
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Monitor your learning journey with completion tracking and visual progress indicators.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border-4 border-gray-900 hover:translate-y-[-4px] transition-transform">
              <div className="w-16 h-16 rounded-full bg-sky-300 border-3 border-gray-900 flex items-center justify-center mb-5">
                <Rocket className="w-8 h-8 text-gray-900" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Beginner Friendly
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Start from zero. No prior Filecoin experience needed. Clear explanations every step.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border-4 border-gray-900 hover:translate-y-[-4px] transition-transform">
              <div className="w-16 h-16 rounded-full bg-sunshine-300 border-3 border-gray-900 flex items-center justify-center mb-5">
                <BookMarked className="w-8 h-8 text-gray-900" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Structured Path
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Follow a carefully designed curriculum from CIDs to smart contracts on FVM.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border-4 border-gray-900 hover:translate-y-[-4px] transition-transform">
              <div className="w-16 h-16 rounded-full bg-teal-200 border-3 border-gray-900 flex items-center justify-center mb-5">
                <Users className="w-8 h-8 text-gray-900" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Community Driven
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Join a growing community of Filecoin developers building the decentralized future.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="bg-sunshine-400 rounded-4xl p-12 md:p-16 text-center border-5 border-gray-900 relative overflow-hidden">
            <div className="absolute top-4 right-4 w-24 h-24 bg-teal-300 rounded-full border-3 border-gray-900"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-blob-300 rounded-full border-3 border-gray-900"></div>
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Ready to Build on Filecoin?
              </h3>
              <p className="text-xl mb-8 text-gray-800 max-w-2xl mx-auto font-semibold">
                Start your journey today. No credit card required. No setup needed.
              </p>
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-white text-gray-900 hover:bg-cream-100 font-bold rounded-full border-4 border-gray-900 transition-all flex items-center gap-2 text-lg mx-auto"
              >
                Begin Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t-4 border-gray-900 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-700">
          <p className="font-semibold">Built for the Filecoin community with care</p>
        </div>
      </footer>
    </div>
  );
}
