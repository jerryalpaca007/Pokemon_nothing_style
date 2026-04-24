async function fetchPokemon() {
  const input = document.getElementById("txtbox").value.toLowerCase();
  const img = document.getElementById("pokemonImage");

  const url = `https://pokeapi.co/api/v2/pokemon/${input}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Pokemon not found");
    }

    const data = await response.json();
    const imageUrl = data.sprites.other["official-artwork"].front_default;

    img.src = imageUrl;
    img.style.display = "block";
  } catch (error) {
    alert("Pokémon not found 😢");
    img.style.display = "none";
  }
}
document.getElementById("txtbox").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    fetchPokemon();
  }
});
