const apiUrl = 'cms_api.php';

// Fetch sliders
function fetchSliders() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const sliderList = document.getElementById('slider-list');
            sliderList.innerHTML = '';
            data.forEach(slider => {
                sliderList.innerHTML += `
                    <div>
                        <img src="${slider.image_url}" alt="Slider Image" style="width:100px">
                        <h3>${slider.title}</h3>
                        <p>${slider.subtitle}</p>
                        <button onclick="editSlider(${slider.id}, '${slider.image_url}', '${slider.title}', '${slider.subtitle}')">Edit</button>
                        <button onclick="deleteSlider(${slider.id})">Delete</button>
                    </div>
                `;
            });
        });
}

// Save slider
document.getElementById('slider-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('slider-id').value;
    const imageUrl = document.getElementById('image_url').value;
    const title = document.getElementById('title').value;
    const subtitle = document.getElementById('subtitle').value;
    const method = id ? 'PUT' : 'POST';

    fetch(apiUrl, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, image_url: imageUrl, title, subtitle })
    }).then(() => {
        fetchSliders();
        document.getElementById('slider-form').reset();
    });
});

// Delete slider
function deleteSlider(id) {
    fetch(`${apiUrl}?id=${id}`, { method: 'DELETE' }).then(() => fetchSliders());
}

// Edit slider
function editSlider(id, imageUrl, title, subtitle) {
    document.getElementById('slider-id').value = id;
    document.getElementById('image_url').value = imageUrl;
    document.getElementById('title').value = title;
    document.getElementById('subtitle').value = subtitle;
}

fetchSliders();
