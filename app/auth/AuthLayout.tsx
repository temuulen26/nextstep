export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
<div className="min-h-screen flex items-center justify-center relative overflow-hidden
  bg-gradient-to-br from-[#ff673d] via-[#fffff] to-[#ff673d]">

      
      {/* Animated circles */}
      <div className="absolute w-96 h-96 bg-white/10 rounded-full top-[-100px] left-[-100px] animate-pulse" />
      <div className="absolute w-72 h-72 bg-white/10 rounded-full bottom-[-80px] right-[-80px] animate-bounce" />

      {/* Card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
