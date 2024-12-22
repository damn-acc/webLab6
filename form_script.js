document.getElementById("addSlideForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const link = document.getElementById("imageUrl").value.trim();
    const statusMessage = document.getElementById("status-message");

    // Очистка статусного повідомлення
    statusMessage.textContent = "";

    // Перевірка, чи є посилання валідним URL
    try {
        new URL(link);
    } catch (e) {
        statusMessage.textContent = "Будь ласка, введіть валідний URL.";
        return;
    }

    fetch("save_links.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("HTTP помилка: " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            if (data.status === "success") {
                statusMessage.textContent = "Посилання додано!";
                document.getElementById("addSlideForm").reset();
            } else {
                statusMessage.textContent = "Помилка додавання.";
            }
        })
        .catch((error) => {
            console.error(error);
            statusMessage.textContent = "Помилка зв'язку із сервером.";
        });
});