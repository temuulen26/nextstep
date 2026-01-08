export default function MentorsPage() {
  return (
    <section className="section container">
      <h1 className="text-3xl font-bold mb-6">
        Менторууд
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {[1,2,3].map(i => (
          <div key={i} className="border p-5 rounded-xl">
            Ментор {i}
          </div>
        ))}
      </div>
    </section>
  );
}
