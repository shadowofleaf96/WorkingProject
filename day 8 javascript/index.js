// This is a way to delay the execution of JavaScript code until the web page is ready for manipulation.
document.addEventListener("DOMContentLoaded", function () {
  // Slideshow (Carousel) Variables
  const $items = document.querySelectorAll(".diy-slideshow figure");
  const numItems = $items.length;
  const intervalTime = 5000; // Time in milliseconds between auto-slides
  let counter = 0; // Keeps track of the current slide index

  // Slideshow (Carousel) Functions
  const showCurrent = () => {
    const itemToShow = Math.abs(counter % numItems);
    $items.forEach((el) => el.classList.remove("show"));
    $items[itemToShow].classList.add("show");
  };

  const nextSlide = () => {
    counter++;
    showCurrent();
  };

  const startAutoSlide = () => {
    setInterval(nextSlide, intervalTime);
  };

  // Event Listeners for Next and Previous Buttons in Slideshow (Carousel)
  document.querySelector(".next").addEventListener("click", nextSlide, false);
  document.querySelector(".prev").addEventListener("click", () => {
    counter--;
    showCurrent();
  });

  // Shopping Cart Variables
  let totalCount = 0;
  const cartCounter = document.getElementById("cart-counter");
  const cartItems = {}; // Object to store cart items

  // Function to update the cart count and display
  const updateCartCount = () => {
    totalCount = 0;
    for (const productId in cartItems) {
      if (cartItems.hasOwnProperty(productId)) {
        totalCount += cartItems[productId].quantity;
      }
    }
    cartCounter.textContent = totalCount;
    cartCounter.style.display = totalCount >= 0 ? "flex" : "none";
  };

  // Function to add a product to the cart
  const addToCart = (productId) => {
    const product = document.querySelector(`[data-product-id="${productId}"]`);
    const productName = product.querySelector("h4").textContent;
    const productImage = product.querySelector(".img2").src;
    const productPrice = product.querySelector(".product-price").textContent;

    if (!cartItems[productId]) {
      cartItems[productId] = {
        name: productName,
        image: productImage,
        price: productPrice,
        quantity: 1,
      };
    } else {
      cartItems[productId].quantity++;
    }
    updateCartCount();
    populateCart();
  };

  // Event Listeners for Adding Products to Cart
  const emptyCart = document.getElementById("emptyCart");
  const addToCartButtons = document.querySelectorAll(".buybuttons");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      emptyCart.classList.add("hidden");
      const productId = event.currentTarget.getAttribute("data-product-id");
      addToCart(productId);
    });
  });

  // Shopping Cart Display and Interaction Functions
  const cartClick = document.getElementById("cart");
  const shoppingCart = document.getElementById("shopping-cart");
  var isHidden = true;
  var isAnimating = false; // Flag to track if an animation is in progress

  cartClick.addEventListener("click", () => {
    if (isHidden) {
      if (isAnimating) {
        return; // If an animation is already in progress, do nothing
      }
      isAnimating = true; // Set the flag to indicate that an animation is starting
      shoppingCart.classList.remove("animate__fadeOut");
      shoppingCart.classList.add("animate__fadeIn");
      shoppingCart.classList.remove("hidden");
    } else {
      hideSideBar();
    }

    isHidden = !isHidden;
  });

  // Not the best solution for continue shopping, need refactor
  const continueShop = document.querySelector("#continuebut");
  continueShop.addEventListener("click", () => {
    if (isHidden) {
      if (isAnimating) {
        return; // If an animation is already in progress, do nothing
      }
    } else {
      hideSideBar();
    }

    isHidden = !isHidden;
  });

  // Event listener to hide the sideBar when clicking outside the noSideBar area
  const sideBar = document.querySelector(".sideBar");
  const noSideBar = document.querySelector(".notTheSidebar");
  noSideBar.addEventListener("click", (event) => {
    const mouseX = event.clientX - noSideBar.getBoundingClientRect().left;
    const mouseY = event.clientY - noSideBar.getBoundingClientRect().top;

    // Check if the click is within the sideBar element
    if (
      mouseX < sideBar.offsetLeft ||
      mouseX > sideBar.offsetLeft + sideBar.offsetWidth ||
      mouseY < sideBar.offsetTop ||
      mouseY > sideBar.offsetTop + sideBar.offsetHeight
    ) {
      if (isHidden) {
        if (isAnimating) {
          return; // If an animation is already in progress, do nothing
        }
      } else {
        hideSideBar();
      }

      isHidden = !isHidden;
    }
  });

  // Function to hide the sideBar
  function hideSideBar() {
    shoppingCart.classList.add("animate__fadeOut");
    setTimeout(() => {
      shoppingCart.classList.remove("animate__fadeIn");
      shoppingCart.classList.add("hidden");
      isAnimating = false; // Reset the flag when the animation is complete
    }, 1000); // Adjust the delay (in milliseconds) to match the transition duration
  }

  // Function to calculate the total price for a product
  const calculateTotalPrice = (product) => {
    const priceParts = product.price.split(" ");
    const price = parseFloat(priceParts[0]);
    return price * product.quantity + " DH";
  };

  // Function to populate the shopping cart
  let subTotalPrice = document.getElementById("subTotal");
  const populateCart = () => {
    const cartContent = document.querySelector(".cart-content");
    cartContent.innerHTML = "";
    let totalPriceForAllItems = 0;

    for (const productId in cartItems) {
      if (cartItems.hasOwnProperty(productId)) {
        const product = cartItems[productId];
        const cartItem = document.createElement("div");
        cartItem.classList.add(
          "cartItem",
          "flex",
          "items-center",
          "justify-between",
          "mb-2",
          "border",
          "border-gray-300",
          "p-2"
        );

        const productImageContainer = document.createElement("div");
        productImageContainer.classList.add(
          "w-24",
          "h-24",
          "bg-opacity-50",
          "bg-gray-200",
          "mr-4",
          "overflow-hidden"
        );

        const productImage = document.createElement("img");
        productImage.classList.add("w-full", "h-full", "object-cover");
        productImage.src = product.image;
        productImage.alt = product.name;

        productImageContainer.appendChild(productImage);

        const productInfo = document.createElement("div");
        productInfo.classList.add(
          "flex-1",
          "flex-wrap",
          "justify-between",
          "flex-row"
        );

        const productName = document.createElement("p");
        productName.classList.add(
          "text-gray-900",
          "text-xl",
          "font-semibold",
          "mb-1"
        );
        productName.textContent = product.name;

        const productPrice = document.createElement("p");
        productPrice.classList.add("text-gray-700", "text-lg");
        const priceproduct = product.price.split(" ")[0];
        productPrice.textContent = priceproduct + " DH";

        // Calculate the total price using the calculateTotalPrice function
        const totalPrice = document.createElement("p");
        totalPrice.classList.add("text-gray-700", "text-lg");
        totalPrice.textContent = "Total is " + calculateTotalPrice(product);

        const quantityControl = document.createElement("div");
        quantityControl.classList.add("flex", "items-center", "space-x-2");

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.classList.add(
          "text-white",
          "bg-black",
          "w-8",
          "rounded-full",
          "text-lg",
          "focus:outline-none"
        );
        decreaseButton.addEventListener("click", () => {
          // Decrease the quantity
          if (product.quantity > 1) {
            product.quantity--;
            updateCartCount(); // Update cart count in the navbar
            populateCart(); // Update the cart display
          }
        });

        const quantityDisplay = document.createElement("span");
        quantityDisplay.textContent = product.quantity;

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.classList.add(
          "text-white",
          "bg-black",
          "w-8",
          "rounded-full",
          "text-lg",
          "focus:outline-none"
        );
        increaseButton.addEventListener("click", () => {
          // Increase the quantity
          product.quantity++;
          updateCartCount(); // Update cart count in the navbar
          populateCart(); // Update the cart display
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "";
        removeButton.classList.add(
          "remove-button",
          "fa-solid",
          "fa-trash",
          "fa-2xs",
          "text-white",
          "bg-black",
          "w-8",
          "rounded-full",
          "text-lg",
          "focus:outline-none"
        );
        removeButton.addEventListener("click", () => {
          removeCartItem(productId);
        });

        const likeButton = document.createElement("button");
        likeButton.textContent = "";
        likeButton.classList.add(
          "like-button",
          "fa-solid",
          "fa-thumbs-up",
          "fa-2xs",
          "text-white",
          "bg-black",
          "w-8",
          "rounded-full",
          "text-lg",
          "focus:outline-none"
        );
        likeButton.addEventListener("click", () => {
          showToastMessage("Item added to wishlist", cartContent);
        });

        const totalProductPrice = calculateTotalPrice(product);
        totalPriceForAllItems += parseFloat(totalProductPrice.split(" ")[0]);
        subTotalPrice.textContent = totalPriceForAllItems + " DH";

        quantityControl.appendChild(decreaseButton);
        quantityControl.appendChild(quantityDisplay);
        quantityControl.appendChild(increaseButton);
        quantityControl.appendChild(likeButton);
        quantityControl.appendChild(removeButton);

        // Add elements to product info
        productInfo.appendChild(productName); // Add name to product info
        productInfo.appendChild(productPrice); // Add price to product info
        productInfo.appendChild(totalPrice); // Add total price to product info
        productInfo.appendChild(quantityControl); // Add quantity

        // Append elements to cartItem
        cartItem.appendChild(productImageContainer); // Add image to product info
        cartItem.appendChild(productInfo); // add this (name, price, total price, quantity) to SC

        cartContent.appendChild(cartItem);
      }
    }
  };

  // Function to remove a cart item
  const removeCartItem = (productId) => {
    if (cartItems.hasOwnProperty(productId)) {
      delete cartItems[productId];
      updateCartCount();
      populateCart();
      if (totalCount === 0) {
        emptyCart.classList.remove("hidden");
        subTotalPrice.textContent = "Nothing for Now";
      }
    } else {
      console.error(`Product with ID ${productId} not found in cartItems.`);
    }
  };

  // Function to show a toast message
  const showToastMessage = (message, container) => {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      container.removeChild(toast);
    }, 3000);
  };

  // Event listener to populate the cart when cart icon is clicked
  cartClick.addEventListener("click", populateCart);

  // Product Card "Add to Cart" Interaction
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const button = card.querySelector("button");
    card.addEventListener("mouseenter", () => {
      button.style.display = "flex";
    });
    card.addEventListener("mouseleave", () => {
      button.style.display = "none";
    });
  });

  // Start auto-sliding for the slideshow
  startAutoSlide();
});
