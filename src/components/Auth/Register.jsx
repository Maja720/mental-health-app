import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../firebase/auth';
import { auth, db } from '../../firebase/firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [psych, setPsych] = useState(''); // psihički simptomi
  const [phys, setPhys] = useState(''); // fizički simptomi
  const [diag, setDiag] = useState('');

  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [agree, setAgree] = useState(true);

  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setErr('Molimo unesite ime i prezime.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErr('Unesite važeću email adresu.');
      return false;
    }

    const strong = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!strong.test(password)) {
      setErr('Lozinka mora imati bar 6 karaktera i bar 1 slovo i 1 broj.');
      return false;
    }
    if (password !== confirm) {
      setErr('Lozinke se ne poklapaju.');
      return false;
    }
    if (!agree) {
      setErr('Morate prihvatiti uslove korišćenja.');
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setOk('');
    if (!validate()) return;

    setLoading(true);
    try {
      const cred = await registerUser(email, password);

      const uid = cred.user.uid;

      const toArray = (s) =>
        s
          .split(',')
          .map((x) => x.trim())
          .filter(Boolean);

      await setDoc(
        doc(db, 'users', uid),
        {
          uid,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          psychSymptoms: toArray(psych),
          physSymptoms: toArray(phys),
          diagnosis: diag.trim(),
          notify: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setOk('Uspešna registracija. Preusmeravam na prijavu…');
      setTimeout(() => navigate('/login', { replace: true }), 900);
    } catch (e) {
      const code = e?.code || '';
      if (code.includes('email-already-in-use'))
        setErr('Email je već registrovan.');
      else if (code.includes('invalid-email')) setErr('Neispravan email.');
      else setErr('Greška pri registraciji. Pokušajte ponovo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50/50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
        <h1 className="text-center text-2xl font-semibold text-gray-900">
          Registracija
        </h1>
        <p className="mt-1 text-center text-sm text-gray-600">
          Već imate nalog?{' '}
          <Link to="/login" className="text-blue-600 underline">
            Prijavite se
          </Link>
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Ime
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Unesite ime"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Prezime
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Unesite prezime"
                required
              />
            </div>
          </div>

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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="relative">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Lozinka
              </label>
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-[34px] text-sm text-gray-500"
              >
                {showPwd ? 'Sakrij' : 'Prikaži'}
              </button>
            </div>

            <div className="relative">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Potvrdi lozinku
              </label>
              <input
                type={showPwd2 ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPwd2((v) => !v)}
                className="absolute right-3 top-[34px] text-sm text-gray-500"
              >
                {showPwd2 ? 'Sakrij' : 'Prikaži'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Psihički simptomi (opciono)
              </label>
              <input
                type="text"
                value={psych}
                onChange={(e) => setPsych(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="npr. anksioznost, depresija…"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Fizički simptomi (opciono)
              </label>
              <input
                type="text"
                value={phys}
                onChange={(e) => setPhys(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="npr. nesanica, glavobolja…"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Dijagnoza (opciono)
            </label>
            <input
              type="text"
              value={diag}
              onChange={(e) => setDiag(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ako imate zvaničnu dijagnozu"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Prihvatam uslove korišćenja i politiku privatnosti.
          </label>

          {err && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
              {err}
            </p>
          )}
          {ok && (
            <p className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
              {ok}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Kreiram nalog…
              </span>
            ) : (
              'Registruj se'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
