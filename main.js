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


document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const navbar = document.getElementById("nav");

  window.addEventListener("scroll", () => {
    // Get the height of the header to determine when to add the sticky class
    const headerHeight = header.offsetHeight;

    if (window.scrollY > headerHeight) {
      header.classList.add("sticky", "top-0", "z-20");
      navbar.classList.add("sticky", "top-2", "z-10");
    } else {
      header.classList.remove("sticky", "top-0", "z-20");
      navbar.classList.remove("sticky", "top-0", "z-10");
    }
  });

  // Handling smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - navbar.offsetHeight,
          behavior: "smooth",
        });
      }
    });
  });
});









document.addEventListener("DOMContentLoaded", () => {
  const countryInput = document.getElementById("country");
  const phoneInput = document.getElementById("phone");

  // Country code map with sample data, keys in lowercase for insensitive matching
const countryCodeMap = {
  "afghanistan": "+93",
  "albania": "+355",
  "algeria": "+213",
  "andorra": "+376",
  "angola": "+244",
  "antigua and barbuda": "+1-268",
  "argentina": "+54",
  "armenia": "+374",
  "australia": "+61",
  "austria": "+43",
  "azerbaijan": "+994",
  "bahamas": "+1-242",
  "bahrain": "+973",
  "bangladesh": "+880",
  "barbados": "+1-246",
  "belarus": "+375",
  "belgium": "+32",
  "belize": "+501",
  "benin": "+229",
  "bhutan": "+975",
  "bolivia": "+591",
  "bosnia and herzegovina": "+387",
  "botswana": "+267",
  "brazil": "+55",
  "brunei": "+673",
  "bulgaria": "+359",
  "burkina faso": "+226",
  "burundi": "+257",
  "cabo verde": "+238",
  "cambodia": "+855",
  "cameroon": "+237",
  "canada": "+1",
  "central african republic": "+236",
  "chad": "+235",
  "chile": "+56",
  "china": "+86",
  "colombia": "+57",
  "comoros": "+269",
  "congo, democratic republic of the": "+243",
  "congo, republic of the": "+242",
  "costa rica": "+506",
  "côte d'ivoire": "+225",
  "croatia": "+385",
  "cuba": "+53",
  "cyprus": "+357",
  "czech republic": "+420",
  "denmark": "+45",
  "djibouti": "+253",
  "dominica": "+1-767",
  "dominican republic": "+1-809",
  "east timor": "+670",
  "ecuador": "+593",
  "egypt": "+20",
  "el salvador": "+503",
  "equatorial guinea": "+240",
  "eritrea": "+291",
  "estonia": "+372",
  "eswatini": "+268",
  "ethiopia": "+251",
  "fiji": "+679",
  "finland": "+358",
  "france": "+33",
  "gabon": "+241",
  "gambia": "+220",
  "georgia": "+995",
  "germany": "+49",
  "ghana": "+233",
  "greece": "+30",
  "grenada": "+1-473",
  "guatemala": "+502",
  "guinea": "+224",
  "guinea-bissau": "+245",
  "guyana": "+592",
  "haiti": "+509",
  "honduras": "+504",
  "hungary": "+36",
  "iceland": "+354",
  "india": "+91",
  "indonesia": "+62",
  "iran": "+98",
  "iraq": "+964",
  "ireland": "+353",
  "israel": "+972",
  "italy": "+39",
  "jamaica": "+1-876",
  "japan": "+81",
  "jordan": "+962",
  "kazakhstan": "+7",
  "kenya": "+254",
  "kiribati": "+686",
  "kuwait": "+965",
  "kyrgyzstan": "+996",
  "laos": "+856",
  "latvia": "+371",
  "lebanon": "+961",
  "lesotho": "+266",
  "liberia": "+231",
  "libya": "+218",
  "liechtenstein": "+423",
  "lithuania": "+370",
  "luxembourg": "+352",
  "madagascar": "+261",
  "malawi": "+265",
  "malaysia": "+60",
  "maldives": "+960",
  "mali": "+223",
  "malta": "+356",
  "marshall islands": "+692",
  "mauritania": "+222",
  "mauritius": "+230",
  "mexico": "+52",
  "micronesia": "+691",
  "moldova": "+373",
  "monaco": "+377",
  "mongolia": "+976",
  "montenegro": "+382",
  "morocco": "+212",
  "mozambique": "+258",
  "myanmar": "+95",
  "namibia": "+264",
  "nauru": "+674",
  "nepal": "+977",
  "netherlands": "+31",
  "new zealand": "+64",
  "nicaragua": "+505",
  "niger": "+227",
  "nigeria": "+234",
  "north korea": "+850",
  "north macedonia": "+389",
  "norway": "+47",
  "oman": "+968",
  "pakistan": "+92",
  "palau": "+680",
  "palestine": "+970",
  "panama": "+507",
  "papua new guinea": "+675",
  "paraguay": "+595",
  "peru": "+51",
  "philippines": "+63",
  "poland": "+48",
  "portugal": "+351",
  "qatar": "+974",
  "romania": "+40",
  "russia": "+7",
  "rwanda": "+250",
  "saint kitts and nevis": "+1-869",
  "saint lucia": "+1-758",
  "saint vincent and the grenadines": "+1-784",
  "samoa": "+685",
  "san marino": "+378",
  "sao tome and principe": "+239",
  "saudi arabia": "+966",
  "senegal": "+221",
  "serbia": "+381",
  "seychelles": "+248",
  "sierra leone": "+232",
  "singapore": "+65",
  "slovakia": "+421",
  "slovenia": "+386",
  "solomon islands": "+677",
  "somalia": "+252",
  "south africa": "+27",
  "south korea": "+82",
  "south sudan": "+211",
  "spain": "+34",
  "sri lanka": "+94",
  "sudan": "+249",
  "suriname": "+597",
  "sweden": "+46",
  "switzerland": "+41",
  "syria": "+963",
  "taiwan": "+886",
  "tajikistan": "+992",
  "tanzania": "+255",
  "thailand": "+66",
  "togo": "+228",
  "tonga": "+676",
  "trinidad and tobago": "+1-868",
  "tunisia": "+216",
  "turkey": "+90",
  "turkmenistan": "+993",
  "tuvalu": "+688",
  "uganda": "+256",
  "ukraine": "+380",
  "united arab emirates": "+971",
  "united kingdom": "+44",
  "united states": "+1",
  "uruguay": "+598",
  "uzbekistan": "+998",
  "vanuatu": "+678",
  "vatican city": "+379",
  "venezuela": "+58",
  "vietnam": "+84",
  "yemen": "+967",
  "zambia": "+260",
  "zimbabwe": "+263"
};


  countryInput.addEventListener("input", () => {
    // Convert input to lowercase to match keys in the countryCodeMap
    const inputVal = countryInput.value.toLowerCase().trim();
    const countryCode = countryCodeMap[inputVal];

    // Clear previous entry
    phoneInput.value = phoneInput.value.replace(/^[+]\d+\s*/, "").trim();

    // Set new country code if available
    if (countryCode) {
      phoneInput.value = `${countryCode} ${phoneInput.value}`;
    }
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
    .send("service_nbawuac", "template_2j7q0rg", templateParams)
    .then(function (response) {
      console.log("SUCCESS!", response.status, response.text);
      window.alert("Your form has been submitted successfully!");
    })
    .catch(function (error) {
      console.error("FAILED...", error);
      window.alert(
        "An error occurred while sending the email. Please try again."
      );
    });
}
