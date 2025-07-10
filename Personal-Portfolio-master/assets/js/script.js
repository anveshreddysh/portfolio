"use strict";

// Utility function for toggling classes
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// Testimonials Modal
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const openTestimonialModal = (item) => {
  modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
  modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
  modalTitle.innerHTML = item.querySelector(
    "[data-testimonials-title]"
  ).innerHTML;
  modalText.innerHTML = item.querySelector(
    "[data-testimonials-text]"
  ).innerHTML;
  elementToggleFunc(modalContainer);
  elementToggleFunc(overlay);
};

testimonialsItem.forEach((item) => {
  item.addEventListener("click", () => openTestimonialModal(item));
});

modalCloseBtn.addEventListener("click", () => {
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
});
overlay.addEventListener("click", () => {
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
});

// Filter Section
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", () => elementToggleFunc(select));

const filterFunc = (selectedValue) => {
  filterItems.forEach((item) => {
    item.classList.toggle(
      "active",
      selectedValue === "all" || selectedValue === item.dataset.category
    );
  });
};

// For select dropdown
selectItems.forEach((item) => {
  item.addEventListener("click", () => {
    const selectedValue = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// For filter buttons
let lastClickedBtn = filterBtn[0];
filterBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedValue = btn.innerText.toLowerCase();
    selectValue.innerText = btn.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    btn.classList.add("active");
    lastClickedBtn = btn;
  });
});

// Contact Form Validation with debouncing
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

let debounceTimeout;
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      formBtn.disabled = !form.checkValidity();
    }, 300);
  });
});

// Page Navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    pages.forEach((page) => {
      const isActive = link.innerHTML.toLowerCase() === page.dataset.page;
      page.classList.toggle("active", isActive);
    });
    navigationLinks.forEach((nav) => nav.classList.remove("active"));
    link.classList.add("active");
    window.scrollTo(0, 0);
  });
});
