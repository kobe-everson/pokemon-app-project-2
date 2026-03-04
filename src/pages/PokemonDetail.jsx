import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonById } from "../api/pokeapi";

export default function PokemonDetail() {
  const { id } = useParams();
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
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex flex-col items-center">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-70 h-70 mb-4"
        />

        <h2 className="text-3xl font-bold capitalize mb-2">{pokemon.name}</h2>

        <p className="text-gray-600 mb-4">ID: {pokemon.id}</p>

        <div className="flex gap-2 mb-6">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm capitalize"
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
      </div>
    </div>
  );
}
