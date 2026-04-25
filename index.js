const typeStyles = {
  fire: { emoji: "🔥", color: "#f08030" },
  water: { emoji: "💧", color: "#6890f0" },
  grass: { emoji: "🌿", color: "#78c850" },
  electric: { emoji: "⚡", color: "#f8d030" },
  ice: { emoji: "❄️", color: "#98d8d8" },
  fighting: { emoji: "🥊", color: "#c03028" },
  poison: { emoji: "☠️", color: "#a040a0" },
  ground: { emoji: "🌍", color: "#e0c068" },
  flying: { emoji: "🌪️", color: "#a890f0" },
  psychic: { emoji: "🔮", color: "#f85888" },
  bug: { emoji: "🐛", color: "#a8b820" },
  rock: { emoji: "🪨", color: "#b8a038" },
  ghost: { emoji: "👻", color: "#705898" },
  dragon: { emoji: "🐉", color: "#7038f8" },
  dark: { emoji: "🌑", color: "#705848" },
  steel: { emoji: "⚙️", color: "#b8b8d0" },
  fairy: { emoji: "✨", color: "#ee99ac" },
  normal: { emoji: "⚪", color: "#a8a878" },
};

async function fetchPokemon() {
  const input = document.getElementById("txtbox").value.toLowerCase();
  const img = document.getElementById("pokemonImage");
  const container = document.getElementById("typesContainer");
  const attackEl = document.getElementById("attack"); // 👈 link to HTML

  const url = `https://pokeapi.co/api/v2/pokemon/${input}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Pokemon not found");
    }

    const data = await response.json();

    // Image
    const imageUrl = data.sprites.other["official-artwork"].front_default;
    img.src = imageUrl;
    img.classList.remove("hidden");

    // Types
    const types = data.types.map((t) => t.type.name);

    container.innerHTML = "";

    types.forEach((type) => {
      const badge = document.createElement("span");
      badge.classList.add("type-badge");

      const style = typeStyles[type];

      badge.textContent = `${style.emoji} ${type}`;
      badge.style.backgroundColor = style.color;

      container.appendChild(badge);
    });

    // 💪 Stats (THIS IS THE NEW PART)
    const stats = data.stats;

    let statsText = "";

    stats.forEach((s) => {
      statsText += `${s.stat.name.toUpperCase()}: ${s.base_stat} <br>`;
    });

    attackEl.innerHTML = statsText;
  } catch (error) {
    alert("Pokémon not found 😢");
    img.classList.add("hidden");
    attackEl.innerHTML = ""; // clear stats on error
  }
}

// ✅ Enter key fix (this part is fine, just keep it)
document.getElementById("txtbox").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    fetchPokemon();
  }
});
