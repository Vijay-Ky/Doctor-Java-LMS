// Original Navigation System (Left Side)
const navBtn = document.getElementById("nav-btn");
const navbar = document.getElementById("navbar");
const navClose = document.getElementById("nav-close");

// Main Navigation System (Right Side)
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.menu .nav-item');
const menuOverlay = document.querySelector('.menu-overlay');

// State tracking
let isMainNavOpen = false;
let isOriginalNavOpen = false;

// Initialize menus
function initMenus() {
  // Close both menus initially
  navbar.classList.remove("showNav");
  menu.classList.remove("show");
  menuNav.classList.remove("show");
  if (menuOverlay) menuOverlay.classList.remove("show");
  document.body.style.overflow = 'auto';

  // Remove all show classes from nav items
  navItems.forEach(item => item.classList.remove("show"));
}

// Toggle Original Navigation (Left)
function toggleOriginalNav() {
  if (isOriginalNavOpen) {
    // Close original nav
    navbar.classList.remove("showNav");
    document.body.style.overflow = 'auto';
    isOriginalNavOpen = false;
  } else {
    // Close main nav if open
    if (isMainNavOpen) {
      toggleMainNav();
    }
    // Open original nav
    navbar.classList.add("showNav");
    document.body.style.overflow = 'hidden';
    isOriginalNavOpen = true;
  }
}

// Toggle Main Navigation (Right)
function toggleMainNav() {
  if (isMainNavOpen) {
    // Close main nav
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    if (menuOverlay) menuOverlay.classList.remove("show");
    menuBtn.classList.remove("close");

    // Reset nav items
    navItems.forEach(item => {
      item.classList.remove("show");
      item.style.transitionDelay = '0s';
    });

    document.body.style.overflow = 'auto';
    isMainNavOpen = false;
  } else {
    // Close original nav if open
    if (isOriginalNavOpen) {
      toggleOriginalNav();
    }
    // Open main nav
    menu.classList.add("show");
    menuNav.classList.add("show");
    if (menuOverlay) menuOverlay.classList.add("show");
    menuBtn.classList.add("close");

    // Animate nav items with delay
    navItems.forEach((item, index) => {
      item.classList.add("show");
      item.style.transitionDelay = `${index * 0.1}s`;
    });

    document.body.style.overflow = 'hidden';
    isMainNavOpen = true;
  }
}

// Event Listeners
function setupEventListeners() {
  // Original nav buttons
  if (navBtn) navBtn.addEventListener("click", toggleOriginalNav);
  if (navClose) navClose.addEventListener("click", toggleOriginalNav);

  // Main nav buttons
  if (menuBtn) menuBtn.addEventListener("click", toggleMainNav);
  if (menuOverlay) menuOverlay.addEventListener("click", toggleMainNav);

  // Close menus when clicking nav links (optional)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (isOriginalNavOpen) toggleOriginalNav();
      if (isMainNavOpen) toggleMainNav();
    });
  });

  // Close menus with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (isOriginalNavOpen) toggleOriginalNav();
      if (isMainNavOpen) toggleMainNav();
    }
  });
}

// Assignment QA Functions
function revealAnswer() {
  const answer = document.getElementById("answer");
  if (answer) {
    answer.style.display = answer.style.display === "none" ? "block" : "none";
  }
}

function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  const resultMessage = document.getElementById("result-message");

  if (!selectedAnswer || !resultMessage) return;

  const correctAnswer = "A"; // Correct answer is option A

  if (selectedAnswer.value === correctAnswer) {
    resultMessage.textContent = "Correct!";
    resultMessage.className = "correct";
  } else {
    resultMessage.textContent = "Incorrect!";
    resultMessage.className = "incorrect";
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initMenus();
  setupEventListeners();

  // Initialize QA functionality if needed
  const revealBtn = document.querySelector('.reveal-button');
  if (revealBtn) revealBtn.addEventListener('click', revealAnswer);

  const checkBtn = document.querySelector('.check-answer');
  if (checkBtn) checkBtn.addEventListener('click', checkAnswer);
});