export default function LoginPage() {
  return (
    <section className="section container max-w-md">
      <h1 className="text-2xl font-bold mb-6">Нэвтрэх</h1>
      <input className="border w-full p-3 rounded mb-4" placeholder="Email" />
      <input className="border w-full p-3 rounded mb-4" placeholder="Нууц үг" />
      <button className="w-full bg-orange-500 text-white py-3 rounded">
        Нэвтрэх
      </button>
    </section>
  );
}
