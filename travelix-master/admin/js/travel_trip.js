// Dummy data storage
let offers = [
    {
      id: 1,
      name: "Bali Adventure",
      description: "Explore the beautiful beaches of Bali.",
      price: "500",
      image: "https://via.placeholder.com/100"
    },
    {
      id: 2,
      name: "Yogyakarta Cultural Trip",
      description: "Visit historical temples and enjoy Javanese culture.",
      price: "300",
      image: "https://via.placeholder.com/100"
    }
  ];
  
  // Function to render offers in the table
  function renderOffers() {
    const offerTable = document.getElementById("offerTable");
    offerTable.innerHTML = "";
  
    offers.forEach((offer, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${offer.name}</td>
        <td>${offer.description}</td>
        <td>${offer.price}</td>
        <td><img src="${offer.image}" alt="${offer.name}" width="50"></td>
        <td>
          <button class="btn" onclick="editOffer(${offer.id})">Edit</button>
          <button class="btn btn-secondary" onclick="deleteOffer(${offer.id})">Delete</button>
        </td>
      `;
      offerTable.appendChild(row);
    });
  }
  
  // Function to delete an offer
  function deleteOffer(id) {
    offers = offers.filter(offer => offer.id !== id);
    renderOffers();
  }
  
  // Function to edit an offer (dummy example)
  function editOffer(id) {
    const offer = offers.find(offer => offer.id === id);
    const newName = prompt("Enter new name", offer.name);
    const newDescription = prompt("Enter new description", offer.description);
    const newPrice = prompt("Enter new price", offer.price);
    const newImage = prompt("Enter new image URL", offer.image);
  
    if (newName && newDescription && newPrice && newImage) {
      offer.name = newName;
      offer.description = newDescription;
      offer.price = newPrice;
      offer.image = newImage;
      renderOffers();
    }
  }
  
  // Initial render
  renderOffers();
  