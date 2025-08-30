// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { loginUser } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      // loginUser bi trebalo da vrati userCredential iz Firebase-a
      await loginUser(email, password);
      setSuccess('Uspešno ste se prijavili!');
      // Ako ti je Dashboard na root ruti:
      navigate('/', { replace: true });
    } catch (err) {
      setError(mapFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const mapFirebaseError = (err) => {
    const code = err?.code || '';
    switch (code) {
      case 'auth/user-not-found':
        return 'Nije pronađen korisnik sa ovom email adresom.';
      case 'auth/wrong-password':
        return 'Pogrešna lozinka. Pokušajte ponovo.';
      case 'auth/invalid-email':
        return 'Neispravan format email adrese.';
      case 'auth/too-many-requests':
        return 'Previše pokušaja. Pokušajte kasnije.';
      default:
        return 'Došlo je do greške. Pokušajte ponovo.';
    }
  };

  return (
    <div className="min-h-screen bg-blue-50/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-black/5">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Prijava
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Lozinka
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Prijavljivanje…' : 'Prijavi se'}
          </button>
        </form>
      </div>
    </div>
  );
}
