function toggleMenu() {
  menu = document.getElementById("menu");
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
  } else {
    menu.classList.add("hidden");
  }
}

// search

const toggleSearch = () => {
  const searchInput = document.getElementById("searchInput");
  const searchIcon = document.getElementById("searchIcon");

  searchIcon.addEventListener("click", () => {
    searchInput.classList.toggle("focus:w-32");
    searchInput.classList.toggle("w-4");
    searchInput.classList.toggle("pr-5");
    searchInput.focus();
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchInput.value = "";
      searchInput.blur();
    }
  });
};

toggleSearch();

function toggleSlides() {
  const slides = document.querySelectorAll(".slideshow li");
  let currentIndex = 0;
  let intervalId;

  function showNextSlide() {
    slides[currentIndex].classList.add("hidden");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.remove("hidden");
  }

  function startSlideshow() {
    intervalId = setInterval(showNextSlide, 2000); // Change slide every 3 seconds (adjust as needed)
  }

  function pauseSlideshow() {
    clearInterval(intervalId);
  }

  startSlideshow(); // Start slideshow initially

  // Pause slideshow on hover
  slides.forEach((slide) => {
    slide.addEventListener("mouseenter", pauseSlideshow);
    slide.addEventListener("mouseleave", startSlideshow);
  });
}

toggleSlides();

// window.onbeforeunload = () => {
//   for(const form of document.getElementsByTagName('form')) {
//     form.reset();
//   }
// }

// searchbar

document
  .getElementById("searchInput")
  .addEventListener("input", function (event) {
    const searchQuery = event.target.value.toLowerCase();
    const suggestionsContainer = document.getElementById("searchSuggestions");
    suggestionsContainer.innerHTML = ""; // Clear previous suggestions
    if (searchQuery.length >= 3) {
      const suggestions = [
        { name: "Home", link: "./index.html#Home" },
        { name: "About Us", link: "./index.html#about" },
        { name: "Our Products", link: "./OurProduct.html" },
        { name: "Services", link: "./Service.html" },
        { name: "Contact", link: "./index.html#contact" },
      ];

      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(searchQuery),
      );

      filteredSuggestions.forEach((suggestion) => {
        const suggestionElement = document.createElement("div");
        suggestionElement.textContent = suggestion.name;
        suggestionElement.classList.add("p-2", "w-40", "cursor-pointer");
        suggestionElement.addEventListener("click", () => {
          window.location.href = suggestion.link;
        });
        suggestionsContainer.appendChild(suggestionElement);
      });

      suggestionsContainer.style.display =
        filteredSuggestions.length > 0 ? "block" : "none";
    } else {
      suggestionsContainer.style.display = "none";
    }
  });

// Handling navigation to the section on "Enter"
document
  .getElementById("searchInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const inputVal = this.value.toLowerCase();
      const suggestionLinks = {
        home: "./index.html#Home",
        "about us": "./index.html#about",
        "our products": "./OurProduct.html",
        services: "./Service.html",
        contact: "./index.html#contact",
      };

      const matchedLink = Object.entries(suggestionLinks).find(([key]) =>
        key.includes(inputVal),
      );
      if (matchedLink) {
        window.location.href = matchedLink[1];
      }
    }
  });

// Function to navigate to the section or external page
function navigateToSection(sectionId) {
  if (sectionId.includes(".html")) {
    // If the ID indicates an external page, change location
    window.location.href = sectionId;
  } else {
    // For internal sections, scroll into view
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Sticky Header
  const header = document.getElementById("header");
  const navbar = document.getElementById("nav");
  const headerHeight = header.offsetHeight; // Get the height of the header section
  const navbarHeight = navbar.offsetHeight; // Get the height of the navbar

  window.addEventListener("scroll", () => {
    if (window.scrollY > headerHeight) {
      header.classList.add("sticky", "top-0", "z-30");
      navbar.classList.add("sticky", "top-2", "z-20");
    } else {
      header.classList.remove("sticky", "top-0", "z-30");
      navbar.classList.remove("sticky", "top-0", "z-20");
    }
  });

  // Adjusting scroll position when clicking navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      let targetId = this.getAttribute("href");
      let targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - navbarHeight,
          behavior: "smooth",
        });
      }
    });
  });
});



function sendemail() {
  // Get the form elements
  var email = document.getElementById("email").value;
  var from_name = document.getElementById("name").value;
  var country = document.getElementById("country").value;
  var phone = document.getElementById("phone").value;
  var message = document.getElementById("message").value;

  // Validate the name field: must be a string with no numbers
  var nameRegex = /^[a-zA-Z\s]+$/; // Allows only letters and spaces
  if (!nameRegex.test(from_name)) {
    alert("Name should only contain letters and spaces.");
    return; // Exit the function and prevent email sending
  }

  // Validate the email field: using a simple regex for email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return; // Exit the function and prevent email sending
  }

  // Validate the country field: must be a string with no numbers
  if (!nameRegex.test(country)) {
    alert("Country should only contain letters and spaces.");
    return; // Exit the function and prevent email sending
  }

  // If all validations pass, proceed with email sending
  var templateParams = {
    to_name: from_name,
    email: email,
    country: country,
    phone: phone,
    message: message,
  };

  emailjs
    .send("service_nj63ymj", "template_0iu6b3c", templateParams)
    .then(function (response) {
      console.log("SUCCESS!", response.status, response.text);
      window.alert("Your form has been submitted successfully!");
    })
    .catch(function (error) {
      console.error("FAILED...", error);
      window.alert(
        "An error occurred while sending the email. Please try again.",
      );
    });
}
