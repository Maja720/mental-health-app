import FAQList from './FAQList';
import SupportForm from './SupportForm';

export default function Support() {
  return (
    <main className=" bg-blue-50/50 mt-10">
      <div className="mx-auto max-w-6xl gap-8 px-4 py-6 lg:flex">
        <div className="flex-1">
          <FAQList />
        </div>
        <div className="mt-6 w-full max-w-xl lg:mt-0">
          <SupportForm />
        </div>
      </div>
    </main>
  );
}
