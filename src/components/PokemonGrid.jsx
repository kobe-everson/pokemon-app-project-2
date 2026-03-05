import PokemonCard from "./PokemonCard";

export default function PokemonGrid({ pokemon }) {
  return (
    <div className="grid grid-cols-5 gap-3 pt-3 px-[5%]">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} id={p.id} name={p.name} image={p.image} />
      ))}
    </div>
  );
}
