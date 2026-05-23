import { useState } from 'react';
import { PageHeader } from '@/components/ui/Card';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { IconSearch, IconPlus } from '@/components/ui/icons';

// Fixed by Chandu - Created bilingual content editor feature
type Language = 'en' | 'te';

interface EditorContent {
  en: string;
  te: string;
}

export function EditorPage() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [content, setContent] = useState<EditorContent>({
    en: '',
    te: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Saved content:', content);
    setIsSaving(false);
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };

  return (
    <div className="space-y-8 p-4 pb-8 lg:p-8">
      <PageHeader
        title="Bilingual Content Editor"
        description="Create and manage content in multiple languages"
      />

      <Card padding="lg">
        <div className="space-y-6">
          {/* Language Toggle */}
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <IconSearch size={20} className="text-brand-600 dark:text-brand-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Language
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={currentLang === 'en' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => handleLanguageChange('en')}
              >
                English
              </Button>
              <Button
                variant={currentLang === 'te' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => handleLanguageChange('te')}
              >
                Telugu
              </Button>
            </div>
          </div>

          {/* Editor */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="editor-content"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {currentLang === 'en' ? 'English Content' : 'తెలుగు కంటెంట్'}
              </label>
              <textarea
                id="editor-content"
                value={content[currentLang]}
                onChange={(e) =>
                  setContent((prev) => ({ ...prev, [currentLang]: e.target.value }))
                }
                placeholder={
                  currentLang === 'en'
                    ? 'Enter your content in English...'
                    : 'మీ కంటెంట్‌ను తెలుగులో నమోదు చేయండి...'
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 min-h-[300px]"
              />
            </div>

            {/* Preview */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Preview
              </label>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800/80 dark:bg-slate-900/50">
                <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                  {content[currentLang] || (
                    <span className="italic text-slate-400">
                      {currentLang === 'en'
                        ? 'No content yet...'
                        : 'ఇంకా కంటెంట్ లేదు...'}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            <Button
              variant="secondary"
              onClick={() => setContent({ en: '', te: '' })}
            >
              Clear
            </Button>
            <Button onClick={handleSave} loading={isSaving}>
              <IconPlus size={16} />
              Save Content
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
