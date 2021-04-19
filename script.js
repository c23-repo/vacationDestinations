// Listen to the form being submitted
document
  .querySelector("#destination_form_info")
  .addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  let destination = event.target.elements["destination"].value;
  let destinationLocation = event.target.elements["location"].value;
  let destinationPhoto = event.target.elements["photo"].value;
  let destinationDescription = event.target.elements["description"].value;
  resetValues(event.target);

  let destCard = newCard(
    destination,
    destinationLocation,
    destinationPhoto,
    destinationDescription
  );

  let listContainer = document.querySelector("#destinations_container");

  document.querySelector("#destinations_container").appendChild(destCard);
}

function resetValues(form) {

  for (let i = 0; i < form.length; i++) {
    form.elements[i].value = "";
  }
}

function newCard(name, location, photoUrl, description) {

  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.margin = "30px;";
  card.style.width = "18rem";
  card.style.height = "fit-content";

  let img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("alt", name);

  let defaultPhoto = "https://www.thetravelmagazine.net/wp-content/uploads/World-Wonders-Tour-Image.jpg";
  if (photoUrl.length === 0) {
    img.setAttribute("src", defaultPhoto);
  } else {
    img.setAttribute("src", photoUrl);
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
  card.appendChild(cardBody);

  return card;
}


