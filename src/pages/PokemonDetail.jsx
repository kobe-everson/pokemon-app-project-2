import { useEffect, useState, useContext } from "react";
import { TeamContext } from "../context/TeamContext";
import { useParams } from "react-router-dom";
import { getPokemonById } from "../api/pokeapi";

export default function PokemonDetail() {
  const { id } = useParams();
  const { addToTeam, removeFromTeam, isOnTeam, teamFull } =
    useContext(TeamContext);
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPokemonById(id);
        setPokemon(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-gray-600 text-2xl">
        Loading Pokémon...
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="text-center text-red-600 text-2xl">
        Pokémon not found.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto border bg-base-200 rounded-lg shadow-2xl py-4">
      <div className="flex flex-col items-center">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-70 h-70 mb-4"
        />

        <h2 className="text-3xl font-bold capitalize mb-2">{pokemon.name}</h2>

        <p className="mb-4">ID: {pokemon.id}</p>

        <div className="flex gap-2 mb-6">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="px-3 py-1 bg-base-300 rounded-full text-sm capitalize"
            >
              {t.type.name}
            </span>
          ))}
        </div>

        <div className="w-full">
          <h3 className="text-xl font-semibold mb-2 text-center">Stats</h3>
          <ul className="space-y-1">
            {pokemon.stats.map((s) => (
              <li key={s.stat.name} className="flex justify-between px-[30%]">
                <span className="capitalize">{s.stat.name}: </span>
                <span className="font-medium">{s.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Add/remove */}
        <div>
          {isOnTeam(pokemon.id) ? (
            <button
              onClick={() => removeFromTeam(pokemon.id)}
              className="bg-red-400 hover:bg-red-600 hover:shadow-2xl text-white px-4 py2 rounded mt-4 cursor-pointer"
            >
              Remove from Team
            </button>
          ) : (
            <button
              onClick={() => {
                const result = addToTeam(pokemon.id);
                if (!result.success) alert(result.message);
              }}
              className="bg-green-400 hover:bg-green-600 hover:shadow-2xl text-white font-bold px-4 py2 rounded mt-4 cursor-pointer"
              disabled={teamFull}
            >
              {teamFull ? "Team Full" : "Add to Team"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
