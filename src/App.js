import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import Journal from './components/journal/Journal';
import Mood from './components/mood/Mood';
import Counselors from './components/counselors/Counselors';
import Groups from './components/groups/Groups';

function Placeholder({ title }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      <p className="mt-2 text-gray-600">
        Stranica je u izradi. Vraćanje na{' '}
        <a href="/" className="text-blue-600 underline">
          Dashboard
        </a>
        .
      </p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/counselors" element={<Counselors />} />
        <Route path="/groups" element={<Groups />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
