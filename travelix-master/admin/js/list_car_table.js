const baseUrl = "http://localhost:8000/api/admin";

// Fungsi untuk memuat daftar mobil
async function loadCarList() {
    try {
        const response = await fetch(baseUrl);
        const cars = await response.json();

        const carListContainer = document.querySelector("#carListTable");
        carListContainer.innerHTML = ""; // Bersihkan container

        cars.forEach((car) => {
            const carItem = document.createElement("div");
            carItem.classList.add("col-lg-4", "intro_col");

            carItem.innerHTML = `
                <div class="intro_item">
                    <div class="intro_item_overlay"></div>
                    <div class="intro_item_background" style="background-image:url(http://127.0.0.1:8000/storage/${car.image})"></div>
                    <div class="intro_item_content d-flex flex-column align-items-center justify-content-center">
                        <div class="intro_date">${car.description}</div>
                        <div class="button intro_button">
                            <div class="button_bcg"></div>
                            <a href="single_listing.html?id=${car.id}" class="see-more">see more<span></span><span></span><span></span></a>
                        </div>
                        <div class="intro_center text-center">
                            <h1>${car.nama_mobil}</h1>
                            <div class="intro_price">From ${car.harga}</div>
                            <div class="rating rating_4">
                                ${'★'.repeat(5)}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            carListContainer.appendChild(carItem);
        });
    } catch (error) {
        console.error("Failed to load car data:", error);
    }
}

// Muat daftar mobil saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadCarList);
