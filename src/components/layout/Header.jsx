import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const LINKS = [
  ['Početna', '/dashboard'],
  ['Dnevnik', '/journal'],
  ['Praćenje raspoloženja', '/mood'],
  ['Savetnici', '/counselors'],
  ['Grupe podrške', '/groups'],
  ['Profil', '/profile'],
  ['Podrška', '/support'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-300 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="text-lg font-semibold text-white">
          Mental Health App
        </div>

        <nav className="hidden gap-6 md:flex">
          {LINKS.map(([label, to]) => (
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

        <div className="hidden md:flex">
          <NavLink
            to="/logout"
            className="rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/30"
          >
            Odjavi se
          </NavLink>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/20"
          aria-controls="mobile-menu"
          aria-expanded={open ? 'true' : 'false'}
          onClick={() => setOpen((v) => !v)}
        >
          {!open ? (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          ) : (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M6 6l12 12M18 6l-12 12"
              />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-blue-500/95 backdrop-blur shadow-lg">
          <nav className="flex flex-col gap-1 p-4">
            {LINKS.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    'block rounded-lg px-3 py-2 text-sm font-medium transition',
                    isActive
                      ? 'bg-white/25 text-white'
                      : 'text-blue-50 hover:bg-white/20 hover:text-white',
                  ].join(' ')
                }
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/logout"
              className="mt-2 block rounded-lg bg-white/20 px-3 py-2 text-center text-sm font-medium text-white hover:bg-white/30"
            >
              Odjavi se
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
