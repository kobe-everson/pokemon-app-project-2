import { useState, useEffect } from "react";
import PokemonGrid from "../components/PokemonGrid";
import { getPokemonList } from "../api/pokeapi";

const generations = {
  1: { limit: 151, offset: 0 },
  2: { limit: 100, offset: 151 },
  3: { limit: 135, offset: 251 },
  4: { limit: 107, offset: 386 },
  5: { limit: 156, offset: 493 },
  6: { limit: 72, offset: 649 },
  7: { limit: 88, offset: 721 },
  8: { limit: 96, offset: 809 },
  9: { limit: 120, offset: 905 },
};

export default function Browse() {
  const [generation, setGeneration] = useState(1);
  const [type, setType] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { limit, offset } = generations[generation];
      const list = await getPokemonList(limit, offset);
      setPokemon(list);
      setFiltered(list);
      setType("");
      setLoading(false);
    }
    load();
  }, [generation]);

  useEffect(() => {
    if (!type) {
      setFiltered(pokemon);
      return;
    }

    const filteredList = pokemon.filter((p) => p.types.includes(type));
    setFiltered(filteredList);
  }, [type, pokemon]);

  if (loading) {
    return (
      <div className="text-center text-gray-600 text-2xl">
        Loading Pokémon...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Browse Pokémon</h2>

      {/* Generation filter */}
      <div className="flex justify-center">
        <select
          value={generation}
          onChange={(e) => setGeneration(Number(e.target.value))}
          className="mb-4 p-2 border rounded"
        >
          {Object.keys(generations).map((gen) => (
            <option key={gen} value={gen}>
              Generation {gen}
            </option>
          ))}
        </select>

        {/* Type filter */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mb-4 ml-4 p-2 border rounded"
        >
          <option value="">All Types</option>
          <option value="normal">Normal</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="ice">Ice</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="steel">Steel</option>
          <option value="fairy">Fairy</option>
        </select>
      </div>

      <PokemonGrid pokemon={filtered} />
    </div>
  );
}
