import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-blue-200/70 backdrop-blur supports-[backdrop-filter]:bg-blue-200/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="text-lg font-semibold text-white drop-shadow-sm">
          Aplikacija za podršku mentalnom zdravlju
        </div>

        <nav className="hidden gap-6 md:flex">
          {[
            ['Dnevnik', '/journal'],
            ['Praćenje raspoloženja', '/mood'],
            ['Savetnici', '/counselors'],
            ['Grupe podrške', '/groups'],
            ['Profil', '/profile'],
            ['Podrška', '/support'],
          ].map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  'text-sm font-medium transition',
                  isActive
                    ? 'text-blue-700'
                    : 'text-blue-800/80 hover:text-blue-900',
                ].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            to="/logout"
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-blue-700"
          >
            Odjavi se
          </NavLink>
        </div>
      </div>
    </header>
  );
}
