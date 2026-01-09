import AuthLayout from "../AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-center mb-6 text-orange-600">
        Нэвтрэх
      </h1>

      <input
        className="border w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="Email"
      />

      <input
        type="password"
        className="border w-full p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="Нууц үг"
      />

      <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
        Нэвтрэх
      </button>
    </AuthLayout>
  );
}
