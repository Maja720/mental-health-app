import { useState } from 'react';
import ProfileField from './ProfileField';

export default function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phys, setPhys] = useState(''); // fizički simptomi
  const [psych, setPsych] = useState(''); // psihički simptomi
  const [diag, setDiag] = useState(''); // dijagnoza
  const [notify, setNotify] = useState(true);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      // TODO: ovde ubaci Firestore upis (npr. setDoc(doc(db,'profiles', userId), {...}))
      await new Promise((r) => setTimeout(r, 600)); // demo delay
      setSaved(true);
    } finally {
      setSaving(false);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <main className="min-h-[calc(100vh-120px)] bg-blue-50/50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* velika kartica */}
        <div className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-black/5">
          {/* zaglavlje sa ikonom i naslovom */}
          <div className="mb-8 flex items-center gap-3">
            {/* korisnik ikonica */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9 text-gray-700"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
            </svg>
            <h1 className="text-2xl font-semibold text-gray-900">Moj profil</h1>
          </div>

          {/* forma: 2 kolone na md+ */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ProfileField
              label="Ime:"
              placeholder="Unesite Vaše ime..."
              value={firstName}
              onChange={setFirstName}
            />
            <ProfileField
              label="Prezime:"
              placeholder="Unesite Vaše prezime..."
              value={lastName}
              onChange={setLastName}
            />
            <ProfileField
              label="Email:"
              placeholder="Unesite Vaš email..."
              value={email}
              onChange={setEmail}
              type="email"
            />
            <ProfileField
              label="Psihički simptomi:"
              placeholder="Unesite Vaše psihičke simptome..."
              value={psych}
              onChange={setPsych}
            />
            <ProfileField
              label="Fizički simptomi:"
              placeholder="Unesite Vaše fizičke simptome..."
              value={phys}
              onChange={setPhys}
            />
            <ProfileField
              label="Dijagnoza:"
              placeholder="Unesite Vašu dijagnozu..."
              value={diag}
              onChange={setDiag}
            />
          </div>

          {/* Save dugme */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-green-600 px-6 py-2 text-white shadow-md hover:bg-green-700 disabled:opacity-70"
            >
              {saving ? 'Čuvam…' : 'Sačuvaj izmene'}
            </button>
          </div>

          {/* donji red: podešavanja i checkbox */}
          <div className="mt-8 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-rose-200/80 px-4 py-2 text-sm font-medium text-gray-800 shadow ring-1 ring-black/5 hover:bg-rose-200"
            >
              {/* zupčanik */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.14 12.94a7.5 7.5 0 0 0 0-1.88l1.7-1.32a.5.5 0 0 0 .12-.66l-1.6-2.77a.5.5 0 0 0-.62-.22l-2 .8a7.45 7.45 0 0 0-1.62-.94l-.3-2.1a.5.5 0 0 0-.5-.43h-3.2a.5.5 0 0 0-.5.43l-.3 2.1c-.57.22-1.11.52-1.62.94l-2-.8a.5.5 0 0 0-.62.22L3.03 9.08a.5.5 0 0 0 .12.66l1.7 1.32a7.5 7.5 0 0 0 0 1.88l-1.7 1.32a.5.5 0 0 0-.12.66l1.6 2.77c.14.24.43.34.68.24l2-.8c.5.41 1.05.74 1.62.94l.3 2.1c.05.25.26.43.5.43h3.2c.24 0 .45-.18.5-.43l.3-2.1c.57-.2 1.12-.53 1.62-.94l2 .8c.25.1.54 0 .68-.24l1.6-2.77a.5.5 0 0 0-.12-.66l-1.7-1.32ZM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
              </svg>
              Podešavanja
            </button>

            <label className="flex items-center gap-2 rounded-xl bg-sky-200/70 px-4 py-2 text-sm font-medium text-gray-800 shadow ring-1 ring-black/5">
              <input
                type="checkbox"
                checked={notify}
                onChange={(e) => setNotify(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Želim da primam obaveštenja iz aplikacije
            </label>
          </div>

          {/* success poruka */}
          {saved && (
            <p className="mt-4 text-center text-sm font-medium text-green-700">
              Izmene su sačuvane.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
