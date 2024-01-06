const menuIcon = document.querySelector(".menu-icon img");
const navigation = document.querySelector(".nav-lists-primary");

//variables for secondary primary products
const sliderProductsPrimary = document.querySelector(".slider-products");
const sliderProductsPrimaryImages =
  sliderProductsPrimary.querySelectorAll("img");
const selectedImagePrimary = document.querySelector(".primary-product img");

const previous = document.querySelector(".previous-icon");
const next = document.querySelector(".next-icon");

selectedImagePrimary.addEventListener("click", () => {
  document.querySelector(".popup").classList.add("active");
  document.querySelector(".close-btn").addEventListener("click", () => {
    if (document.querySelector(".popup").classList.contains("active")) {
      document.querySelector(".popup").classList.remove("active");
    }
  });
});
//variables for secondary slider products popup
const sliderProductsSecondary = document.querySelector(
  ".slider-products-popup"
);
const sliderProductsImages = sliderProductsSecondary.querySelectorAll("img");
const selectedImage = document.querySelector(".primary-product-popup-image");

//Menu icon toggle to show and hide the navigation menu
menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  navigation.classList.toggle("open");
});

function changePrimaryImages() {
  sliderProductsPrimaryImages.forEach((image) => {
    image.addEventListener("click", () => {
      const result = image.getAttribute("src");
      selectedImagePrimary.src = result;

      // Remove 'active' class from all images
      sliderProductsPrimaryImages.forEach((img) =>
        img.classList.remove("active")
      );

      // Add 'active' class to the clicked image
      image.classList.add("active");
    });
  });
}
function changeSecondaryImages() {
  sliderProductsImages.forEach((image) => {
    image.addEventListener("click", () => {
      const result = image.getAttribute("src");
      selectedImage.src = result;

      // Remove 'active' class from all images
      sliderProductsImages.forEach((img) => img.classList.remove("active"));

      // Add 'active' class to the clicked image
      image.classList.add("active");
    });
  });
}

// Change images on click
function changePopupImages() {
  function nextImage() {
    const currentImage = document.querySelector(".primary-product-popup-image");
    const currentIndex = Array.from(sliderProductsImages).indexOf(
      document.querySelector(".slider-products-popup img.active")
    );
    const nextIndex = (currentIndex + 1) % sliderProductsImages.length;

    // Remove 'active' class from the current image in both sliders
    document
      .querySelector(".slider-products-popup img.active")
      .classList.remove("active");
    currentImage.classList.remove("active");

    // Add 'active' class to the next image in both sliders
    sliderProductsImages[nextIndex].classList.add("active");
    selectedImage.src = sliderProductsImages[nextIndex].src;
  }

  function previousImage() {
    const currentImage = document.querySelector(".primary-product-popup-image");
    const currentIndex = Array.from(sliderProductsImages).indexOf(
      document.querySelector(".slider-products-popup img.active")
    );
    const previousIndex =
      (currentIndex - 1 + sliderProductsImages.length) %
      sliderProductsImages.length;

    // Remove 'active' class from the current image in both sliders
    document
      .querySelector(".slider-products-popup img.active")
      .classList.remove("active");
    currentImage.classList.remove("active");

    // Add 'active' class to the previous image in both sliders
    sliderProductsImages[previousIndex].classList.add("active");
    selectedImage.src = sliderProductsImages[previousIndex].src;
  }

  next.addEventListener("click", nextImage);
  previous.addEventListener("click", previousImage);
}

changePopupImages();
let count = 0;

function addItemsToCart() {
  document.querySelector(".add").style.cursor = "pointer";
  document.querySelector(".minus").style.cursor = "pointer";

  document.querySelector(".add").addEventListener("click", () => {
    document.querySelector(".amount").textContent = count += 1;
  });
  document.querySelector(".minus").addEventListener("click", () => {
    if (count <= 0) {
      document.querySelector(".amount").textContent = 0;
    } else {
      document.querySelector(".amount").textContent = count -= 1;
    }
  });
  document.getElementById("add-to-cart").addEventListener("click", () => {
    document.querySelector(".cart-count span").textContent =
      document.querySelector(".amount").textContent;
      document.querySelector(".payout-total").textContent =
      "$" + 125 * document.querySelector(".amount").textContent;
    document.querySelector(".cart-count").classList.add("open-cart");
  });
  document.querySelector(".cart-icon").addEventListener("click", () => {
    document
      .querySelector(".checkout-container")
      .classList.toggle("open-checkout-container");
    document.querySelector(".counted-items").textContent =
      document.querySelector(".amount").textContent;
  });
  document.querySelector(".checkout").addEventListener("click", () => {
    document
      .querySelector(".checkout-container")
      .classList.remove("open-checkout-container");
    alert("Your order will be processed once we integrate checkout!");
    document.querySelector(".cart-count").classList.remove("open-cart");
  });
}

//adding active class to the first image in the primary list
document.addEventListener("DOMContentLoaded", () => {
  const firstImagePrimary = sliderProductsPrimaryImages[0];
  if (firstImagePrimary) {
    firstImagePrimary.classList.add("active");
  }
});
//adding active class to the first image in the secondary popup list
document.addEventListener("DOMContentLoaded", () => {
  const firstImageSecondary = sliderProductsImages[0]; //access the first element of that NodeList
  firstImageSecondary.classList.add("active");
});

changePrimaryImages();
changeSecondaryImages();
addItemsToCart();
