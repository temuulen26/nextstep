export default function CalculatorPage() {
  return (
    <section className="section container max-w-lg">
      <h1 className="text-2xl font-bold mb-6">
        Голч дүн тооцоологч
      </h1>
      <input className="border w-full p-3 rounded mb-4" placeholder="Голч дүн" />
      <button className="bg-orange-500 text-white px-6 py-3 rounded">
        Тооцоолох
      </button>
    </section>
  );
}
