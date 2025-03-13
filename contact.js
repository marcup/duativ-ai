document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            try {
                const result = await emailjs.sendForm(
                    'service_lua2t0n',
                    'template_4rqjt86',
                    this,
                    'k-iyBjMeC5DL3yvnR'
                );

                console.log('SUCCESS!', result.text);
                
                // Clear the form
                form.reset();
                
                // Show success message
                successMessage.style.display = 'block';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);

            } catch (error) {
                console.error('FAILED...', error);
                alert('Sorry, there was an error sending your message. Please try again later.');
            }
        });
    }
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        mobileMenuBtn.classList.toggle('active');
    });
}