export default function Footer() {
  return (
    <footer className="mt-auto border-t border-blue-300 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 shadow-inner">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-blue-50 md:flex-row">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Mental Health App. Sva prava zadržana.
        </p>
      </div>
    </footer>
  );
}
