import { useState } from 'react';
import { loginUser } from '../../firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const mapErr = (e) => {
    const code = e?.code || '';
    if (code.includes('user-not-found')) return 'Nalog ne postoji.';
    if (code.includes('wrong-password')) return 'Pogrešna lozinka.';
    if (code.includes('invalid-email')) return 'Neispravan email.';
    return 'Greška pri prijavi. Pokušajte ponovo.';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate('/dashboard', { replace: true }); // posle login-a vodi na Dashboard
    } catch (e) {
      setErr(mapErr(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-blue-50/50 flex items-center justify-center p-4">
      <div className="w-full mt-11 max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
        <h1 className="text-center text-2xl font-semibold text-gray-900">
          Prijava
        </h1>
        <p className="mt-1 text-center text-sm text-gray-600">
          Nemate nalog?{' '}
          <Link to="/register" className="text-blue-600 underline">
            Registrujte se
          </Link>
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Lozinka
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {err && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
              {err}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? 'Prijavljivanje…' : 'Prijavi se'}
          </button>
        </form>
      </div>
    </div>
  );
}
