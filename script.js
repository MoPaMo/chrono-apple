let epochs = [];
let currentEpoch = 0;
let lastScrollPosition = 0;
const scrollThreshold = 50;

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
const scroll = (direction) => {
  window.scrollBy(0, direction * scrollThreshold);
};

const updateContent = () => {
  const epoch = epochs[currentEpoch];
  const elements = {
    name: document.getElementById("epoch-name"),
    style: document.getElementById("epoch-style"),
    description: document.getElementById("epoch-description"),
    imageContainer: document.getElementById("image-container"),
    image: document.getElementById("epoch-image"),
    imageTitle: document.getElementById("image-title"),
    year: document.getElementById("epoch-year"),
    dot: document.getElementById("scroll-dot"),
  };

  elements.name.textContent = epoch.name;
  elements.style.textContent = `Style: ${epoch.description}`;
  elements.description.textContent = `Context: ${epoch.period_description}`;
  elements.image.src = epoch.imageUrl;
  elements.image.alt = epoch.imageTitle;
  elements.imageTitle.textContent = epoch.imageTitle;

  // Extract year from start_date
  const startYear = new Date(epoch.start_date).getFullYear();
  const endYear = new Date(epoch.end_date).getFullYear();
  elements.year.textContent =
    (startYear < 0 ? Math.abs(startYear) + " BCE" : startYear) +
    " - " +
    (endYear < 0
      ? Math.abs(endYear) + " BCE"
      : endYear + (startYear < 0 ? "CE" : ""));

  elements.dot.style.top = `${(currentEpoch / (epochs.length - 1)) * 100}%`;

  // Add fade-in animation
  const fadeElements = [
    elements.name,
    elements.style,
    elements.description,
    elements.imageContainer,
    elements.year,
  ];
  fadeElements.forEach((el) => {
    el.classList.add("fade-in");
    setTimeout(() => el.classList.remove("fade-in"), 500);
  });
};

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  const scrollPercentage = scrollPosition / (docHeight - windowHeight);

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

fetchEpochs();
