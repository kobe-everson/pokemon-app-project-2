import { useContext, useState, useEffect } from "react";
import { TeamContext } from "../context/TeamContext";
import { getPokemonById } from "../api/pokeapi";

export default function Team() {
  const { team, removeFromTeam } = useContext(TeamContext);
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeam() {
      setLoading(true);

      const promises = team.map((id) => getPokemonById(id));
      const results = await Promise.all(promises);

      setPokemonData(results);
      setLoading(false);
    }

    if (team.length > 0) {
      loadTeam();
    } else {
      setPokemonData([]);
      setLoading(false);
    }
  }, [team]);

  if (loading) {
    return (
      <div className="text-center text-gray-600 text-2xl">Loading team...</div>
    );
  }

  if (team.length === 0) {
    return (
      <div className="text-center text-3xl font-bold mt-[15%]">
        Your team is empty! Browse Pokémon to add them to your team.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center text-3xl font-bold pb-4">Your Pokémon Team</h2>
      <div className="grid grid-cols-3 gap-6 px-[15%]">
        {pokemonData.map((p) => (
          <div
            key={p.id}
            className="bg-base-200 rounded-lg border-2 p-4 flex flex-col items-center"
          >
            <img
              src={p.sprites.other["official-artwork"].front_default}
              alt={p.name}
              className="w-50 h-50 mb-4"
            />
            <p className="text-xl font-semibold capitalize">
              #{p.id}: {p.name}
            </p>
            <div className="flex gap-2 mb-6">
              {p.types.map((t) => (
                <span
                  key={t.type.name}
                  className="px-3 py-1 bg-base-300 rounded-full text-sm capitalize"
                >
                  {t.type.name}
                </span>
              ))}
            </div>
            <button
              onClick={() => removeFromTeam(p.id)}
              className="bg-red-400 hover:bg-red-600 text-white px-4 py-1 rounded cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
