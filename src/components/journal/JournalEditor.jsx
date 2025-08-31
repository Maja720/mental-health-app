import { useState } from 'react';

export default function JournalEditor({ onSave, saving: savingProp }) {
  const [text, setText] = useState('');
  const [savingLocal, setSavingLocal] = useState(false);
  const saving = savingProp ?? savingLocal;

  const handleSave = async () => {
    if (!text.trim()) return;
    setSavingLocal(true);
    try {
      await onSave?.(text.trim());
      setText('');
    } finally {
      setSavingLocal(false);
    }
  };

  return (
    <div className="rounded-2xl bg-blue-100 p-6 shadow-lg ring-1 ring-black/5">
      <h2 className="mb-4 text-center text-xl font-semibold text-blue-900">
        Vođenje dnevnika
      </h2>

      <div className="rounded-2xl bg-white p-4 shadow-md ring-1 ring-black/5">
        <div className="mb-2 flex items-center gap-2 text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.33-.17-.17h-.01V19.5H5v-.74l9.06-9.06.91.91L5.92 19.58zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
          <span className="text-sm font-medium">Novi unos</span>
        </div>

        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Kako se danas zaista osećaš? Šta ti je prijalo, a šta ne?"
          className="mt-1 w-full resize-none rounded-xl border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving || !text.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-medium text-gray-800 shadow-md ring-1 ring-black/10 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
          </svg>
          Sačuvaj unos
        </button>
      </div>
    </div>
  );
}
