
// ********** set date ************

const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** toggle links open / close links ************

const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  // linksContainer.classList.toggle("show-links"); // works with hardcoded height in css

  // Dynamic version
  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  if (containerHeight === 0) { // i.e. links are hidden
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0; // i.e. links are open
  }
  
});

// ********** show/reveal fixed navbar AND back to top button ************

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
        navbar.classList.add("fixed-nav");
    } else {
        navbar.classList.remove("fixed-nav");
    }

    if (scrollHeight > 500) {
        topLink.classList.add("show-link");
    } else {
        topLink.classList.remove("show-link");
    }
});

// ********** smooth scroll ************

const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {

    e.preventDefault();

    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    // Calculate Navbar component heights
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    // If Navbar links are hidden
    if (!fixedNav) {
      position = position - navHeight;
    }

    // If Navbar links are open
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });

    // close the links container on mobile screens
    linksContainer.style.height = 0;
  });
});
