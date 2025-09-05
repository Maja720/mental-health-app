export default function GroupCard({ item, onJoin, onOpen }) {
  const { name, desc, membersCount = 0, joined } = item || {};

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 transition hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {membersCount.toLocaleString('sr-RS')}{' '}
        {membersCount === 1 ? 'član' : 'članova'}
      </p>
      <p className="mt-4 text-sm leading-6 text-gray-600">{desc}</p>

      <div className="mt-6 flex justify-end">
        {joined ? (
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow ring-1 ring-blue-300 hover:bg-blue-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 4h16v10H5.17L4 15.17V4zm0-2a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4z" />
            </svg>
            Otvori chat
          </button>
        ) : (
          <button
            onClick={onJoin}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
            </svg>
            Pridruži se
          </button>
        )}
      </div>
    </div>
  );
}
