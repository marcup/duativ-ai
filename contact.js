// Initialize EmailJS with public key
emailjs.init("k-iyBjMeC5DL3yvnR");

// Form handling
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            const result = await emailjs.send(
                "service_lua2t0n",
                "template_4rqjt86",
                {
                    from_name: form.from_name.value,
                    reply_to: form.reply_to.value,
                    subject: form.subject.value,
                    message: form.message.value
                }
            );

            if (result.status === 200) {
                form.reset();
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        } catch (error) {
            console.error('Failed to send email:', error);
            alert('Failed to send message. Please try again later.');
        }
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