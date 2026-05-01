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
function animateValue(element, end) {
  let start = 0;
  const duration = 600;
  const increment = end / (duration / 4);

  function update() {
    start += increment;

    if (start >= end) {
      element.textContent = end;
    } else {
      element.textContent = Math.floor(start);
      requestAnimationFrame(update);
    }
  }

  update();
}
async function fetchPokemon() {
  const input = document.getElementById("txtbox").value.toLowerCase();
  const img = document.getElementById("pokemonImage");
  const container = document.getElementById("typesContainer");
  const attackEl = document.getElementById("attack");

  const url = `https://pokeapi.co/api/v2/pokemon/${input}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Pokemon not found");
    }

    const data = await response.json();
    //image

    const imageUrl = data.sprites.other["official-artwork"].front_default;
    img.src = imageUrl;
    img.classList.remove("hidden");

    // Types
    const types = data.types.map((t) => t.type.name);

    container.innerHTML = "";

    types.forEach((type) => {
      const badge = document.createElement("span");
      badge.classList.add(
        "px-4",
        "py-1",
        "rounded-full",
        "text-sm",
        "font-semibold",
        "text-white",
      );

      const style = typeStyles[type];

      badge.textContent = `${style.emoji} ${type}`;
      badge.style.backgroundColor = style.color;

      container.appendChild(badge);
    });
    const stats = data.stats;

    attackEl.innerHTML = "";

    stats.forEach((s) => {
      const statItem = document.createElement("p");
      statItem.classList.add("stat-item");

      const label = document.createElement("span");
      label.textContent = `${s.stat.name.toUpperCase()}: `;

      const value = document.createElement("span");

      statItem.appendChild(label);
      statItem.appendChild(value);

      attackEl.appendChild(statItem);

      animateValue(value, s.base_stat);
    });
  } catch (error) {
    alert("Pokémon not found 😢");
    img.classList.add("hidden");
    attackEl.innerHTML = "";
  }
}

document.getElementById("txtbox").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    fetchPokemon();
  }
});
