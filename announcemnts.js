// Announcements page: filtering
const filterButtons = document.querySelectorAll(".filter");
const items = document.querySelectorAll(".pinned, .card");

// this updates the numbers displayed on the filter tabs the function checks each button and find out what category it represents 
function updateCounts() {
  filterButtons.forEach((button) => {
    const filter = button.dataset.filter;
    const total =
      filter === "all" //count every announcement if selected all
        ? items.length //potherwise only count the announcements that belong to that vategory 
        : [...items].filter((item) => item.dataset.category === filter).length;

        // the question mark is a ternary operator that is shorter than if...else
            //ites converts the announcements into an arrya 
        // filter selects only the announcements that are matching the category
        //how mnay counts matched 
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



// readmore 

const modal = document.getElementById("announcement-modal");
const modalCategory = document.getElementById("modal-category");
const modalDate = document.getElementById("modal-date");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalDetails = document.getElementById("modal-details");

function textOf(parent, selector) {
  const el = parent.querySelector(selector);
  return el ? el.textContent.trim() : "";
}

function openModal(item) {
  const isPinned = item.classList.contains("pinned");
  const category = item.dataset.category;

  if (isPinned) {

    const [, ...rest] = textOf(item, ".pinned-info").split(/\s*[-·–]\s*/);
    modalDate.textContent = rest.join(" - ");
    modalTitle.textContent = textOf(item, ".pinned-title");
    modalText.textContent = textOf(item, ".pinned-text");
  } else {
    modalDate.textContent = textOf(item, ".card-date");
    modalTitle.textContent = textOf(item, ".card-title");
    modalText.textContent = textOf(item, ".card-text");
  }

  modalCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
  modalCategory.className = "modal-category category-" + category;

  // Full details (when, what to bring, etc) 
  const details = item.querySelector(".card-details");
  modalDetails.innerHTML = details ? details.innerHTML : "";
  modalDetails.hidden = !details;

  modal.showModal();
}

document.querySelectorAll(".read-more, .btn-readmore").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openModal(link.closest(".pinned, .card"));
  });
});

// close buttons 
modal.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => modal.close());
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});