window.onload = function() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Disable the submit button to prevent double submission
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
            }

            // Get the form data
            const formData = {
                from_name: form.querySelector('[name="from_name"]').value,
                reply_to: form.querySelector('[name="reply_to"]').value,
                subject: form.querySelector('[name="subject"]').value,
                message: form.querySelector('[name="message"]').value
            };

            // Send the email using EmailJS
            emailjs.send(
                'service_lua2t0n',
                'template_4rqjt86',
                formData,
                'k-iyBjMeC5DL3yvnR'
            ).then(
                function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    form.reset();
                    successMessage.style.display = 'block';
                    
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                },
                function(error) {
                    console.error('FAILED...', error);
                    alert('Sorry, there was an error sending your message. Please try again later.');
                }
            ).finally(function() {
                // Re-enable the submit button
                if (submitButton) {
                    submitButton.disabled = false;
                }
            });
        });
    }
};

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        mobileMenuBtn.classList.toggle('active');
    });
}