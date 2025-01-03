// File: /travelix-master/admin/js/detail_car_table.js

const adminBaseUrl = "http://localhost:8000/api/admin"; // Changed variable name

// Fungsi untuk mengambil detail mobil berdasarkan ID
async function loadCarDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get("id"); // Ambil ID dari URL

    if (!carId) {
        console.error("Car ID not found in URL");
        return;
    }

    try {
        const response = await fetch(`${adminBaseUrl}/${carId}`); // Gunakan variable baru di sini
        const car = await response.json();

        const carDetailsContainer = document.querySelector("#carListTable");
        carDetailsContainer.innerHTML = ""; // Kosongkan container

        const carDetail = document.createElement("div");
        carDetail.classList.add("single_listing");

        // Tambahkan tombol "Pesan" dan link ke invoice dengan ID mobil
        carDetail.innerHTML = `
            <div class="hotel_info">
                <div class="hotel_title_container d-flex flex-lg-row flex-column">
                    <div class="hotel_title_content">
                        <h1 class="hotel_title">${car.nama_mobil}</h1>
                        <div class="rating_r rating_r_4 hotel_rating">
                            ${'★'.repeat(car.rating || 5)}
                        </div>
                        <div class="hotel_location">${car.lokasi || 'Location not provided'}</div>
                    </div>
                    <div class="hotel_title_button ml-lg-auto text-lg-right">
                        <div class="button book_button trans_200">
                            <!-- Link ke invoice.html dengan ID mobil -->
                            <a href="invoice/invoice.html?id=${car.id}">Pesan<span></span><span></span><span></span></a>
                        </div>
                        <div class="hotel_map_link_container">
                            <div class="hotel_map_link">See Location on Map</div>
                        </div>
                    </div>
                </div>

                <div class="hotel_image">
                    <img src="http://127.0.0.1:8000/storage/${car.image}" alt="${car.nama_mobil}">
                    <div class="hotel_review_container d-flex flex-column align-items-center justify-content-center">
                        <div class="hotel_review">
                            <div class="hotel_review_content">
                                <div class="hotel_review_title">${car.review_title || 'Very good'}</div>
                                <div class="hotel_review_subtitle">${car.reviews_count || 100} reviews</div>
                            </div>
                            <div class="hotel_review_rating text-center">${car.rating || 8.1}</div>
                        </div>
                    </div>
                </div>

                <div class="hotel_info_text">
                    <p>${car.description || 'No description available.'}</p>
                </div>
            </div>
        `;

        carDetailsContainer.appendChild(carDetail);
    } catch (error) {
        console.error("Failed to load car details:", error);
    }
}

// Muat detail mobil saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadCarDetails);
