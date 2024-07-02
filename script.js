const epochs = [
  {
    year: 1400,
    name: "Renaissance",
    description: "Characterized by a revival of classical learning and wisdom.",
    imageUrl: "/api/placeholder/400/400",
  },
  {
    year: 1600,
    name: "Baroque",
    description:
      "Known for its ornate, extravagant style and dramatic effects.",
    imageUrl: "/api/placeholder/400/400",
  },
  {
    year: 1780,
    name: "Neoclassicism",
    description: "A return to the ideals of classical antiquity.",
    imageUrl: "/api/placeholder/400/400",
  },
  {
    year: 1850,
    name: "Impressionism",
    description: "Capturing the fleeting effects of light and color.",
    imageUrl: "/api/placeholder/400/400",
  },
  {
    year: 1905,
    name: "Cubism",
    description:
      "Breaking objects into geometric shapes viewed from multiple angles.",
    imageUrl: "/api/placeholder/400/400",
  },
];

let currentEpoch = 0;

const updateContent = () => {
  const epoch = epochs[currentEpoch];
  document.getElementById("epoch-name").textContent = epoch.name;
  document.getElementById("epoch-description").textContent = epoch.description;
  document.getElementById("epoch-image").src = epoch.imageUrl;
  document.getElementById("epoch-image").alt = `Apple in ${epoch.name} style`;
  document.getElementById("epoch-year").textContent = epoch.year;

  // Update dot position
  const dot = document.getElementById("scroll-dot");
  dot.style.top = `${(currentEpoch / (epochs.length - 1)) * 100}%`;
};

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  const scrollPercentage = scrollPosition / (docHeight - windowHeight);
  currentEpoch = Math.floor(scrollPercentage * epochs.length);
  currentEpoch = Math.min(currentEpoch, epochs.length - 1);
  updateContent();
};

window.addEventListener("scroll", handleScroll);
updateContent(); // Initialize content