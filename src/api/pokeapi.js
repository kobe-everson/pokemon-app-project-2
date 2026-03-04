const baseUrl = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit = 151, offset = 0) {
  const res = await fetch(`${baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
  const data = await res.json();

  const detailPromises = data.results.map(async (p) => {
    const detailRes = await fetch(p.url);
    const detail = await detailRes.json();

    return {
      id: detail.id,
      name: detail.name,
      image: detail.sprites.other["official-artwork"].front_default,
      types: detail.types.map((t) => t.type.name),
    };
  });

  return Promise.all(detailPromises);
}

export async function getPokemonById(id) {
  const res = await fetch(`${baseUrl}/pokemon/${id}`);
  return res.json();
}
