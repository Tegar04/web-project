<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function() {
    // Replace this URL with your CMS API endpoint
    const apiUrl = "https://your-cms-api-url.com/about";

    // Fetch data from CMS
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Set title and heading
            document.getElementById("about-title").innerText = data.title || "About Us";
            document.getElementById("about-heading").innerText = data.heading || "Our Story";

            // Set description/content
            document.getElementById("about-description").innerText = data.description || "Content not available.";

            // Set image
            document.getElementById("about-image").src = data.image_url || "https://via.placeholder.com/500";

            // Set statistics
            document.getElementById("stat1").innerText = data.stats?.experience || "0";
            document.getElementById("stat2").innerText = data.stats?.clients || "0";
            document.getElementById("stat3").innerText = data.stats?.projects || "0";
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("about-description").innerText = "Failed to load content.";
        });
});
=======
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
>>>>>>> 986a661f9a84dd0b8de8a7ab2915e494c1f91be0
