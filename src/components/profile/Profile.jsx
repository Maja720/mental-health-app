import { useEffect, useMemo, useRef, useState } from 'react';
import ProfileField from './ProfileField';
import { db } from '../../firebase/firebaseConfig';
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { useQueryRT } from '../../hooks/useQuery';

export default function Profile() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phys, setPhys] = useState('');
  const [psych, setPsych] = useState('');
  const [diag, setDiag] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const nowRef = useRef(new Date());

  const groupsQ = useMemo(() => {
    if (!uid) return null;
    return query(
      collection(db, 'supportGroups'),
      where('members', 'array-contains', uid)
    );
  }, [uid]);
  const { docs: userGroups = [], loading: groupsLoading } = useQueryRT(groupsQ);

  const apptQ = useMemo(() => {
    if (!uid) return null;
    return query(
      collection(db, 'users', uid, 'appointments'),
      where('date', '>=', nowRef.current),
      orderBy('date', 'asc')
    );
  }, [uid]);
  const { docs: apptDocs = [], loading: apptLoading } = useQueryRT(apptQ);

  const upcoming = useMemo(() => {
    return apptDocs.map((a) => {
      const date = a.date?.toDate ? a.date.toDate() : new Date(a.date);
      const counselorName =
        a.firstName && a.lastName
          ? `${a.firstName} ${a.lastName}`
          : a.firstName || a.lastName || 'Savetnik';
      return { id: a.id, date, counselorName };
    });
  }, [apptDocs]);

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        if (!uid) return;
        setLoading(true);
        const snap = await getDoc(doc(db, 'users', uid));
        if (snap.exists() && ok) {
          const d = snap.data();
          setFirstName(d.firstName ?? '');
          setLastName(d.lastName ?? '');
          setEmail(d.email ?? user?.email ?? '');
          setPsych(
            Array.isArray(d.psychSymptoms)
              ? d.psychSymptoms.join(', ')
              : (d.psychSymptoms ?? '')
          );
          setPhys(
            Array.isArray(d.physSymptoms)
              ? d.physSymptoms.join(', ')
              : (d.physSymptoms ?? '')
          );
          setDiag(d.diagnosis ?? '');
        }
        setError('');
      } catch (e) {
        console.error(e);
        if (ok) setError('Ne mogu da učitam profil.');
      } finally {
        if (ok) setLoading(false);
      }
    })();
    return () => {
      ok = false;
    };
  }, [uid, user]);

  const handleSave = async () => {
    if (!uid) return;
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const psychArr = psych
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const physArr = phys
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const { setDoc, doc: docRef } = await import('firebase/firestore');
      await setDoc(
        docRef(db, 'users', uid),
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          psychSymptoms: psychArr,
          physSymptoms: physArr,
          diagnosis: diag.trim(),
          updatedAt: new Date(),
        },
        { merge: true }
      );
      setSaved(true);
    } catch (e) {
      console.error(e);
      setError('Greška pri čuvanju.');
    } finally {
      setSaving(false);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <main className=" bg-blue-50/50">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-black/5">
          <div className="mb-8 flex items-center gap-3">
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

          {loading ? (
            <p className="text-gray-600">Učitavanje...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ProfileField
                  label="Ime:"
                  value={firstName}
                  onChange={setFirstName}
                />
                <ProfileField
                  label="Prezime:"
                  value={lastName}
                  onChange={setLastName}
                />
                <ProfileField
                  label="Email:"
                  type="email"
                  value={email}
                  onChange={setEmail}
                />
                <ProfileField
                  label="Psihički simptomi:"
                  value={psych}
                  onChange={setPsych}
                />
                <ProfileField
                  label="Fizički simptomi:"
                  value={phys}
                  onChange={setPhys}
                />
                <ProfileField
                  label="Dijagnoza:"
                  value={diag}
                  onChange={setDiag}
                />
              </div>

              <div className="mt-10 flex justify-center">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-xl bg-green-600 px-6 py-2 text-white shadow-md hover:bg-green-700 disabled:opacity-70"
                >
                  {saving ? 'Čuvam…' : 'Sačuvaj izmene'}
                </button>
              </div>

              {error && (
                <p className="mt-4 text-center text-sm font-medium text-red-600">
                  {error}
                </p>
              )}
              {saved && (
                <p className="mt-4 text-center text-sm font-medium text-green-700">
                  Izmene su sačuvane.
                </p>
              )}
            </>
          )}
        </div>

        <div className="mt-6 rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-black/5">
          <h2 className="text-xl font-semibold text-gray-900">
            Predstojeći termini
          </h2>

          {apptLoading ? (
            <p className="mt-2 text-sm text-gray-500">
              Učitavam zakazane termine…
            </p>
          ) : upcoming.length ? (
            <ul className="mt-3 space-y-2">
              {upcoming.map((a) => (
                <li key={a.id} className="text-sm text-gray-700">
                  Kod <span className="font-medium">{a.counselorName}</span>{' '}
                  <span className="font-medium">
                    {a.date.toLocaleDateString('sr-RS', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}{' '}
                    u{' '}
                    {a.date.toLocaleTimeString('sr-RS', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              Trenutno nemate predstojećih termina.
            </p>
          )}
        </div>

        <div className="mt-6 rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-black/5">
          <h2 className="text-xl font-semibold text-gray-900">
            Grupe podrške kojima pripadate
          </h2>

          {groupsLoading ? (
            <p className="mt-2 text-sm text-gray-500">Učitavam grupe…</p>
          ) : userGroups.length ? (
            <ul className="mt-3 space-y-2">
              {userGroups.map((g) => {
                const name = g.name || 'Bez naziva';
                const membersCount = Array.isArray(g.members)
                  ? g.members.length
                  : 0;
                return (
                  <li key={g.id} className="text-sm text-gray-700">
                    <span className="font-medium">{name}</span>{' '}
                    <span className="text-gray-500">
                      — {membersCount.toLocaleString('sr-RS')}{' '}
                      {membersCount === 1 ? 'član' : 'članova'}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              Niste član nijedne grupe.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
