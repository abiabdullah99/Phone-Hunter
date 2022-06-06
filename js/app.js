// Error Message
const error = document.getElementById("errorShow");
// SearchBar
const allPhones = () => {
  const searchText = document.getElementById("input-box");
  const searchValue = searchText.value;
  // Empty String
  document.getElementById("search-result").innerHTML = "";
  document.getElementById("phoneDetails").innerHTML = "";

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showPhones(data.data));
  searchText.value = "";
};

// Display Show Phone
const showPhones = (phone) => {
  // first 20 Phone Show
  const first20Data = phone.slice(0, 20);
  // Error Handle
  if (first20Data == false) {
    error.innerText = "Phone is Not Found, Please Try Again";
  } else {
    for (const data of first20Data) {
      const searchResult = document.getElementById("search-result");
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
      <div class="card h-100">
           <img src="${data.image}" class="card-img-top w-50 mx-auto my-3" alt="...">
           <div class="card-body">
             <h5 class="card-title">${data.phone_name}</h5>
             <p class="card-text">Brand: ${data.brand}</p>
             <button onclick="phoneDetails('${data.slug}')" class="details-Btn">Details</button>
           </div>
         </div>
      `;
      searchResult.appendChild(div);
    }
    error.innerHTML = "";
  }
};

// Phone Details Part
const phoneDetails = (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
  document.getElementById("phoneDetails").innerHTML = "";
};

const displayPhoneDetails = (id) => {
  const phoneDetail = document.getElementById("phoneDetails");
  const div = document.createElement("div");
  div.innerHTML = `<img src="${id.image}" class="details-img" alt="...">
   <div class="card-body">
   <p class="card-text fs-4 textDesign">${id.name}</p>
     <p class="card-text textDesign"><span class="text-design">Release Date:</span> ${id.releaseDate ? id.releaseDate: 'Not Found'}</p>
     <p class="card-text textDesign"><span class="text-design">Storage:</span> ${id.mainFeatures.storage}</p>
     <p class="card-text textDesign"><span class="text-design">Display Size:</span> ${id.mainFeatures.displaySize}</p>
     <p class="card-text textDesign"><span class="text-design">Memory:</span> ${id.mainFeatures.memory}</p>
     <p class="card-text textDesign extra"><span class="text-design">Sensors:</span> ${id.mainFeatures.sensors}</p>
     <p class="card-text textDesign"><span class="text-design">Wlan:</span> ${id.others.WLAN}</p>
     <p class="card-text textDesign"><span class="text-design">GPS:</span> ${id.others.GPS}</p>
     <p class="card-text textDesign"><span class="text-design">Bluetooth:</span> ${id.others.Bluetooth}</p>
     <p class="card-text textDesign"><span class="text-design">Radio:</span> ${id.others.Radio}</p>
     <p class="card-text textDesign"><span class="text-design">Usb:</span> ${id.others.USB}</p>
     <p class="card-text textDesign"><span class="text-design">NFC:</span> ${id.others.NFC}</p>
   </div>`;
  phoneDetail.appendChild(div);
};
