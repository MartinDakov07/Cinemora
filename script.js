function scrollToContent() {
  document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
}
document.querySelector('.search input').addEventListener('focus', e => {
  e.target.style.outline = '2px solid #6c63ff';
});
document.querySelector('.search input').addEventListener('blur', e => {
  e.target.style.outline = 'none';
});
// Trailer hover preview logic
document.querySelectorAll('.card').forEach(card => {
  const video = card.querySelector('.trailer');
  
  card.addEventListener('mouseenter', () => {
    video.currentTime = 0; // Start from beginning
    video.play();
  });

  card.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0; // Reset for next hover
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
  });
});
document.querySelectorAll('.carousel-item').forEach(item => {
    const img = item.querySelector('img');
    item.setAttribute('data-title', img.alt);
});
document.addEventListener("DOMContentLoaded", () => {
  const authOverlay = document.getElementById("authOverlay");
  const authForm = document.getElementById("authForm");
  const toggleAuth = document.getElementById("toggleAuth");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  let isSignup = false;

  // Show login popup when visiting
  authOverlay.classList.remove("hidden");

  // Switch between Sign In / Sign Up
  toggleAuth.addEventListener("click", (e) => {
    e.preventDefault();
    isSignup = !isSignup;
    toggleAuth.textContent = isSignup ? "Sign in" : "Sign up";
    authForm.querySelector("button").textContent = isSignup ? "Create Account" : "Continue";
  });

  // Handle form submission (basic demo)
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email && password) {
      // In real sites, you'd send this to a server here.
      console.log(`${isSignup ? "Signing up" : "Logging in"} with`, email);

      // Save login flag in localStorage (so popup doesn’t appear again)
      localStorage.setItem("cinemoraLoggedIn", "true");

      // Close popup
      authOverlay.classList.add("hidden");
    }
  });

  // If already logged in, don't show popup again
  if (localStorage.getItem("cinemoraLoggedIn") === "true") {
    authOverlay.classList.add("hidden");
  }


});
document.addEventListener("DOMContentLoaded", () => {
  const authOverlay = document.getElementById("authOverlay");
  const authForm = document.getElementById("authForm");
  const toggleAuth = document.getElementById("toggleAuth");
  const toggleText = document.querySelector(".toggle-text span");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const usernameInput = document.getElementById("username");
  const authSubtitle = document.getElementById("authSubtitle");
  const userProfile = document.getElementById("userProfile");
  const userNameDisplay = document.getElementById("userNameDisplay");
  const logoutBtn = document.getElementById("logoutBtn");

  let isSignup = false;

  // ===== Show login popup if not logged in =====
  if (!localStorage.getItem("cinemoraLoggedIn")) {
    authOverlay.classList.remove("hidden");
  } else {
    const savedUser = localStorage.getItem("cinemoraUsername") || "User";
    userNameDisplay.innerHTML = `Logged in as: <strong>${savedUser}</strong>`;
  }

  // ===== Toggle between Sign In / Sign Up =====
  toggleAuth.addEventListener("click", (e) => {
    e.preventDefault();
    isSignup = !isSignup;

    if (isSignup) {
      toggleAuth.textContent = "Sign in";
      authSubtitle.textContent = "Create a new account";
      usernameInput.style.display = "block";
      usernameInput.classList.add("signup-only");
      emailInput.placeholder = "Email";
      toggleText.textContent="Already have an account?";
      authForm.querySelector("button").textContent = "Sign Up";
    } else {
      toggleAuth.textContent = "Sign up";
      authSubtitle.textContent = "Sign in to continue";
      usernameInput.style.display = "none";
      usernameInput.classList.remove("signup-only");
      emailInput.placeholder = "Username or Email";
      toggleText.textContent="Don't have an account?";
      authForm.querySelector("button").textContent = "Continue";
    }
  });

  // ===== Handle form submission =====
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (isSignup && (!username || !email || !password)) {
      alert("Please fill in all fields.");
      return;
    }
    if (!isSignup && (!email || !password)) {
      alert("Please enter your username/email and password.");
      return;
    }

    // Save login state
    localStorage.setItem("cinemoraLoggedIn", "true");
    localStorage.setItem("cinemoraUsername", isSignup ? username : email);

    // Update UI
    const displayName = isSignup ? username : email;
    userNameDisplay.innerHTML = `You are currently logged in as: <strong>${displayName}</strong>`;
  });

  // ===== Logout / Switch Account =====
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("cinemoraLoggedIn");
    localStorage.removeItem("cinemoraUsername");
    authOverlay.classList.remove("hidden");
  });
});
// Movie/Series database (add any page you want searchable)
// SEARCH DATABASE (add items here)
const searchDatabase = {
  "breaking bad": { page: "series/breakingbad.html" },
  "better call saul": { page: "series/bettercallsaul.html" },
  "prison break": { page: "series/prisonbreak.html" },
  "you": { page: "series/you.html" },
  "dexter": {page: "series/dexter.html"},
  "reacher": {page: "series/reacher.html"},
  "thewalkingdead": {page: "series/thewalkingdead.html"},
  "aliceinborderland": {page: "series/thewalkingdead.html"},
  "f1": {page:"f1.html"},
  "sinners": { page: "sinners.html" },
  "a minecraft movie": { page: "minecraft.html" },
  "frozen": {page: "kids.html"},
  "minions": {page: "kids.html"},
  "peppa pig": {page: "kids.html"},
  "paw patrol": {page: "kids.html"},
  "toy story": {page: "kids.html"},
  "finding nemo": {page: "kids.html"},
  "kung fu panda": {page: "kids.html"},
  "cars": {page: "kids.html"},
  "how to train your dragon": {page: "kids.html"},
  "harry potter": {page: "kids.html"},
  "the incredibles": {page: "kids.html"},
  "moana": {page: "kids.html"},
};


