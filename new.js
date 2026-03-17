// Translation data
const translations = {
    ku: {
        menuLabel: "مێنیومان",
        title: "شیرینی و دیزێرتی تایبەت",
        subtitle: "بەخێر بێن بۆ بەهەشتی شیرینی!",
        tabs: {
            desserts: "شیرینی"
        },
        contactTitle: "پەیوەندیمان پێوە بکە",
        phone: "تەلەفۆن:",
        email: "ئیمەیڵ:",
        address: "ناونیشان:",
        location: "سلێمانی، عێراق",
        delivery: "گەیاندن و وەرگرتن بەردەستە",
        items: {
            desserts: [
                { name: "Red Velvet Cake", price: "١٠,٠٠٠ دینار" },
                { name: "Pancake Nutella", price: "٨,٥٠٠ دینار" },
                { name: "Pink Swirl Cupcakes", price: "٧,٥٠٠ دینار" }
            ],
        }
    },
    en: {
        menuLabel: "Our menu",
        title: "Featured Desserts & Treats",
        subtitle: "Welcome to the sweet tooth paradise!",
        tabs: {
            desserts: "Desserts"
        },
        contactTitle: "Contact Us",
        phone: "Phone:",
        email: "Email:",
        address: "Address:",
        location: "Sulaymaniyah, Iraq",
        delivery: "Delivery and Pickup Available",
        items: {
            desserts: [
                { name: "Red Velvet Cake", price: "10,000 IQD" },
                { name: "Pancake Nutella", price: "8,500 IQD" },
                { name: "Pink Swirl Cupcakes", price: "7,500 IQD" }
            ],
        }
    }
};

let currentLang = 'ku';
let currentCategory = 'desserts';

// Toggle language
function toggleLanguage() {
    currentLang = currentLang === 'ku' ? 'en' : 'ku';
    const html = document.documentElement;
    const data = translations[currentLang];

    // Update HTML attributes
    if (currentLang === 'en') {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        document.querySelector('.language-toggle').textContent = 'کوردی';
    } else {
        html.setAttribute('lang', 'ku');
        html.setAttribute('dir', 'rtl');
        document.querySelector('.language-toggle').textContent = 'English';
    }

    // Update header
    document.querySelector('.menu-label').textContent = data.menuLabel;
    document.querySelector('.main-title').textContent = data.title;
    document.querySelector('.subtitle').textContent = data.subtitle;

    // Update tabs
    const tabs = document.querySelectorAll('.tab');
    if (tabs[0]) tabs[0].textContent = data.tabs.desserts;

    // Update menu items
    updateMenuItems();

    // Update contact
    document.querySelector('.contact-title').textContent = data.contactTitle;
    document.querySelector('.contact-details').innerHTML = `
        <p>📞 <span class="label">${data.phone}</span> <a href="tel:+9647501234567">+964 750 123 4567</a></p>
        <p>📧 <span class="label">${data.email}</span> <a href="mailto:info@desserts.com">info@desserts.com</a></p>
        <p>📍 <span class="label">${data.address}</span> ${data.location}</p>
        <p class="delivery-note">${data.delivery}</p>
    `;
}

// Update menu items based on current category and language
function updateMenuItems() {
    const data = translations[currentLang];
    const items = document.querySelectorAll(`.menu-item[data-category="${currentCategory}"]`);
    const categoryItems = data.items[currentCategory];

    items.forEach((item, index) => {
        if (categoryItems[index]) {
            item.querySelector('.item-name').textContent = categoryItems[index].name;
            item.querySelector('.item-price').innerHTML = categoryItems[index].price.split(' ')[0] + ' <span class="currency">' + categoryItems[index].price.split(' ')[1] + '</span>';
        }
    });
}

// Filter by category
function filterCategory(category, event) {
    currentCategory = category;
    
    // Update active tab
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');

    // Show/hide items
    const allItems = document.querySelectorAll('.menu-item');
    allItems.forEach(item => {
        if (item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    updateMenuItems();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state
    filterCategory('desserts');
});