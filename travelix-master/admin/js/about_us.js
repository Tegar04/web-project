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
