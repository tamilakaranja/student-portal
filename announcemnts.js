// Announcements page: filtering
const filterButtons = document.querySelectorAll(".filter");
const items = document.querySelectorAll(".pinned, .card");

// Keep nos on the tabs in sync with the announcements 
function updateCounts() {
  filterButtons.forEach((button) => {
    const filter = button.dataset.filter;
    const total =
      filter === "all"
        ? items.length
        : [...items].filter((item) => item.dataset.category === filter).length;

    const count = button.querySelector(".count");
    if (count) count.textContent = total;
  });
}

// Show only the announcements that match the chosen filter
function applyFilter(filter) {
  items.forEach((item) => {
    const matches = filter === "all" || item.dataset.category === filter;
    item.hidden = !matches;
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

updateCounts();
applyFilter("all");