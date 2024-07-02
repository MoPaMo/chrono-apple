let epochs = [];
fetch("art_movements.json")
  .then((response) => response.json())
  .then((data) => {
    epochs = data.art_movements;
  });
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

// Set the height of the scroll container
document.querySelector(".scroll-container").style.height = `${
  epochs.length * 100
}vh`;
