// DOM Elements
const bengaliBtn = document.getElementById('bengali-btn');
const englishBtn = document.getElementById('english-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const contactForm = document.getElementById('contact-form');
const serviceLinks = document.querySelectorAll('.service-list a');

// Set default language to Bengali
document.body.classList.add('bengali');

// Language Toggle Functionality
bengaliBtn.addEventListener('click', () => {
    document.body.classList.remove('english');
    document.body.classList.add('bengali');
    bengaliBtn.classList.add('active');
    englishBtn.classList.remove('active');
    localStorage.setItem('language', 'bengali');
});

englishBtn.addEventListener('click', () => {
    document.body.classList.remove('bengali');
    document.body.classList.add('english');
    englishBtn.classList.add('active');
    bengaliBtn.classList.remove('active');
    localStorage.setItem('language', 'english');
});

// Check for saved language preference
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'english') {
        englishBtn.click();
    } else {
        bengaliBtn.click();
    }
});

// Search Functionality
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm === '') return;

    // Reset all links visibility
    serviceLinks.forEach(link => {
        link.parentElement.style.display = 'block';
    });

    // Hide links that don't match the search term
    let matchFound = false;
    serviceLinks.forEach(link => {
        const englishText = link.querySelector('.en').textContent.toLowerCase();
        const bengaliText = link.querySelector('.bn').textContent.toLowerCase();
        
        if (!englishText.includes(searchTerm) && !bengaliText.includes(searchTerm)) {
            link.parentElement.style.display = 'none';
        } else {
            matchFound = true;
        }
    });

    // Scroll to first match
    if (matchFound) {
        const firstVisible = document.querySelector('.service-list li[style="display: block"]');
        if (firstVisible) {
            firstVisible.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Contact Form Functionality
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real implementation, this would send data to a server
    // For now, we'll just show an alert
    alert(`Thank you for your message, ${name}! We will contact you at ${email} soon.`);
    
    // Clear the form
    contactForm.reset();
});

// Add smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add hover effect for service links
serviceLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateX(5px)';
        link.style.transition = 'transform 0.3s ease';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateX(0)';
    });
});

// Add animation for page load
document.addEventListener('DOMContentLoaded', () => {
    const serviceCategories = document.querySelectorAll('.service-category');
    
    serviceCategories.forEach((category, index) => {
        setTimeout(() => {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Initialize service categories with animation styles
document.querySelectorAll('.service-category').forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';
    category.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});
