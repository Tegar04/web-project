// File 1: /travelix-master/invoice/invoice.js

const adminBaseUrl = "http://127.0.0.1:8000/api/admin"; // Base URL untuk API Anda

// Fungsi untuk memuat detail mobil berdasarkan ID
async function loadCarDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get("id"); // Ambil ID dari URL

    if (!carId) {
        console.error("Car ID not found in URL");
        return;
    }

    try {
        const response = await fetch(`${adminBaseUrl}/${carId}`); // Panggil API untuk mengambil detail mobil
        const car = await response.json();

        const carDetailsContainer = document.querySelector("#carListTable"); // Ubah selector ke elemen yang relevan
        carDetailsContainer.innerHTML = ""; // Kosongkan container

        // Menampilkan nama, deskripsi, dan harga mobil
        const carDetail = document.createElement("div");
        carDetail.classList.add("car-info");

        carDetail.innerHTML = `
            <h3>${car.nama_mobil}</h3>
            <p>${car.description}</p>
            <p>Price: $${car.harga}</p>
        `;

        carDetailsContainer.appendChild(carDetail);
    } catch (error) {
        console.error("Failed to load car details:", error);
    }
}

// File 1: /travelix-master/invoice/invoice.js

// Fungsi untuk mengirim data invoice ke backend
async function submitInvoice() {
    const clientName = document.getElementById("client-name").value;
    const clientMobile = document.getElementById("client-mobile").value;
    const clientEmail = document.getElementById("client-email").value;
    const clientAddress = document.getElementById("client-address").value;

    // Pastikan semua form field sudah diisi
    if (!clientName || !clientMobile || !clientEmail || !clientAddress) {
        alert("Please fill in all the fields.");
        return;
    }

    const invoiceData = {
        nama: clientName,
        no_hp: clientMobile,
        email: clientEmail,
        address: clientAddress
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/api/invoice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(invoiceData)
        });

        if (!response.ok) {
            throw new Error("Failed to submit invoice");
        }

        const result = await response.json();
        alert("Invoice submitted successfully!");

        // Reset the form
        document.getElementById("client-name").value = "";
        document.getElementById("client-mobile").value = "";
        document.getElementById("client-email").value = "";
        document.getElementById("client-address").value = "";

        // Redirect to the index.html page
        window.location.href = "/travelix-master/index.html"; // Ganti dengan path yang sesuai jika perlu
    } catch (error) {
        console.error("Error submitting invoice:", error);
        alert("Failed to submit invoice.");
    }
}

// Muat detail mobil saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadCarDetails);

// Event listener untuk tombol Submit Invoice
document.getElementById("submit-invoice").addEventListener("click", submitInvoice);
