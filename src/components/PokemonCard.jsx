import { Link } from "react-router-dom";

export default function PokemonCard({ id, name, image }) {
  return (
    <div>
      <Link
        to={`/pokemon/${id}`}
        className="bg-base-200 rounded-lg border-2 p-4 flex flex-col items-center shadow-sm hover:shadow-2xl"
      >
        <img src={image} alt={name} className="w-50 h-50 object-contain mb-2" />
        <p className="capitalize">
          #{id}: {name}
        </p>
      </Link>
    </div>
  );
}
