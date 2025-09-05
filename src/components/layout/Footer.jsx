export default function Footer() {
  return (
    <footer className="mt-auto border-t border-blue-100 bg-white/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-gray-500 md:flex-row">
        <p>
          © {new Date().getFullYear()} Mental Health App. Sva prava zadržana.
        </p>
        <div className="flex items-center gap-4">
          <a href="#privacy" className="hover:text-gray-700">
            Privatnost
          </a>
          <a href="#terms" className="hover:text-gray-700">
            Uslovi korišćenja
          </a>
          <a href="#contact" className="hover:text-gray-700">
            Kontakt
          </a>
        </div>
      </div>
    </footer>
  );
}
