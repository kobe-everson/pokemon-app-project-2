import { Link } from "react-router-dom";

export default function PokemonCard({ id, name, image }) {
  return (
    <Link
      to={`/pokemon/${id}`}
      className="bg-taupe-200 rounded-lg border-2 hover:shadow:md transition p-4 flex flex-col items-center"
    >
      <img src={image} alt={name} className="w-50 h-50 object-contain mb-2" />
      <p className="capitalize">
        #{id}: {name}
      </p>
    </Link>
  );
}
