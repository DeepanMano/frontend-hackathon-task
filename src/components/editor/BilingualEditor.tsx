import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface BilingualEditorProps {
  initial?: { en?: string; es?: string };
}

export function BilingualEditor({ initial }: BilingualEditorProps) {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [contentEn, setContentEn] = useState(initial?.en ?? '');
  const [contentEs, setContentEs] = useState(initial?.es ?? '');

  const handleSave = () => {
    // Replace this with real save integration when provided.
    // For now we just log the values so integration points exist.
    console.log('Save bilingual content', { en: contentEn, es: contentEs });
    alert('Content saved (stub) — replace with real save logic');
  };

  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`rounded-md px-3 py-1 text-sm font-medium ${lang === 'en' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLang('es')}
            className={`rounded-md px-3 py-1 text-sm font-medium ${lang === 'es' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}
          >
            Español
          </button>
        </div>

        <div>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>

      <div className="mt-4">
        <textarea
          value={lang === 'en' ? contentEn : contentEs}
          onChange={(e) => (lang === 'en' ? setContentEn(e.target.value) : setContentEs(e.target.value))}
          className="w-full min-h-[240px] rounded-md border border-slate-200 p-3 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          placeholder={lang === 'en' ? 'Write content in English...' : 'Escribe contenido en Español...'}
        />
      </div>
    </Card>
  );
}

export default BilingualEditor;
