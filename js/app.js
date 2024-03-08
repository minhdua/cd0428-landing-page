/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const navbarList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
const navFragment = document.createDocumentFragment();
const navLinks = document.querySelectorAll('nav ul li a');

// Define options for the Intersection Observer
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/




/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// Dynamically build navigation menu based on sections
sections.forEach(section => {
    const navItemText = section.dataset.nav;
    const navItemId = section.id;
  
    const listItem = document.createElement('li');
    const linkItem = document.createElement('a');
    linkItem.href = `#${navItemId}`;
    linkItem.classList.add('menu__link');
    linkItem.textContent = navItemText;
  
    listItem.appendChild(linkItem);
    navFragment.appendChild(listItem);
  });

navbarList.appendChild(navFragment);
// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', function() {
    let foundSection;
  
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && (foundSection == null || rect.top < foundSection.getBoundingClientRect().top)) {
        foundSection = section;
      }
    });
  
    sections.forEach(section => {
      if (section == foundSection) {
        section.classList.add('your-active-class');
      } else {
        section.classList.remove('your-active-class');
      }
    });
  });


// Scroll to anchor ID using scrollTO event
document.querySelectorAll('.navbar__menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelectorAll('.navbar__menu a').forEach(navLink => {
            navLink.classList.remove('active');
        });

        this.classList.add('active');

        const sectionId = this.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Hide Navigation on Idle
let isScrolling;
document.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    document.querySelector('.navbar__menu').style.display = '';
    isScrolling = setTimeout(function() {
        document.querySelector('.navbar__menu').style.display = 'none';
    }, 2000); // Adjust time as needed
}, false);

// Scroll to Top Button
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}
function topFunction() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}
  
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const navLink = document.querySelector(`nav ul li a[href="#${entry.target.id}"]`);
  
      // Check if the section is intersecting
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        // Add 'active' class to the section and the nav link
        entry.target.classList.add('your-active-class');
        if (navLink) {
          navLink.classList.add('active');
        }
      } else {
        // Remove 'active' class from the section and the nav link
        entry.target.classList.remove('your-active-class');
        if (navLink) {
          navLink.classList.remove('active');
        }
      }
    });
  }, options);
  
  // Observe each section
  sections.forEach(section => {
    observer.observe(section);
  });
  