export default function TestTailwind() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Tailwind Test</h1>
      <div className="bg-red-500 text-white p-4 rounded-lg">
        If this box is red with white text, Tailwind is working!
      </div>
      <div className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg">
        Gradient test
      </div>
    </div>
  );
} 