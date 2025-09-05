import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../contexts/AuthContext';

export default function SupportForm() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const valid =
    name.trim() && /^\S+@\S+\.\S+$/.test(email) && msg.trim().length >= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid || saving) return;

    setSaving(true);
    setErr('');
    try {
      await addDoc(collection(db, 'supportTickets'), {
        userId: uid || null,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: msg.trim(),
        status: 'open',
        createdAt: serverTimestamp(),
      });

      setSent(true);
      setName('');
      setEmail('');
      setMsg('');
      setTimeout(() => setSent(false), 2500);
    } catch (e) {
      console.error(e);
      setErr('Greška pri slanju poruke.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-black/5">
      <h2 className="mb-5 text-xl font-semibold text-gray-900">
        Kontaktiraj podršku
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Ime:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Upišite Vaše ime i prezime"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Upišite Vašu email adresu"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Pitanje / Opis problema:
          </label>
          <textarea
            rows={5}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Opišite svoj problem ili pitanje..."
            className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {err && (
          <p className="text-center text-sm font-medium text-red-600">{err}</p>
        )}

        <button
          type="submit"
          disabled={!valid || saving}
          className="w-full rounded-xl bg-blue-600 px-4 py-2 font-medium text-white shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Šaljem…' : 'Pošalji'}
        </button>

        {sent && (
          <p className="text-center text-sm font-medium text-green-700">
            Poruka je poslata. Javićemo se uskoro.
          </p>
        )}
      </form>
    </div>
  );
}
