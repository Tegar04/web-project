const apiUrl = 'http://localhost:8000/api/aboutus';
const aboutUsList = document.getElementById('aboutUsList');
const aboutUsForm = document.getElementById('aboutUsForm');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const aboutUsIdInput = document.getElementById('aboutUsId');

// Fetch and display all About Us entries
async function fetchAboutUs() {
    const response = await fetch(apiUrl);
    const aboutUsData = await response.json();

    aboutUsList.innerHTML = '';
    aboutUsData.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>
                <strong>${item.title}</strong>: ${item.description}
            </span>
            <span>
                <button onclick="editAboutUs(${item.id}, '${item.title}', '${item.description}')">Edit</button>
                <button onclick="deleteAboutUs(${item.id})">Delete</button>
            </span>
        `;
        aboutUsList.appendChild(li);
    });
}

// Add or update About Us
aboutUsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = aboutUsIdInput.value;
    const title = titleInput.value;
    const description = descriptionInput.value;

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
    });

    aboutUsForm.reset();
    aboutUsIdInput.value = '';
    fetchAboutUs();
});

// Edit About Us
function editAboutUs(id, title, description) {
    aboutUsIdInput.value = id;
    titleInput.value = title;
    descriptionInput.value = description;
}

// Delete About Us
async function deleteAboutUs(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchAboutUs();
}

// Initial load
fetchAboutUs();
