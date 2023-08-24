//task10
document.addEventListener("DOMContentLoaded", function() {
  var simulateMobileButton = document.getElementById('simulateMobileButton');
  var myForm = document.getElementById('myForm');

  simulateMobileButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevents the form from submitting
  
      const width = 375; // Mobile viewport width in pixels
      const height = 812; // Mobile viewport height in pixels
  
      // Open a new window with the desired size
      const mobileWindow = window.open("", "_blank", `width=${width},height=${height}`);
      
      // Load your website in the new window
      mobileWindow.location.href = "./index.html";  
      
    });
  });

  //task12
const myElement = document.querySelector('#bregister');

myElement.addEventListener('mouseenter', () => {
  myElement.classList.add('hover-effect');
});

myElement.addEventListener('mouseleave', () => {
  myElement.classList.remove('hover-effect');
});