import { useMemo, useState } from 'react';
import { Card, PageHeader } from '@/components/ui/Card';

const DEFAULT_SOURCE = 'Write your source text here...';
const DEFAULT_TRANSLATION = 'Write your translated text here...';

export function EditorPage() {
  const [sourceText, setSourceText] = useState(DEFAULT_SOURCE);
  const [translatedText, setTranslatedText] = useState(DEFAULT_TRANSLATION);
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');

  const sourceWordCount = useMemo(() => {
    return sourceText.trim().split(/\s+/).filter(Boolean).length;
  }, [sourceText]);

  return (
    <div className="space-y-8 p-4 pb-8 lg:p-8">
      <PageHeader
        title="Bilingual Content Editor"
        description="Create and compare source and translated content in a side-by-side editor."
      />

      <Card className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Source language
            </label>
            <select
              value={sourceLanguage}
              onChange={(event) => setSourceLanguage(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option>English</option>
              <option>French</option>
              <option>German</option>
              <option>Spanish</option>
            </select>
          </div>

          <div className="hidden items-center justify-center text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 sm:flex">
            Bilingual editor
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Target language
            </label>
            <select
              value={targetLanguage}
              onChange={(event) => setTargetLanguage(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option>Spanish</option>
              <option>English</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Source text</h2>
            <textarea
              value={sourceText}
              onChange={(event) => setSourceText(event.target.value)}
              rows={10}
              className="h-64 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">{sourceWordCount} words in {sourceLanguage}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Translation</h2>
            <textarea
              value={translatedText}
              onChange={(event) => setTranslatedText(event.target.value)}
              rows={10}
              className="h-64 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </section>
        </div>
      </Card>
    </div>
  );
}
