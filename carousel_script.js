let currentIndex = 0;
let linksCount = 0;

function loadCarousel() {
    fetch("get_links.php")
        .then((response) => response.json())
        .then((data) => {
            const container = document.querySelector(".carousel");
            container.innerHTML = "";
            linksCount = data.links.length;
            if (linksCount > 0) {
                const link = data.links[currentIndex];
                const item = document.createElement("div");
                item.className = "carousel-item";
                item.innerHTML = `
                    <img src="${link}" alt="image ${currentIndex}">
                    <button class="delete-button" data-index="${currentIndex}">Видалити</button>
                `;
                container.appendChild(item);
            }

            document.querySelectorAll(".delete-button").forEach((button) => {
                button.addEventListener("click", () => {
                    const index = button.getAttribute("data-index");
                    deleteLink(index);
                });
            });
        })
        .catch((error) => console.error("Error loading carousel:", error));
}

function showNext() {
    currentIndex = (currentIndex + 1) % linksCount;
    loadCarousel();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + linksCount) % linksCount;
    loadCarousel();
}

function setupButtons() {
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");

    nextButton.addEventListener("click", showNext);
    prevButton.addEventListener("click", showPrev);
}

function deleteLink(index) {
    fetch("delete_link.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index }),
    })
    .then(() => {
        currentIndex = 0; // Reset to first item after deletion
        loadCarousel();
    })
    .catch((error) => console.error("Error deleting link:", error));
}

window.onload = () => {
    setupButtons();
    loadCarousel();
};

setInterval(loadCarousel, 10000);
