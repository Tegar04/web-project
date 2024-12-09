document.addEventListener('DOMContentLoaded', () => {
    // Ambil nama file dari URL
    let currentPage = window.location.pathname.split("/").pop();
    if (!currentPage) currentPage = "index.html"; // Jika kosong, default ke index.html
    currentPage = currentPage.split(".")[0]; // Hapus ekstensi file

    // Cari semua tab
    const tabs = document.querySelectorAll('.search_tab');

    // Loop setiap tab dan tambahkan kelas 'active' ke tab yang sesuai
    tabs.forEach(tab => {
        if (tab.getAttribute('data-page') === currentPage) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
});
