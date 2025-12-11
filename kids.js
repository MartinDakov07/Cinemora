// ================= MOVIE DATABASE =================
const movies = {
  "how to train your dragon": {
    title: "How to Train Your Dragon",
    img: "https://upload.wikimedia.org/wikipedia/en/9/99/How_to_Train_Your_Dragon_Poster.jpg",
    trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  "harry potter": {
    title: "Harry Potter",
    img: "https://static1.moviewebimages.com/wordpress/wp-content/uploads/movie/QHEDmRuOHWBIoJ0BKRf3MXuG7I3q8I.jpg",
    trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },
  "the incredibles": {
    title: "The Incredibles",
    img: "https://picfiles.alphacoders.com/346/346533.jpg",
    trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
  },
  "moana": {
    title: "Moana",
    img: "https://image.tmdb.org/t/p/original/z6mmye1efC6Q42HvrYQsZNOeH9H.jpg",
    trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  "frozen": {
    title: "Frozen",
    img: "https://tse2.mm.bing.net/th/id/OIP.PgHmGF-jyVYgOsavXn45NwHaLH",
    trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  "minions": {
    title: "Minions",
    img: "https://www.themoviedb.org/t/p/original/oYsloNq9IYADOdzlsfDmuUQvJ2u.jpg",
    trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  "peppa pig": {
    title: "Peppa Pig",
    img: "https://tse1.mm.bing.net/th/id/OIP.TPPKwI6cdOsT2yvmaa6XdQHaLH",
    trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },
  "paw patrol": {
    title: "Paw Patrol",
    img: "https://wallpapers.com/images/hd/paw-patrol-pictures-6fkpaia2w0imq1ud.jpg",
    trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  "toy story": {
    title: "Toy Story",
    img: "https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg",
    trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ToyStory.mp4"
  },
  "finding nemo": {
    title: "Finding Nemo",
    img: "https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg",
    trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Nemo.mp4"
  },
  "kung fu panda": {
    title: "Kung Fu Panda",
    img: "https://whats-after-the-movie-ti152.sevalla.storage/movies/kung-fu-panda--4Kn0A.jpg",
    trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/KungFuPanda.mp4"
  },
  "cars": {
    title: "Cars",
    img: "https://3.bp.blogspot.com/-pZXLqqIgtZs/TjyUoBpPFyI/AAAAAAAAAN4/9IrdyPU06Vo/s1600/cars.jpg",
    trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Cars.mp4"
  }
};
const carousels = document.querySelectorAll(".carousel-container");

carousels.forEach(container => {
  const carousel = container.querySelector(".carousel");
  const left = container.querySelector(".left");
  const right = container.querySelector(".right");

  left.addEventListener("click", () => {
    carousel.scrollBy({ left: -300, behavior: "smooth" });
  });

  right.addEventListener("click", () => {
    carousel.scrollBy({ left: 300, behavior: "smooth" });
  });
});
// ==================== MY LIST LOGIC ====================
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
    const page = element.dataset.page || "#";

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

// Initialize hearts
document.querySelectorAll(".heart-btn").forEach(btn => {
    const title = btn.dataset.title;
    const list = loadMyList();
    if (list.find(item => item.title === title)) btn.classList.add("hearted");

    btn.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        toggleHeart(btn);
    });
});

// ==================== TOAST NOTIFICATIONS ====================
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
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: #222;
            color: #fff;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(255,255,255,0.2);
            z-index: 9999;
            font-weight: bold;
            opacity: 0;
            transition: 0.3s;
        `;
    }

    toast.textContent = toastQueue.shift();
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(nextToast, 350);
    }, 2000);
}
document.querySelectorAll('.media-container').forEach(container => {
  const video = container.querySelector('video');

  container.addEventListener('mouseenter', () => {
    video.currentTime = 30;
    video.play();
  });

  container.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 30;
  });
});

// ==================== TRAILER MODAL ====================
const modal = document.getElementById("trailerModal");
const modalContent = document.getElementById("modalContent");
const closeModalBtn = document.getElementById("closeModal");

document.querySelectorAll(".play-btn").forEach(btn => {
    btn.addEventListener("click", e => {
        e.stopPropagation();
        const trailer = btn.dataset.trailer;
        if (!trailer) return;

        modalContent.innerHTML = `<iframe src="${trailer}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        modal.style.display = "flex";
    });
});

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modalContent.innerHTML = "";
});

window.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
        modalContent.innerHTML = "";
    }
});

// ==================== SEARCH FILTER ====================
const searchInput = document.getElementById("searchBar");
if (searchInput) {
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
    });
}
document.getElementById("searchBar").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    const query = e.target.value.trim().toLowerCase();

    // Allowed movie names
    const validMovies = [
      "how to train your dragon",
      "harry potter",
      "the incredibles",
      "moana",
      "frozen",
      "minions",
      "peppa pig",
      "kung fu panda",
      "paw patrol",
      "toy story",
      "finding nemo",
      "cars"
    ];

if (validMovies.includes(query)) {
  window.location.href = "result.html?q=" + encodeURIComponent(query);
} else {
  window.location.href = "notfound.html?query=" + encodeURIComponent(query);
}

  }
});
const searchBar = document.getElementById("searchBar");
const suggestionsBox = document.getElementById("suggestions");

searchBar.addEventListener("input", () => {
  const input = searchBar.value.toLowerCase().trim();
  
  if (input.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  const matches = Object.keys(movies).filter(m => m.startsWith(input));

  if (matches.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  suggestionsBox.innerHTML = matches
    .map(m => `<div class="suggestion-item">${movies[m].title}</div>`)
    .join("");

  suggestionsBox.style.display = "block";

  document.querySelectorAll(".suggestion-item").forEach(item => {
    item.addEventListener("click", () => {
      window.location.href = "result.html?q=" + encodeURIComponent(item.textContent.toLowerCase());
    });
  });
});
searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchBar.value.toLowerCase().trim();

if (movies[query]) {
  window.location.href = "result.html?q=" + encodeURIComponent(query);
} else {
  window.location.href = "notfound.html?query=" + encodeURIComponent(query);
}

  }
});

