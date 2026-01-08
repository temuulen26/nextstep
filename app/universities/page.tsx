export default function UniversitiesPage() {
  return (
    <section className="section container">
      <h1 className="text-3xl font-bold mb-6">
        Их сургуулиуд
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {[1,2,3].map(i => (
          <div key={i} className="border p-5 rounded-xl">
            Их сургууль {i}
          </div>
        ))}
      </div>
    </section>
  );
}
