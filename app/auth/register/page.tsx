export default function RegisterPage() {
  return (
    <section className="section container max-w-md">
      <h1 className="text-2xl font-bold mb-6">Бүртгүүлэх</h1>
      <input className="border w-full p-3 rounded mb-4" placeholder="Нэр" />
      <input className="border w-full p-3 rounded mb-4" placeholder="Email" />
      <input className="border w-full p-3 rounded mb-4" placeholder="Нууц үг" />
      <button className="w-full bg-orange-500 text-white py-3 rounded">
        Бүртгүүлэх
      </button>
    </section>
  );
}
