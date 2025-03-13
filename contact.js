// Form handling
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            from_name: form.querySelector('[name="from_name"]').value,
            reply_to: form.querySelector('[name="reply_to"]').value,
            subject: form.querySelector('[name="subject"]').value,
            message: form.querySelector('[name="message"]').value
        };

        // Validate form data
        if (!formData.from_name || !formData.reply_to || !formData.subject || !formData.message) {
            alert('Please fill in all fields');
            return;
        }

        try {
            console.log("Attempting to send email with data:", formData);
            
            const result = await emailjs.send(
                "service_lua2t0n",
                "template_4rqjt86",
                formData
            );

            console.log("Email sent successfully:", result);

            if (result.status === 200) {
                form.reset();
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        } catch (error) {
            console.error('Failed to send email:', error);
            alert('Failed to send message. Please try again later. Error: ' + error.message);
        }
    });
} else {
    console.error('Contact form not found in the DOM');
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