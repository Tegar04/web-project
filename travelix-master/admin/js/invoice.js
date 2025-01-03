// URL API untuk mendapatkan data invoice
const apiUrl = "http://127.0.0.1:8000/api/invoice"; // Sesuaikan dengan endpoint API untuk data invoice

// Fungsi untuk memuat data invoice dan menampilkannya di tabel
async function loadInvoices() {
    try {
        const response = await fetch(apiUrl); // Memanggil API untuk mendapatkan daftar invoice
        const invoices = await response.json(); // Mengambil data invoice dalam format JSON

        const invoiceListContainer = document.getElementById("invoice-list"); // Mengakses tbody untuk menambahkan data

        // Kosongkan kontainer sebelum menambahkan data baru
        invoiceListContainer.innerHTML = "";

        // Iterasi melalui data invoice dan buat baris untuk setiap invoice
        invoices.forEach((invoice, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${invoice.id}</td>
                <td>${invoice.nama}</td>
                <td>${invoice.no_hp}</td>
                <td>${invoice.email}</td>
                <td>${invoice.address}</td>
                
            `;

            invoiceListContainer.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading invoices:", error);
    }
}

// Fungsi untuk menampilkan detail invoice berdasarkan ID
function viewInvoice(invoiceId) {
    // Redirect ke halaman detail invoice (sesuaikan URL sesuai kebutuhan)
    window.location.href = `invoice-detail.html?id=${invoiceId}`;
}

// Muat data invoice saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadInvoices);
