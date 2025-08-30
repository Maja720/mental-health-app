import FAQItem from './FAQItem';

const items = [
  {
    q: 'Kako mogu da zakažem razgovor sa savetnikom?',
    a: 'Idite na ekran „Savetnici”, pronađite savetnika i kliknite na dugme „Zakaži”. Zatim odaberite slobodan termin.',
  },
  {
    q: 'Da li su moji podaci sigurni?',
    a: 'Da. Podaci su šifrovani i čuvaju se u skladu sa standardima zaštite privatnosti.',
  },
  {
    q: 'Mogu li da promenim ili otkažem termin?',
    a: 'Da. U odeljku „Moji sastanci” možete menjati ili otkazati termin do 24h pre početka.',
  },
  {
    q: 'Kako funkcioniše praćenje raspoloženja?',
    a: 'Svakog dana možete uneti ocenu raspoloženja i belešku; rezultati se prikazuju na grafikonu kroz vreme.',
  },
  {
    q: 'Da li mogu koristiti aplikaciju bez registracije?',
    a: 'Javne resurse možete pregledati, ali za zakazivanje i čuvanje napretka potreban je nalog.',
  },
];

export default function FAQList() {
  return (
    <div className="rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-black/5">
      <h2 className="mb-5 text-xl font-semibold text-gray-900">
        Često postavljena pitanja (FAQ)
      </h2>
      <div className="space-y-4">
        {items.map((it, i) => (
          <FAQItem key={i} q={it.q} a={it.a} />
        ))}
      </div>
    </div>
  );
}
