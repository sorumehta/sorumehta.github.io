/*!
* Start Bootstrap - Landing Page v6.0.5 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


// Add buttons to all text-modify-hover divs
var elements = document.getElementsByClassName("modify-hover");

// Loop through the elements and add the button
for (var i = 0; i < elements.length; i++) {

	var button = document.createElement("button");
	button.textContent = "Regenerate";

  // var icon = document.createElement("i");
  // icon.classList.add("bi", "bi-bootstrap-reboot", "text-white", "h5");
  // button.appendChild(icon);

  //button.classList.add("btn", "rounded-circle", "btn-sm", "modify-hover-button");
  button.classList.add("btn", "btn-primary", "btn-sm", "modify-hover-button", "indigo-button");

	button.addEventListener("click", function() {

		// Blur the current contents and disable button
		this.parentElement.classList.add('content-blur');
		this.disabled = true;


		// Define the request URL
 		const url = '/demo_modify_content';

		// Define the request data
		const data = {
			'element_id': this.parentElement.getAttribute('element-id')
		};

		// Define the request options
		const options = {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};

		// Send the request and handle the response
		fetch(url, options)
			.then(response => response.json())
			.then(data => {
		  		for (const key in data) {
		  			el = document.getElementById(key);
		  			if (key.includes('img')) {
		  				el.src = data[key];
		  			} else {
		  				el.textContent = data[key];
		  			}
				}
				// unblur and enable button
				this.parentElement.classList.remove('content-blur');
				this.disabled = false;
			})
			.catch(error => {
		  		// Handle any errors
		  		console.error(error);
		  		// unblur and enable button
		  		this.parentElement.classList.remove('content-blur');
		  		this.disabled = false;
		});
  });

 	elements[i].appendChild(button);
}

// FAQs
const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));


const goLiveModal = new bootstrap.Modal(document.getElementById('goLiveModal'));
const productHuntModal = new bootstrap.Modal(document.getElementById('productHuntModal'));

function showDelayedProductHuntModal() {
	console.log("Trying to show pd modal");
  const activeModal = bootstrap.Modal.getInstance(document.querySelector('.modal.show'));
  if (activeModal) {
    // Another modal is already active, so wait and check again after 500ms
    setTimeout(function() {
      showDelayedProductHuntModal();
    }, 5000);
  } else {
    // No other modals are active, so show the new modal
    productHuntModal.show();
  }
}


function submitGoLiveSubscribeForm(event) {
    event.preventDefault();

    function displayMessage(elementId, className) {
        const element = document.getElementById(elementId);
        element.classList.remove(className);
        setTimeout(() => {
            element.classList.add(className);
        }, 5000);
    }
    console.log("Go Live Subscribing...");

    // Define the request URL
    const url = '/go_live_subscribe';

    const emailValue = document.getElementById("goLiveSubscribeEmailAddress").value;

    const emailRegex = new RegExp(/^\S+@\S+\.\S+$/);
    if(emailRegex.test(emailValue)) {
        console.log("Valid email address");
    } else {
        console.log("Invalid email address");
        displayMessage("goLiveErrorMessage", "d-none");
        return;
    }

    // Define the request data
    const data = {
        'email_address': emailValue
    };

    // Define the request options
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

		
    // Send the request and handle the response
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
						console.log("Subscibed Successfully");

						// Hide form
						const form = document.getElementById("goLiveFormBody");
							form.classList.add("d-none");

							// Display Success message
							const element = document.getElementById("goLiveSuccessBody");
						element.classList.remove("d-none");

						setTimeout(function() {
							goLiveModal.hide();
						}, 7000);
        })
        .catch(error => {
            // Handle any errors
            console.error("Subscribe failed");
            displayMessage("goLiveErrorMessage", "d-none");
            console.error(error);
    });
}


window.addEventListener('load', function() {
  setTimeout(function() {
    showDelayedProductHuntModal();
  }, 5000);
});

