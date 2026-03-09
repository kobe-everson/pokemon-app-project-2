import { Link } from "react-router-dom";
import { useContext } from "react";
import { TeamContext } from "../context/TeamContext";
import Team from "../pages/Team";

export default function PokemonCard({ id, name, image }) {
  const { addToTeam, removeFromTeam, isOnTeam, teamFull } =
    useContext(TeamContext);

  return (
    <div className="relative">
      <button
        onClick={() => {
          if (isOnTeam(id)) {
            removeFromTeam(id);
          } else {
            const result = addToTeam(id);
            if (!result.success) alert(result.message);
          }
        }}
        className={`absolute top-2 right-2 px-2 py-1 text-xs rounded shadow cursor-pointer
          ${isOnTeam(id) ? "bg-red-500 text-white" : "bg-green-600 text-white"}
        `}
        disabled={!isOnTeam(id) && teamFull}
      >
        {isOnTeam(id) ? "-" : "+"}
      </button>
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
