import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        await emailjs.sendForm(
            'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
            'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
            form,
            'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
        );

        // Clear the form
        form.reset();
        
        // Show success message
        successMessage.style.display = 'block';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);

    } catch (error) {
        console.error('Error sending email:', error);
        alert('Sorry, there was an error sending your message. Please try again later.');
    }
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    mobileMenuBtn.classList.toggle('active');
});