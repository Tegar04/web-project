const baseUrl = "http://localhost:8000/api/admin";

// Load car list on page load
document.addEventListener("DOMContentLoaded", loadCarList);

async function loadCarList() {
    try {
        const response = await fetch(baseUrl);
        const cars = await response.json();

        const tableBody = document.querySelector("#carListTable");
        tableBody.innerHTML = ""; // Clear table

        cars.forEach((car, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${car.nama_mobil}</td>
                <td>${car.description}</td>
                <td>${car.harga}</td>
                <td>${car.boking}</td>
                <td><img src="http://127.0.0.1:8000/storage/${car.image}" alt="Car Image" style="max-width: 100px;"></td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Failed to load car data:", error);
    }
}
