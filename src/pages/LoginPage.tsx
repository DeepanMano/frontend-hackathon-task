import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { isLoginFormValid } from '@/utils/validation';
import { DEMO_CREDENTIALS } from '@/mocks/users';

export function LoginPage() {
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isLoginFormValid(email, password)) {
      setError('Please enter a valid email and password (min 6 characters).');
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password.trim());
      navigate(from, { replace: true });
    } catch {
      setError('Invalid credentials. Try alex@taskflow.io / demo1234');
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = isLoginFormValid(email, password);

  return (
    <div className="relative flex min-h-full items-center justify-center overflow-hidden bg-slate-950 p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-600/20 via-slate-950 to-slate-950" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand-500 to-brand-700 text-xl font-bold text-white shadow-lg shadow-brand-600/30">
            TF
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">Sign in to your TaskFlow workspace</p>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Work email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="dark:border-slate-700"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="dark:border-slate-700"
            />
            {error ? (
              <p className="rounded-lg bg-red-950/50 px-3 py-2 text-sm text-red-400 ring-1 ring-red-900/50">
                {error}
              </p>
            ) : null}
            <Button type="submit" className="w-full" loading={loading} disabled={!canSubmit}>
              Sign in
            </Button>
          </form>

          <p className="mt-6 rounded-lg bg-slate-800/50 px-3 py-2 text-center text-xs text-slate-500">
            Demo · {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
          </p>
        </div>
      </div>
    </div>
  );
}
