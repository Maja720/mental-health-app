export default function GroupCard({ item, onJoin }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 transition hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {item.members.toLocaleString('sr-RS')}{' '}
        {item.members === 1 ? 'član' : 'članova'}
      </p>
      <p className="mt-4 text-sm leading-6 text-gray-600">{item.desc}</p>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onJoin(item)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
        >
          {/* check icon */}
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
      </div>
    </div>
  );
}
