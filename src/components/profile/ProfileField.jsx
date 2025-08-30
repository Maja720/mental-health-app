export default function ProfileField({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
}) {
  return (
    <div className="rounded-full bg-sky-200/70 px-5 py-3 shadow ring-1 ring-black/5">
      <label className="mr-2 text-sm font-semibold text-gray-800">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full bg-transparent text-gray-800 placeholder-gray-600 focus:outline-none"
      />
    </div>
  );
}
