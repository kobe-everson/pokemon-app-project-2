export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by name or ID..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-lg mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
    />
  );
}
