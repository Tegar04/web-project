const baseUrl = "http://localhost:8000/api/aboutus";

// Load About Us data on page load
document.addEventListener("DOMContentLoaded", loadAboutUs);

async function loadAboutUs() {
    try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const aboutUsData = await response.json();
        const introContainer = document.querySelector("#about_us");
        introContainer.innerHTML = ""; // Clear existing content

        if (aboutUsData.length === 0) {
            introContainer.innerHTML = "<p>No data available</p>";
            return;
        }

        aboutUsData.forEach((item, index) => {
            const aboutUsCard = document.createElement("div");
            aboutUsCard.classList.add("about_us_card");

            aboutUsCard.innerHTML = `
                <div class="about_us_card_header">
                    <h3>${item.title}</h3>
                </div>
                <div class="about_us_card_body">
                    <p>${item.description}</p>
                </div>
            `;

            introContainer.appendChild(aboutUsCard);
        });
    } catch (error) {
        console.error("Failed to load About Us data:", error);
        const introContainer = document.querySelector("#about_us");
        introContainer.innerHTML = "<p>Failed to load data. Please try again later.</p>";
    }
}
