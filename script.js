//! Variables
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//! Unsplash API
const count = 30;
const apiKey = "E--7baf96yGUEv11a7mbsdPNVcSEYhoM-RDqX-Q5bgI";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//!Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // console.log("ready =", ready);
  }
}

//! Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//! Create Elements For Links and photos, add to DOM
const displayPhotos = () => {
  totalImages = photosArray.length;
  console.log("total images", totalImages);

  //!Run function for each object in the photosArray
  photosArray.forEach((photo) => {
    //!Create <a> to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //!create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //! Even Listener, check when eachis finished loading
    img.addEventListener("load", imageLoaded);

    //!Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

//! Get photos from unsplash API
async function getPhotos() {
  try {
    //! get photos
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    //! console.log(photosArray);
    displayPhotos();
  } catch (error) {
    //! catch error here
  }
}

//
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//! On Load
getPhotos();
