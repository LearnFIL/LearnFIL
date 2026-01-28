import { BookOpen, Trophy, CheckCircle2 } from 'lucide-react';
import type { Lesson } from '../lib/supabase';
import BookmarkButton from "../components/BookmarkButton"

interface LessonContentProps {
  lesson: Lesson;
  isCompleted: boolean;
  onMarkComplete?: () => void;
}

export function LessonContent({ lesson, isCompleted, onMarkComplete }: LessonContentProps) {
  const preprocessContent = (content: string): string => {
    const lines = content.split('\n');
    let firstNonEmptyIndex = lines.findIndex(line => line.trim() !== '');

    if (firstNonEmptyIndex !== -1 && lines[firstNonEmptyIndex].startsWith('# ')) {
      lines.splice(firstNonEmptyIndex, 1);
    }

    return lines.join('\n');
  };

  const formatContent = (content: string) => {
    const processedContent = preprocessContent(content);

    return processedContent.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold text-gray-900 mb-4 mt-6">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-gray-900 mb-3 mt-5">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold text-gray-900 mb-2 mt-4">{line.slice(4)}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-bold text-gray-900 mb-2">{line.slice(2, -2)}</p>;
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-gray-800 mb-2 ml-4 leading-relaxed">
            {line.slice(2)}
          </li>
        );
      }
      if (line.startsWith('`') && line.endsWith('`')) {
        return (
          <code key={index} className="block bg-cream-200 p-4 rounded-2xl font-mono text-sm text-gray-900 my-3 border-3 border-gray-900">
            {line.slice(1, -1)}
          </code>
        );
      }
      if (line.trim() === '') {
        return <div key={index} className="h-3" />;
      }
      return <p key={index} className="text-gray-800 mb-4 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-cream-100">
      <div className="max-w-3xl mx-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-teal-300 border-3 border-gray-900 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-gray-900" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
            <BookmarkButton lessonId={lesson.id} />
          </div>
        </div>

        {isCompleted && (
          <div className="mb-4 p-3 bg-teal-100 border-2 border-teal-400 rounded-2xl flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            <p className="text-sm text-gray-800 font-semibold">You've completed this lesson</p>
          </div>
        )}

        <div className="prose prose-gray max-w-none">
          {formatContent(lesson.content)}
        </div>

        {!isCompleted && onMarkComplete && (
          <div className="mt-8 pt-6 border-t-3 border-gray-900">
            <button
              onClick={onMarkComplete}
              className="px-6 py-3 bg-sunshine-400 hover:bg-sunshine-500 text-gray-900 font-bold rounded-full border-3 border-gray-900 transition-all flex items-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Mark as Complete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
