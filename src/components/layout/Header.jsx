import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-300 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 backdrop-blur supports-[backdrop-filter]:bg-blue-500/80 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="text-lg font-semibold text-white drop-shadow">
          Mental Health App
        </div>

        <nav className="hidden gap-6 md:flex">
          {[
            ['Početna', '/dashboard'],
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
                    ? 'text-white underline underline-offset-4'
                    : 'text-blue-100 hover:text-white',
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
            className="rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-white/30"
          >
            Odjavi se
          </NavLink>
        </div>
      </div>
    </header>
  );
}
