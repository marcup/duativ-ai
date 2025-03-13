// Initialize EmailJS
(function() {
    emailjs.init("k-iyBjMeC5DL3yvnR");
})();

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Disable the submit button
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;

            // Send the email
            emailjs.sendForm('service_lua2t0n', 'template_4rqjt86', form, 'k-iyBjMeC5DL3yvnR')
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    form.reset();
                    successMessage.style.display = 'block';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    alert('Sorry, there was an error sending your message. Please try again later.');
                })
                .finally(function() {
                    submitButton.disabled = false;
                });
        });
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            mobileMenuBtn.classList.toggle('active');
        });
    }
});