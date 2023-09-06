// This is for the SlideShow(Carousel) //

document.addEventListener("DOMContentLoaded", function () {
  (function () {
    var counter = 0, // to keep track of current slide
      $items = document.querySelectorAll(".diy-slideshow figure"), // a collection of all of the slides, caching for performance
      numItems = $items.length, // total number of slides
      intervalTime = 5000; // time in milliseconds between auto-slides (adjust as needed)

    // this function is what cycles the slides, showing the next or previous slide and hiding all the others
    var showCurrent = function () {
      var itemToShow = Math.abs(counter % numItems); // uses remainder (aka modulo) operator to get the actual index of the element to show

      // remove .show from whichever element currently has it
      [].forEach.call($items, function (el) {
        el.classList.remove("show");
      });

      // add .show to the one item that's supposed to have it
      $items[itemToShow].classList.add("show");
    };

    // Function to advance to the next slide
    var nextSlide = function () {
      counter++;
      showCurrent();
    };

    // Function to start auto-sliding
    var startAutoSlide = function () {
      setInterval(nextSlide, intervalTime);
    };

    // add click events to prev & next buttons
    document.querySelector(".next").addEventListener(
      "click",
      function () {
        nextSlide();
      },
      false
    );

    document.querySelector(".prev").addEventListener(
      "click",
      function () {
        counter--;
        showCurrent();
      },
      false
    );

    // This is for the Shopping Cart logic //

    let cartCount = 0;
    const cartButton = document.getElementById("cart");
    const cartCounter = document.getElementById("cart-counter");
    const cartItems = {}; // Object to store cart items

    // Function to update the cart count and display
    function updateCartCount() {
      cartCounter.textContent = cartCount;

      // Show the cart counter when there are items in the cart
      if (cartCount > 0) {
        cartCounter.style.display = "inline-block";
      } else {
        cartCounter.style.display = "none";
      }
    }

    // Function to add a product to the cart
    function addToCart(productId) {
      cartCount++; // Increase cart count
      updateCartCount();

      // Retrieve product details using data attributes
      const product = document.querySelector(
        `[data-product-id="${productId}"]`
      );
      const productName = product.querySelector("h4").textContent;
      const productImage = product.querySelector("img").src;
      const productPrice = product.querySelector(".product-price").textContent;

      // Add the product to the cartItems object
      if (!cartItems[productId]) {
        cartItems[productId] = {
          name: productName,
          image: productImage,
          price: productPrice,
          quantity: 1, // Start with a quantity of 1
          clicks: 1, // Start with 1 click
        };
      } else {
        // Increment quantity and clicks if the product is already in the cart
        cartItems[productId].quantity++;
        cartItems[productId].clicks++;
      }

      // You can now access the cartItems object to manage the cart contents
      console.log(cartItems);
    }

    // Add click event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".fig");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.getAttribute("data-product-id");
        addToCart(productId);
      });
    });

    const addToCartSButtons = document.querySelectorAll(".product-card");
    addToCartSButtons.forEach((button2) => {
      button2.addEventListener("click", (event) => {
        const productId = event.target.getAttribute("data-product-id");
        addToCart(productId);
      });
    });

    // Create logic for Shopping Cart page //
    
    const carthover = document.getElementById("cart");
    const elementToToggle = document.getElementById("shopping-cart");
    let isHidden = true;
    
    carthover.addEventListener("click", () => {
      if (isHidden) {
        elementToToggle.classList.remove('hidden');
        document.getElementById("notHeader").style.backgroundColor = "#000000";
        document.getElementById("notHeader").style.opacity = "0.3";
      } else {
        elementToToggle.classList.add('hidden');
        document.getElementById("notHeader").style.backgroundColor = "#FFFFFF";
        document.getElementById("notHeader").style.opacity = "1.0";
      }
    
      // Toggle the visibility state
      isHidden = !isHidden;
    });

    // This is for the hide/display logic of buybuttons in Product card //

    // Get all elements with the class "product-card"
    const productCards = document.querySelectorAll(".product-card");

    // Loop through each product card
    productCards.forEach((card) => {
      // Find the button element within the card
      const button = card.querySelector("button");

      // Add a "mouseenter" event listener to show the button
      card.addEventListener("mouseenter", () => {
        button.style.display = "flex";
      });

      // Add a "mouseleave" event listener to hide the button
      card.addEventListener("mouseleave", () => {
        button.style.display = "none";
      });
    });

    // Start auto-sliding when the DOM is ready
    startAutoSlide();
  })();
});
