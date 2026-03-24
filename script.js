// 1. Initialize Supabase (Replace these with your actual keys from Supabase Settings > API)
const _supabaseUrl = 'https://your-project-url.supabase.co';
const _supabaseAnonKey = 'your-anon-public-key';
const supabase = supabase.createClient(_supabaseUrl, _supabaseAnonKey);

document.addEventListener('DOMContentLoaded', () => {
    
    // --- KEEP: Smooth Scrolling Logic ---
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = document.querySelector(link.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- NEW: Supabase Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get values from the form
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            // Insert data into your 'contact_entries' SQL table
            const { data, error } = await supabase
                .from('contact_entries')
                .insert([{ name, email, message }]);

            if (error) {
                console.error('Error:', error);
                alert('Submission failed. Check console for details.');
            } else {
                alert('Success! Your message is now saved in the SQL database.');
                contactForm.reset();
            }
        });
    }

    // --- KEEP: Scroll Reveal Animations ---
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
