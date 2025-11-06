// script.js
// Custom Cursor Logic
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = (e.clientX - 15) + 'px';
        cursorFollower.style.top = (e.clientY - 15) + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-active');
        cursorFollower.classList.add('cursor-follower-active');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-active');
        cursorFollower.classList.remove('cursor-follower-active');
    });
}

// Login Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            let isValid = true;
            
            // Validate username
            if (username.length < 4) {
                document.getElementById('username-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('username-error').style.display = 'none';
            }
            
            // Validate password
            if (password.length < 6) {
                document.getElementById('password-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('password-error').style.display = 'none';
            }
            
            // If valid, redirect to home page
            if (isValid) {
                window.location.href = 'Home.html';
            }
        });
    }
    
    // Date and Time Display for Home Page
    if (document.getElementById('welcome-message')) {
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }
    
    // Initialize slideshow if on home page
    if (document.querySelector('.slideshow-container')) {
        initSlideshow();
    }
    
    // Mobile menu toggle for dropdowns
    if (window.innerWidth <= 768) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('.nav-link');
            dropdownLink.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
});

// Date and Time Display
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
    document.getElementById('current-time').textContent = now.toLocaleTimeString('en-US');
}

// Slideshow functionality
let slideIndex = 0;
let slideInterval;

function initSlideshow() {
    showSlides(slideIndex);
    // Change slide every 5 seconds
    slideInterval = setInterval(() => {
        plusSlides(1);
    }, 5000);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex = n - 1);
    // Restart the automatic slideshow after manual navigation
    slideInterval = setInterval(() => {
        plusSlides(1);
    }, 5000);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    
    if (slides.length > 0) {
        slides[slideIndex].style.display = "block";
        if (dots.length > 0) {
            dots[slideIndex].className += " active-dot";
        }
    }

}
