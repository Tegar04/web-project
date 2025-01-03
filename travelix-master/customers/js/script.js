// Event listener untuk form login
document.querySelector('#login-form form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    console.log('Attempting login with:', { email, password }); // Debug log

    try {
        const response = await fetch('http://127.0.0.1:8000/api/customers/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        console.log('Response status:', response.status); // Debug log

        if (!response.ok) {
            const errorData = await response.text(); // Debug log
            console.error('Error response:', errorData);
            throw new Error(errorData);
        }

        const data = await response.json(); // Parse JSON jika respons valid
        console.log('Login successful:', data); // Debug log
        alert(data.message); // Tampilkan pesan sukses
        localStorage.setItem('token', data.token); // Simpan token
        window.location.href = 'http://127.0.0.1:5500/travelix-master/index.html';
    } catch (error) {
        console.error('Login error:', error.message);
        alert('Login failed: ' + error.message);
    }
});



// Event listener untuk form registrasi
document.querySelector('#signup-form form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Kirim permintaan registrasi ke API backend
    const response = await fetch('http://127.0.0.1:8000/api/customers', {  // Update URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    // Jika registrasi berhasil, arahkan kembali ke form login
    if (response.ok) {
        alert('Account created successfully');
        toggleForm(); // Pindah ke form login
    } else {
        alert(data.error || 'Registration failed');
    }
});

// Fungsi untuk toggle antara form login dan registrasi
function toggleForm() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    loginForm.classList.toggle('active');
    signupForm.classList.toggle('active');
}
