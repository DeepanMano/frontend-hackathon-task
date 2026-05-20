import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function RegisterPage() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-bold text-slate-300">Register</h1>
      <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Coming soon</p>
      <Link to="/dashboard" className="mt-6">
        <Button>Go to dashboard</Button>
      </Link>
    </div>
  );
}
