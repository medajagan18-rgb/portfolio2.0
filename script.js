// 1. Initialize Supabase 
const _supabaseUrl = 'https://jvtxqtutnmijltcmrvaa.supabase.co';
const _supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2dHhxdHV0bm1pamx0Y21ydmFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNTMyNzQsImV4cCI6MjA4OTkyOTI3NH0.nDsGjCzXQTkmhwO7H-8HxteAeQ9C0lM2-N3Ri-OeJkc';

// Changed variable name to 'db' to avoid conflict with the 'supabase' library object
const db = supabase.createClient(_supabaseUrl, _supabaseAnonKey);

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Smooth Scrolling Logic ---
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = document.querySelector(link.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- Supabase Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get values from the form inputs
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            // INSERT SNIPPET START
            const { data, error } = await db
                .from('contact_entries')
                .insert([{ 
                    name: name, 
                    email: email, 
                    message: message 
                }]);
            // INSERT SNIPPET END

            if (error) {
                console.error('Error:', error.message);
                alert('Submission failed: ' + error.message);
            } else {
                alert('Success! Your message is now saved.');
                contactForm.reset(); // Clears the form
            }
        });
    }

    // --- Scroll Reveal Animations ---
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
});