const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");

// === AUTO-SUGGEST SYSTEM ===
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  suggestionsBox.innerHTML = "";

  if (query.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  // get titles from DB
  const titles = Object.keys(searchDatabase);

  // get matches
  const matches = titles.filter(t => t.includes(query));

  if (matches.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  suggestionsBox.style.display = "block";

  matches.forEach(title => {
    const div = document.createElement("div");
    div.textContent = title;

    div.onclick = () => {
      const itemPage = searchDatabase[title].page;
      window.location.href = itemPage;
    };

    suggestionsBox.appendChild(div);
  });
});
// === ENTER KEY SEARCH HANDLER ===
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.toLowerCase().trim();

    // If empty → do nothing
    if (!query) return;

    // If match exists → go to movie
    if (searchDatabase[query]) {
      window.location.href = searchDatabase[query].page;
      return;
    }

    // Otherwise → go to "Not Found" page
    window.location.href = "notfound.html?query=" + encodeURIComponent(query);
  }
});



// CARD CLICK HANDLER (img or the whole card opens the page)
/* ================================
   FIXED CLICK HANDLING
================================ */

// 1️⃣ CARD CLICK — but DOES NOT fire when clicking heart
document.querySelectorAll(".card, .carousel-item").forEach(card => {
  card.addEventListener("click", function (e) {

    // If click originated from the heart → do nothing
    if (e.target.classList.contains("heart-btn")) return;

    const page = this.dataset.page;
    if (page) {
      // Detect if it's inside /series/ folder
      if (window.location.pathname.includes("series")) {
        window.location.href = `${page}.html`;
      } else {
        window.location.href = `series/${page}.html`;
      }
    }
  });
});

/* ================================
   HEART BUTTON FUNCTIONALITY
================================ */

function loadMyList() {
  const list = localStorage.getItem("myList");
  return list ? JSON.parse(list) : [];
}

function saveMyList(list) {
  localStorage.setItem("myList", JSON.stringify(list));
}

function toggleHeart(element) {
  const title = element.dataset.title;
  const img = element.dataset.img;
  const page = element.dataset.page;

  let list = loadMyList();
  const exists = list.find(item => item.title === title);

if (exists) {
    list = list.filter(item => item.title !== title);
    element.classList.remove("hearted");
    showToast(`${title} removed from My List`);
} else {
    list.push({ title, img, page });
    element.classList.add("hearted");
    showToast(`${title} added to My List 💜`);
}

  saveMyList(list);
}

// 2️⃣ HEART BUTTON LOGIC — final working version
document.querySelectorAll(".heart-btn").forEach(btn => {
  const title = btn.dataset.title;
  const list = loadMyList();

  if (list.find(item => item.title === title)) {
    btn.classList.add("hearted");
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); // <-- VERY IMPORTANT
    toggleHeart(btn);
  });
});
/* ================================
   TOAST NOTIFICATION SYSTEM
================================ */

let toastQueue = [];
let toastActive = false;

function showToast(message) {
  toastQueue.push(message);
  if (!toastActive) nextToast();
}

function nextToast() {
  if (toastQueue.length === 0) {
    toastActive = false;
    return;
  }

  toastActive = true;
  const toast = document.getElementById("toast");
  toast.textContent = toastQueue.shift();
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      nextToast();
    }, 350);
  }, 2200);
}


