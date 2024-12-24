// Combined Script for Login and Event Management Functionality

// Login and Signup Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    const formOpenBtn = document.querySelector("#form-open"),
        home = document.querySelector(".home"),
        formContainer = document.querySelector(".form_container"),
        formCloseBtn = document.querySelector(".form_close"),
        signupBtn = document.querySelector("#signup"),
        loginBtn = document.querySelector("#login"),
        pwShowHide = document.querySelectorAll(".pw_hide");

    formOpenBtn.addEventListener("click", () => home.classList.add("show"));
    formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

    pwShowHide.forEach((icon) => {
        icon.addEventListener("click", () => {
            let getPwInput = icon.parentElement.querySelector("input");
            if (getPwInput.type === "password") {
                getPwInput.type = "text";
                icon.classList.replace("uil-eye-slash", "uil-eye");
            } else {
                getPwInput.type = "password";
                icon.classList.replace("uil-eye", "uil-eye-slash");
            }
        });
    });

    signupBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.add("active");
    });

    const validEmail = "user@example.com";
    const validPassword = "password123";

    document.getElementById("loginForm")?.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;

        if (email === validEmail && password === validPassword) {
            alert("Login successful! Redirecting to the main page...");
            window.location.href = "#events"; // Redirect to events section
        } else {
            alert("Invalid email or password!");
        }
    });

    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.remove("active");
    });

    // Event and Cart Management Functionality
    let cart = [];
    let registeredAttendees = [];
    let events = [
        {
            name: "Tech Conference",
            price: 100,
            date: "2023-12-01",
            agenda: "Keynote, Workshops, Networking"
        },
        {
            name: "Music Festival",
            price: 150,
            speakers: ["DJ Mike", "Band XYZ"],
            agenda: "Live Performances, Food Stalls, After Party"
        },
    ];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const eventElement = this.parentElement;
            const eventName = eventElement.getAttribute('data-name');
            const eventPrice = parseFloat(eventElement.getAttribute('data-price'));

            cart.push({ name: eventName, price: eventPrice });
            updateCart();
        });
    });

    document.querySelectorAll('.register-event').forEach(button => {
        button.addEventListener('click', function () {
            const eventElement = this.parentElement;
            const eventName = eventElement.getAttribute('data-name');
            const attendeeName = prompt("Enter your name to register for " + eventName + ":");

            if (attendeeName) {
                registeredAttendees.push({ event: eventName, attendee: attendeeName });
                alert(`You have registered ${attendeeName} for ${eventName}.`);
            }
        });
    });

    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            cartItems.appendChild(li);
        });

        document.getElementById('cart-count').textContent = cart.length;
    }

    document.getElementById('checkout').addEventListener('click', function () {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items to the cart before checking out.');
        } else {
            const total = cart.reduce((acc, item) => acc + item.price, 0);
            alert(`Proceeding to checkout...\nTotal Amount: $${total.toFixed(2)}`);
            // Simulate payment processing
            alert("Payment processed successfully!");
            cart = []; // Clear cart after checkout
            updateCart();
        }
    });

    // Display event details including agenda, venue, and speakers
    function displayEventDetails(eventName) {
        const event = events.find(e => e.name === eventName);
        if (event) {
            alert(`Event: ${event.name}\nDate: ${event.date}\nVenue: ${event.venue}\nSpeakers: ${event.speakers.join(', ')}\nAgenda: ${event.agenda}`);
        }
    }

    // Add event listeners to display event details
    document.querySelectorAll('.event').forEach(eventElement => {
        eventElement.addEventListener('click', function () {
            const eventName = this.getAttribute('data-name');
            displayEventDetails(eventName);
        });
    });

    // Display registered attendees
    function displayRegisteredAttendees() {
        if (registeredAttendees.length === 0) {
            alert("No attendees registered.");
        } else {
            let attendeeList = "Registered Attendees:\n";
            registeredAttendees.forEach(reg => {
                attendeeList += `${reg.attendee} for ${reg.event}\n`;
            });
            alert(attendeeList);
        }
    }

    // Add a button to display registered attendees
    const attendeeButton = document.createElement('button');
    attendeeButton.textContent = "View Registered Attendees";
    attendeeButton.addEventListener('click', displayRegisteredAttendees);
    document.body.appendChild(attendeeButton);
})