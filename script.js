let epochs = [];
let currentEpoch = 0;
let lastScrollPosition = 0;
const scrollThreshold = 50; // Adjust this value to control scroll sensitivity

const fetchEpochs = async () => {
  try {
    const response = await fetch("art_movements.json");
    const data = await response.json();
    epochs = data.art_movements;
    initializeApp();
  } catch (error) {
    console.error("Error fetching art movements:", error);
  }
};

const initializeApp = () => {
  updateContent();
  setScrollContainerHeight();
  addEventListeners();
};

const setScrollContainerHeight = () => {
  document.querySelector(".scroll-container").style.height = `${
    epochs.length * 100
  }vh`;
};

const updateContent = () => {
  const epoch = epochs[currentEpoch];
  const elements = {
    name: document.getElementById("epoch-name"),
    style: document.getElementById("epoch-style"),
    description: document.getElementById("epoch-description"),
    image: document.getElementById("epoch-image"),
    year: document.getElementById("epoch-year"),
    dot: document.getElementById("scroll-dot"),
  };

  elements.name.textContent = epoch.name;
  elements.style.textContent = `Style: ${epoch.description}`;
  elements.description.textContent = `Context: ${epoch.period_description}`;
  elements.image.src = epoch.imageUrl;
  elements.image.alt = `Apple in ${epoch.name} style`;
  elements.year.textContent = epoch.year;

  elements.dot.style.top = `${(currentEpoch / (epochs.length - 1)) * 100}%`;

  // Add fade-in animation
  elements.name.classList.add("fade-in");
  elements.style.classList.add("fade-in");
  elements.description.classList.add("fade-in");
  elements.image.classList.add("fade-in");
  elements.year.classList.add("fade-in");

  // Remove fade-in class after animation completes
  setTimeout(() => {
    elements.name.classList.remove("fade-in");
    elements.style.classList.remove("fade-in");
    elements.description.classList.remove("fade-in");
    elements.image.classList.remove("fade-in");
    elements.year.classList.remove("fade-in");
  }, 500);
};

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  const scrollPercentage = scrollPosition / (docHeight - windowHeight);

  // Check if scroll distance exceeds threshold
  if (Math.abs(scrollPosition - lastScrollPosition) > scrollThreshold) {
    const newEpoch = Math.floor(scrollPercentage * epochs.length);
    if (
      newEpoch !== currentEpoch &&
      newEpoch >= 0 &&
      newEpoch < epochs.length
    ) {
      currentEpoch = newEpoch;
      updateContent();
    }
    lastScrollPosition = scrollPosition;
  }
};

const addEventListeners = () => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", setScrollContainerHeight);
};

// Start the app
fetchEpochs();
