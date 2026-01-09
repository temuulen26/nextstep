import AuthLayout from "../AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-center mb-6 text-orange-600">
        Бүртгүүлэх
      </h1>

      {/* Role selection */}
      <div className="flex gap-4 mb-6">
        <label className="flex-1 border rounded-lg p-3 text-center cursor-pointer hover:border-orange-400">
          <input type="radio" name="role" className="hidden" />
          👨‍🏫 Ментор
        </label>

        <label className="flex-1 border rounded-lg p-3 text-center cursor-pointer hover:border-orange-400">
          <input type="radio" name="role" className="hidden" />
          👤 Хэрэглэгч
        </label>
      </div>

      <input
        className="border w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="Нэр"
      />

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
        Бүртгүүлэх
      </button>
    </AuthLayout>
  );
}
