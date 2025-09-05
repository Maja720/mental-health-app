import FAQList from './FAQList';
import SupportForm from './SupportForm';

export default function Support() {
  return (
    <main className="min-h-[calc(100vh-120px)] bg-blue-50/50">
      <div className="mx-auto max-w-6xl gap-8 px-4 py-8 lg:flex">
        <div className="flex-1">
          <FAQList />
        </div>

        <div className="mt-8 w-full max-w-xl lg:mt-0">
          <SupportForm />
        </div>
      </div>
    </main>
  );
}
