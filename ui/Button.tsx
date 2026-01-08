export default function Button({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600">
      {children}
    </button>
  );
}
