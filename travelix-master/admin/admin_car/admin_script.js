const baseUrl = "http://localhost:8000/api/admin";

// Mode edit, jika true berarti form dalam mode edit
let isEditMode = false;
let editId = null;

// Load data on page load
document.addEventListener("DOMContentLoaded", loadAdmins);

// Handle form submission
document.getElementById("adminForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
        if (isEditMode) {
            // Jika dalam mode edit, tambahkan _method untuk PUT
            formData.append("_method", "PUT");

            const response = await fetch(`${baseUrl}/${editId}`, {
                method: "POST", // Laravel membaca _method untuk menentukan metode PUT
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Gagal mengupdate data!");
            }

            alert("Data berhasil diupdate!");
        } else {
            // Jika mode tambah
            const response = await fetch(baseUrl, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Gagal menambahkan data!");
            }

            alert("Data berhasil ditambahkan!");
        }

        e.target.reset();
        loadAdmins();
        isEditMode = false; // Reset mode edit
        editId = null; // Reset ID edit
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
});

// Load admin data
async function loadAdmins() {
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();

        const tableBody = document.querySelector("#adminTable tbody");
        tableBody.innerHTML = ""; // Clear table

        data.forEach((admin) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${admin.id}</td>
                <td>${admin.nama_mobil}</td>
                <td>${admin.description}</td>
                <td>${admin.harga}</td>
                <td>${admin.boking}</td>
                <td><img src="http://127.0.0.1:8000/storage/${admin.image}" alt="Gambar" style="max-width: 100px;"></td>

                <td>
                    <button onclick="deleteAdmin(${admin.id})">Hapus</button>
                    <button onclick="editAdmin(${admin.id})">Edit</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Gagal memuat data:", error);
    }
}

// Delete admin data
async function deleteAdmin(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Gagal menghapus data!");
        }

        alert("Data berhasil dihapus!");
        loadAdmins();
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}

// Edit admin data
async function editAdmin(id) {
    try {
        const response = await fetch(`${baseUrl}/${id}`);
        const admin = await response.json();

        // Isi form dengan data admin yang dipilih
        document.getElementById("nama_mobil").value = admin.nama_mobil;
        document.getElementById("description").value = admin.description;
        document.getElementById("harga").value = admin.harga;
        document.getElementById("boking").value = admin.boking;

        // Set form ke mode edit
        isEditMode = true;
        editId = admin.id;
    } catch (error) {
        console.error("Gagal memuat data untuk edit:", error);
    }
}
