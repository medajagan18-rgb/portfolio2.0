// REPLACE with your credentials from Supabase Settings > API
const _supabaseUrl = 'https://jvtxqtutnmijltcmrvaa.supabase.co';
const _supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2dHhxdHV0bm1pamx0Y21ydmFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNTMyNzQsImV4cCI6MjA4OTkyOTI3NH0.nDsGjCzXQTkmhwO7H-8HxteAeQ9C0lM2-N3Ri-OeJkc';
const supabaseClient = supabase.createClient(_supabaseUrl, _supabaseAnonKey);

document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth Scrolling
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Supabase Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');
            
            // UI Feedback: Loading state
            submitBtn.innerText = 'Sending...';
            submitBtn.style.opacity = '0.7';

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            const { error } = await supabaseClient
                .from('contact_entries')
                .insert([formData]);

            if (error) {
                console.error('Error:', error);
                alert('Oops! Something went wrong.');
                submitBtn.innerText = 'Send Message';
            } else {
                alert('Message sent successfully!');
                contactForm.reset();
                submitBtn.innerText = 'Send Message';
            }
            submitBtn.style.opacity = '1';
        });
    }

    // Scroll Reveal Intersection Observer
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });
});
