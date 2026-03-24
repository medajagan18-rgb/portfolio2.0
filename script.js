// 1. Initialize with a unique variable name 'db'
const _supabaseUrl = 'https://jvtxqtutnmijltcmrvaa.supabase.co';
const _supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2dHhxdHV0bm1pamx0Y21ydmFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNTMyNzQsImV4cCI6MjA4OTkyOTI3NH0.nDsGjCzXQTkmhwO7H-8HxteAeQ9C0lM2-N3Ri-OeJkc';

// Use 'db' instead of 'supabase'
const db = supabase.createClient(_supabaseUrl, _supabaseAnonKey);

document.addEventListener('DOMContentLoaded', () => {
    console.log("Page Loaded - Script Running"); // Check if this shows in Console (F12)

    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.error("Could not find an element with id='contact-form'");
        return;
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Form submit detected!");

        // Get values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        try {
            const { data, error } = await db
                .from('contact_entries')
                .insert([{ name, email, message }]);

            if (error) {
                console.error('Supabase Error:', error);
                alert('Error: ' + error.message);
            } else {
                alert('Success! Message sent.');
                contactForm.reset();
            }
        } catch (err) {
            console.error('Unexpected Crash:', err);
            alert('The script crashed. Check F12 console.');
        }
    });
});
