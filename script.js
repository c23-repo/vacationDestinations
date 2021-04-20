// Listen to the form being submitted
document
  .querySelector("#destination_form_info")
  .addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  let destination = event.target.elements["destination"].value;
  let destinationLocation = event.target.elements["location"].value;
  let destinationPhoto = await getPhoto(destination);
  let destinationDescription = event.target.elements["description"].value;
  resetValues(event.target);

  let destCard = newCard(
    destination,
    destinationLocation,
    destinationPhoto,
    destinationDescription
  );

  document.querySelector("#destinations_container").appendChild(destCard);
}

function resetValues(form) {
  for (let i = 0; i < form.length; i++) {
    form.elements[i].value = "";
  }
}

function newCard(name, location, destPhoto, description) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.margin = "30px;";
  card.style.maxWidth = "285px";
  card.style.height = "auto";

  let img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
//   img.setAttribute("alt", name);

  let defaultPhoto =
    "https://www.thetravelmagazine.net/wp-content/uploads/World-Wonders-Tour-Image.jpg";
  console.log(destPhoto);
    if (destPhoto.length === 0) {
    img.setAttribute("src", defaultPhoto);
  } else {
    img.setAttribute("src", destPhoto[0].urls.thumb);
    img.setAttribute("alt", destPhoto[0].alt_description);
  }

  card.appendChild(img);

  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  let cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerText = name;
  cardBody.appendChild(cardTitle);

  let cardSubtitle = document.createElement("h6");
  cardSubtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
  cardSubtitle.innerText = location;
  cardBody.appendChild(cardSubtitle);

  if (description.length !== 0) {
    let cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.innerText = description;
    cardBody.appendChild(cardText);
  }
  let btnContainer = document.createElement("div");
  btnContainer.setAttribute("class", "buttons_container");

  let pencil = document.createElement("i");
  pencil.setAttribute("class", "fa fa-pencil");

  let editBtn = document.createElement("button");
  editBtn.setAttribute("class", "btn btn-warning");
  editBtn.innerHTML = 
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", editDestination);

  let trashCan = document.createElement("i");
  trashCan.setAttribute("class", "fa fa-trash");

  let cardDeleteBtn = document.createElement("button");
  cardDeleteBtn.setAttribute("class", "btn btn-danger");
  cardDeleteBtn.innerHTML = trashCan;
  cardDeleteBtn.innerText = "Remove";
  cardDeleteBtn.addEventListener("click", removeDestination);

  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(cardDeleteBtn);

  cardBody.appendChild(btnContainer);
  card.appendChild(cardBody);

  return card;
}

async function getPhoto(photoAPI) {

    const API = `https://api.unsplash.com/search/photos?client_id=QiAbgK4EJjPfix06c1wlbBOeuebzOBzO11FEDN5f9ik&page=1&query=${photoAPI}&per_page=1`;
    try {
        const res = await fetch(API);
        const jsonData = await res.json();

        return jsonData.results
    } catch (error) {
        console.log(error);
    }
}

function editDestination(event) {
  let cardBody = event.target.parentElement.parentElement;
  let title = cardBody.children[0];
  let subTitle = cardBody.children[1];

  let card = cardBody.parentElement;
  let destPhoto = card.children[0];

  let newTitle = window.prompt("Enter new name");
  let newSubtitle = window.prompt("Enter new location");
  let newPhotoUrl = window.prompt("Enter new photo url");

  if (newTitle.length > 0) {
    title.innerText = newTitle;
  }

  if (newSubtitle.length > 0) {
    subTitle.innerText = newSubtitle;
  }

  if (newPhotoUrl.length > 0) {
    destPhoto.setAttribute("src", newPhotoUrl);
  }
}

function removeDestination(event) {
  let cardBody = event.target.parentElement.parentElement;
  let card = cardBody.parentElement;
  card.remove();
}

// ?client_id=YOUR_ACCESS_KEY

//  &page=1&query=office