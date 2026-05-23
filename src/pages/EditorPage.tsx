import { PageHeader } from '@/components/ui/Card';
import BilingualEditor from '@/components/editor/BilingualEditor';

export default function EditorPage() {
  return (
    <div className="space-y-6 p-4 pb-8 lg:p-8">
      <PageHeader title="Editor" description="Bilingual content editor" />
      <BilingualEditor />
    </div>
  );
}
