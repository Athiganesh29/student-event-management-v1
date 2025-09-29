// Data structures
let currentSection = 'dashboard';

let eventsData = [
    {
        id: 1,
        title: 'AI/ML Workshop 2024',
        date: 'Oct 15, 2025',
        venue: 'CS Auditorium',
        organizer: 'Tech Club',
        status: 'completed',
        category: 'technology',
        icon: '🤖',
        description: 'Comprehensive workshop on AI and ML fundamentals with hands-on coding sessions.',
        attendees: 120,
        rating: 4.8
    },
    {
        id: 2,
        title: 'Cultural Night 2024',
        date: 'Oct 20, 2025',
        venue: 'Main Stage',
        organizer: 'Cultural Committee',
        status: 'upcoming',
        category: 'cultural',
        icon: '🎭',
        description: 'Annual cultural celebration featuring dance, music, and drama performances.',
        attendees: 250,
        rating: null
    },
    {
        id: 3,
        title: 'Hackathon 2024',
        date: 'Sep 18, 2025',
        venue: 'Innovation Lab',
        organizer: 'CS Department',
        status: 'completed',
        category: 'technology',
        icon: '💻',
        description: '48-hour coding marathon to solve real-world problems with innovative solutions.',
        attendees: 80,
        rating: 4.6
    },
    {
        id: 4,
        title: 'Football Championship',
        date: 'Nov 5, 2025',
        venue: 'Sports Complex',
        organizer: 'Sports Committee',
        status: 'upcoming',
        category: 'sports',
        icon: '⚽',
        description: 'Inter-department football tournament with exciting matches and prizes.',
        attendees: 150,
        rating: null
    },
    {
        id: 5,
        title: 'Research Symposium',
        date: 'Nov 12, 2025',
        venue: 'Conference Hall',
        organizer: 'Academic Council',
        status: 'upcoming',
        category: 'academic',
        icon: '📚',
        description: 'Student research presentations and paper discussions across disciplines.',
        attendees: 100,
        rating: null
    }
];

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach((item, index) => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const section = this.dataset.section;

            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Show corresponding section
            showSection(section);
        });
    });
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('section-visible');
        section.classList.add('section-hidden');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('section-hidden');
        targetSection.classList.add('section-visible');
        currentSection = sectionName;

        // Initialize section-specific functionality
        switch (sectionName) {
            case 'my-events':
                initializeMyEvents();
                break;
            case 'recommended':
                initializeRecommended();
                break;
            case 'announcements':
                initializeAnnouncements();
                break;
            case 'achievements':
                initializeAchievements();
                break;
            case 'analytics':
                initializeAnalytics();
                break;
        }
    }
}

// My Events functionality
function initializeMyEvents() {
    renderEventsGrid();
    initializeEventFilters();
}

// Recommended Events functionality
function initializeRecommended() {
    // Add any recommended events initialization here
}

// Announcements functionality
function initializeAnnouncements() {
    // Add any announcements initialization here
}

// Achievements functionality
function initializeAchievements() {
    // Add any achievements initialization here
}

// Analytics functionality
function initializeAnalytics() {
    initializeCharts();
    generateActivityHeatmap();
}

function renderEventsGrid(filteredEvents = eventsData) {
    const grid = document.getElementById('eventsGrid');
    if (!grid) return;

    grid.innerHTML = filteredEvents.map(event => `
                <div class="modern-card rounded-3xl p-6 cursor-pointer hover:scale-105 transition-all duration-300" 
                     onclick="showEventDetails('${event.id}')">
                    <div class="flex items-start gap-4 mb-4">
                        <div class="w-12 h-12 gradient-${getGradientClass(event.category)} rounded-xl flex items-center justify-center text-2xl">
                            ${event.icon}
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold text-gray-900 text-lg mb-1">${event.title}</h3>
                            <div class="flex items-center gap-4 text-sm text-gray-600">
                                <span>📅 ${event.date}</span>
                                <span>🏛️ ${event.venue}</span>
                            </div>
                            <div class="text-sm text-gray-600 mt-1">👥 ${event.organizer}</div>
                        </div>
                        <span class="px-3 py-1 bg-${getStatusColor(event.status)}-100 text-${getStatusColor(event.status)}-800 rounded-full text-xs font-medium">
                            ${capitalizeFirst(event.status)}
                        </span>
                    </div>

                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">${event.description}</p>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 text-sm text-gray-500">
                            <span>👥 ${event.attendees}</span>
                            ${event.rating ? `<span>⭐ ${event.rating}</span>` : ''}
                        </div>
                        <div class="flex gap-2">
                            ${event.status === 'upcoming' ?
            `<button class="px-4 py-2 gradient-bg text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all" onclick="event.stopPropagation(); downloadQR('${event.title}')">
                                    QR Code
                                </button>` :
            `<button class="px-4 py-2 gradient-emerald text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all" onclick="event.stopPropagation(); showCertificate('${event.title}')">
                                    Certificate
                                </button>`
        }
                        </div>
                    </div>
                </div>
            `).join('');
}

function initializeEventFilters() {
    // Status filter
    const statusFilter = document.getElementById('eventFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function () {
            filterEvents();
        });
    }

    // Category filters
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function () {
            // Update active state
            categoryFilters.forEach(f => {
                f.classList.remove('gradient-bg', 'text-white');
                f.classList.add('glass-effect', 'hover:bg-white/50');
            });
            this.classList.add('gradient-bg', 'text-white');
            this.classList.remove('glass-effect', 'hover:bg-white/50');

            // Filter events
            filterEvents();
        });
    });
}

function filterEvents() {
    const statusFilter = document.getElementById('eventFilter')?.value || 'all';
    const activeCategory = document.querySelector('.category-filter.gradient-bg')?.dataset.category || 'all';

    let filtered = eventsData;

    if (statusFilter !== 'all') {
        filtered = filtered.filter(event => event.status === statusFilter);
    }

    if (activeCategory !== 'all') {
        filtered = filtered.filter(event => event.category === activeCategory);
    }

    renderEventsGrid(filtered);
}

// Analytics functionality
function initializeCharts() {
    // Participation Trend Chart
    const participationCtx = document.getElementById('participationChart');
    if (participationCtx) {
        new Chart(participationCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Events Participated',
                    data: [1, 2, 1, 3, 2, 4, 3, 5, 4, 6],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Category Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Technology', 'Cultural', 'Sports', 'Academic'],
                datasets: [{
                    data: [40, 30, 15, 15],
                    backgroundColor: [
                        '#3b82f6',
                        '#a855f7',
                        '#10b981',
                        '#f97316'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                }
            }
        });
    }
}

function generateActivityHeatmap() {
    const heatmapContainer = document.getElementById('activityHeatmap');
    if (!heatmapContainer) return;

    const days = 49; // 7 weeks
    let html = '';

    for (let i = 0; i < days; i++) {
        const activity = Math.random();
        let bgClass = 'bg-gray-100';

        if (activity > 0.8) bgClass = 'bg-blue-800';
        else if (activity > 0.6) bgClass = 'bg-blue-600';
        else if (activity > 0.4) bgClass = 'bg-blue-400';
        else if (activity > 0.2) bgClass = 'bg-blue-200';

        html += `<div class="w-3 h-3 ${bgClass} rounded" title="Activity level: ${Math.round(activity * 100)}%"></div>`;
    }

    heatmapContainer.innerHTML = html;
}

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('opacity-0', 'invisible');
        modal.classList.add('opacity-100', 'visible');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('opacity-0', 'invisible');
        modal.classList.remove('opacity-100', 'visible');
        document.body.style.overflow = 'auto';
    }
}

// Event details
function showEventDetails(eventId) {
    const event = eventsData.find(e => e.id == eventId);
    if (!event) return;

    const modalContent = document.getElementById('eventModalContent');
    if (!modalContent) return;

    modalContent.innerHTML = `
                <div class="flex items-start gap-6 mb-8">
                    <div class="w-20 h-20 gradient-${getGradientClass(event.category)} rounded-2xl flex items-center justify-center text-4xl">${event.icon}</div>
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">${event.title}</h3>
                        <div class="flex flex-wrap gap-4 text-gray-600 mb-3">
                            <span class="flex items-center gap-1">📅 ${event.date}</span>
                            <span class="flex items-center gap-1">🏛️ ${event.venue}</span>
                            <span class="flex items-center gap-1">👥 ${event.organizer}</span>
                        </div>
                        <span class="px-3 py-1 bg-${getStatusColor(event.status)}-100 text-${getStatusColor(event.status)}-800 rounded-full text-sm font-medium">
                            ${capitalizeFirst(event.status)}
                        </span>
                    </div>
                </div>

                <div class="space-y-6">
                    <div>
                        <h4 class="text-lg font-bold text-gray-900 mb-3">📋 Description</h4>
                        <p class="text-gray-600 leading-relaxed">${event.description}</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="glass-effect rounded-xl p-4 text-center">
                            <div class="text-2xl font-bold text-gray-900">${event.attendees}</div>
                            <div class="text-sm text-gray-600">Expected Attendees</div>
                        </div>
                        ${event.rating ? `
                        <div class="glass-effect rounded-xl p-4 text-center">
                            <div class="text-2xl font-bold text-gray-900">${event.rating}</div>
                            <div class="text-sm text-gray-600">Average Rating</div>
                        </div>` : `
                        <div class="glass-effect rounded-xl p-4 text-center">
                            <div class="text-2xl font-bold text-gray-900">-</div>
                            <div class="text-sm text-gray-600">Not Rated Yet</div>
                        </div>`}
                    </div>
                </div>

                <div class="flex gap-4 mt-8">
                    <button class="px-6 py-3 glass-effect rounded-xl font-semibold hover:bg-white/50 transition-all duration-300 interactive-button" onclick="closeModal('eventModal')">
                        Close
                    </button>
                    ${event.status === 'upcoming' ?
            `<button class="px-6 py-3 gradient-bg text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 interactive-button" onclick="downloadQR('${event.title}')">
                            Download QR Code
                        </button>` :
            `<button class="px-6 py-3 gradient-emerald text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 interactive-button" onclick="showCertificate('${event.title}')">
                            View Certificate
                        </button>`
        }
                </div>
            `;

    openModal('eventModal');
}

// Form submissions
function submitRegistration(event) {
    event.preventDefault();
    const category = document.getElementById('regCategory').value;
    const eventName = document.getElementById('regEventName').value;
    const requirements = document.getElementById('regRequirements').value;

    if (!category || !eventName) {
        showNotification('Please fill in all required fields.', 'error');
        return false;
    }

    showNotification('Registration successful! Check your email for confirmation.', 'success');
    closeModal('registrationModal');

    // Reset form
    document.getElementById('regCategory').value = '';
    document.getElementById('regEventName').value = '';
    document.getElementById('regRequirements').value = '';

    return false;
}

function submitFeedback(event) {
    event.preventDefault();
    const eventName = document.getElementById('feedbackEvent').value;
    const rating = document.getElementById('ratingValue').value;
    const feedback = document.getElementById('feedbackText').value;

    if (!eventName || rating === '0' || !feedback.trim()) {
        showNotification('Please complete all fields including rating.', 'error');
        return false;
    }

    showNotification('Thank you for your feedback! Your input helps us improve.', 'success');
    closeModal('feedbackModal');

    // Reset form
    document.getElementById('feedbackEvent').value = '';
    document.getElementById('ratingValue').value = '0';
    document.getElementById('feedbackText').value = '';
    resetStars();

    return false;
}

// Rating functionality
function setRating(rating) {
    document.getElementById('ratingValue').value = rating;
    const stars = document.querySelectorAll('#starRating button');

    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('text-gray-300');
            star.classList.add('text-yellow-400');
        } else {
            star.classList.remove('text-yellow-400');
            star.classList.add('text-gray-300');
        }
    });
}

function resetStars() {
    const stars = document.querySelectorAll('#starRating button');
    stars.forEach(star => {
        star.classList.remove('text-yellow-400');
        star.classList.add('text-gray-300');
    });
}

// Utility functions
function getGradientClass(category) {
    const gradients = {
        'technology': 'blue',
        'cultural': 'purple',
        'sports': 'emerald',
        'academic': 'orange'
    };
    return gradients[category] || 'bg';
}

function getStatusColor(status) {
    const colors = {
        'upcoming': 'blue',
        'completed': 'emerald',
        'cancelled': 'red',
        'ongoing': 'orange'
    };
    return colors[status] || 'gray';
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Download QR Code
function downloadQR(eventName) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 300, 300);

    // Black QR pattern
    ctx.fillStyle = '#000000';

    // Generate QR-like pattern
    const cellSize = 10;
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            if (Math.random() > 0.5) {
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }

    // Add corner squares
    const cornerSize = 70;
    // Top-left
    ctx.fillRect(0, 0, cornerSize, cornerSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, 10, cornerSize - 20, cornerSize - 20);
    ctx.fillStyle = '#000000';
    ctx.fillRect(20, 20, cornerSize - 40, cornerSize - 40);

    // Top-right
    ctx.fillStyle = '#000000';
    ctx.fillRect(230, 0, cornerSize, cornerSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(240, 10, cornerSize - 20, cornerSize - 20);
    ctx.fillStyle = '#000000';
    ctx.fillRect(250, 20, cornerSize - 40, cornerSize - 40);

    // Bottom-left
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 230, cornerSize, cornerSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, 240, cornerSize - 20, cornerSize - 20);
    ctx.fillStyle = '#000000';
    ctx.fillRect(20, 250, cornerSize - 40, cornerSize - 40);

    // Download
    canvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${eventName}_QR.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    showNotification(`QR Code for "${eventName}" downloaded successfully!`, 'success');
}

// Show certificate
function showCertificate(eventName) {
    showNotification(`Certificate for "${eventName}" is ready for download!`, 'success');
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'from-green-500 to-emerald-600' : 'from-red-500 to-red-600';

    notification.className = `fixed top-6 right-6 bg-gradient-to-r ${bgColor} text-white px-6 py-4 rounded-2xl shadow-2xl z-[200] transform translate-x-full transition-transform duration-300 max-w-sm`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Show notifications popup
function showNotifications() {
    const notifications = [
        { title: 'Event Reminder', message: 'Cultural Night 2024 starts tomorrow!', time: '2 hours ago', type: 'info' },
        { title: 'Registration Confirmed', message: 'Successfully registered for Hackathon 2024', time: '1 day ago', type: 'success' },
        { title: 'New Achievement', message: 'You earned the "Tech Enthusiast" badge!', time: '2 days ago', type: 'achievement' }
    ];

    let html = `
                <div class="fixed top-20 right-8 w-80 modern-card rounded-2xl p-6 z-[90] slide-in">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-bold text-gray-900">Notifications</h3>
                        <button onclick="closeNotifications()" class="text-gray-500 hover:text-gray-700">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="space-y-3">
            `;

    notifications.forEach(notif => {
        const icon = notif.type === 'success' ? '✅' : notif.type === 'achievement' ? '🏆' : '🔔';
        html += `
                    <div class="flex items-start gap-3 p-3 glass-effect rounded-xl hover:bg-white/50 transition-all cursor-pointer">
                        <span class="text-xl">${icon}</span>
                        <div class="flex-1">
                            <h4 class="font-semibold text-sm text-gray-900">${notif.title}</h4>
                            <p class="text-xs text-gray-600">${notif.message}</p>
                            <span class="text-xs text-gray-500">${notif.time}</span>
                        </div>
                    </div>
                `;
    });

    html += `
                    </div>
                    <button class="w-full mt-4 px-4 py-2 text-sm glass-effect rounded-xl hover:bg-white/50 transition-all">
                        View All Notifications
                    </button>
                </div>
            `;

    // Remove existing notifications popup
    const existing = document.getElementById('notificationsPopup');
    if (existing) existing.remove();

    const popup = document.createElement('div');
    popup.id = 'notificationsPopup';
    popup.innerHTML = html;
    document.body.appendChild(popup);

    // Auto close after 5 seconds
    setTimeout(() => {
        closeNotifications();
    }, 5000);
}

function closeNotifications() {
    const popup = document.getElementById('notificationsPopup');
    if (popup) popup.remove();
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase().trim();

            if (searchTerm.length > 2) {
                highlightSearchResults(searchTerm);
            } else {
                clearSearchHighlights();
            }
        });
    }
}

function highlightSearchResults(term) {
    clearSearchHighlights();

    if (currentSection === 'my-events') {
        const filtered = eventsData.filter(event =>
            event.title.toLowerCase().includes(term) ||
            event.description.toLowerCase().includes(term) ||
            event.organizer.toLowerCase().includes(term)
        );
        renderEventsGrid(filtered);
    }

    // Add visual highlighting to matching text
    const textElements = document.querySelectorAll('#' + currentSection + ' h3, #' + currentSection + ' h4, #' + currentSection + ' p');
    textElements.forEach(element => {
        const text = element.textContent;
        const regex = new RegExp(`(${term})`, 'gi');
        if (regex.test(text)) {
            element.style.backgroundColor = 'rgba(255, 235, 59, 0.3)';
            element.style.borderRadius = '4px';
            element.style.padding = '2px 4px';
        }
    });
}

function clearSearchHighlights() {
    const highlighted = document.querySelectorAll('[style*="background-color: rgba(255, 235, 59"]');
    highlighted.forEach(element => {
        element.style.backgroundColor = '';
        element.style.borderRadius = '';
        element.style.padding = '';
    });

    if (currentSection === 'my-events') {
        renderEventsGrid(); // Reset to show all events
    }
}

// Achievement details
function showAchievementDetails(badgeName) {
    const achievements = {
        'First Event': {
            description: 'Congratulations! You successfully registered for your first event on ZVENT.',
            dateEarned: 'Sep 10, 2025',
            criteria: 'Register for any event',
            rarity: 'Common'
        },
        'Cultural Star': {
            description: 'You have shown exceptional participation in cultural events.',
            dateEarned: 'Oct 5, 2025',
            criteria: 'Participate in 3+ cultural events',
            rarity: 'Uncommon'
        },
        'Tech Enthusiast': {
            description: 'Your passion for technology events is truly inspiring!',
            dateEarned: 'Oct 20, 2025',
            criteria: 'Attend 5+ technology events with high ratings',
            rarity: 'Rare'
        },
        'Active Member': {
            description: 'You are an active and engaged member of our community.',
            dateEarned: 'Oct 15, 2025',
            criteria: 'Consistent participation across all event types',
            rarity: 'Common'
        },
        'Feedback Champion': {
            description: 'Thank you for providing valuable feedback to improve our events.',
            dateEarned: 'Oct 18, 2025',
            criteria: 'Submit detailed feedback for 5+ events',
            rarity: 'Uncommon'
        },
        'Networking Pro': {
            description: 'You excel at building connections and networking at events.',
            dateEarned: 'Oct 19, 2025',
            criteria: 'High social engagement at events',
            rarity: 'Rare'
        }
    };

    const achievement = achievements[badgeName];
    if (!achievement) return;

    showNotification(`Achievement: ${badgeName} - ${achievement.description}`, 'success');
}

// Refresh recommendations
function refreshRecommendations() {
    showNotification('Recommendations refreshed based on your latest activity!', 'success');

    // Add a subtle animation to recommendation cards
    const cards = document.querySelectorAll('#recommended .modern-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// Update registration form based on category
function updateRegistrationForm() {
    const category = document.getElementById('regCategory');
    const eventSelect = document.getElementById('regEventName');

    if (category && eventSelect) {
        category.addEventListener('change', function () {
            const selectedCategory = this.value;
            const eventsByCategory = {
                'technology': [
                    'Web Development Bootcamp',
                    'Cybersecurity Workshop',
                    'Data Science Summit',
                    'Blockchain Conference'
                ],
                'cultural': [
                    'Annual Dance Competition',
                    'Music Festival 2024',
                    'Drama Workshop',
                    'Art Exhibition'
                ],
                'sports': [
                    'Basketball Tournament',
                    'Swimming Championship',
                    'Cricket League',
                    'Fitness Challenge'
                ],
                'academic': [
                    'Research Symposium',
                    'Academic Conference',
                    'Thesis Presentation',
                    'Study Group Formation'
                ]
            };

            eventSelect.innerHTML = '<option value="">Choose an event...</option>';
            if (eventsByCategory[selectedCategory]) {
                eventsByCategory[selectedCategory].forEach(event => {
                    eventSelect.innerHTML += `<option value="${event}">${event}</option>`;
                });
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeSearch();
    updateRegistrationForm();

    // Initialize dashboard by default
    initializeMyEvents();

    // Add stagger delay to animations
    const animatedElements = document.querySelectorAll('.metric-card, .modern-card');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('fade-in-up');
    });

    // Close modals when clicking outside
    document.querySelectorAll('[id$="Modal"]').forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('[id$="Modal"].opacity-100');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });

    // Welcome notification is handled by userDashboard.js
});

// Add ripple effect to interactive buttons
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('interactive-button') || e.target.closest('.interactive-button')) {
        const button = e.target.classList.contains('interactive-button') ? e.target : e.target.closest('.interactive-button');

        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

        if (getComputedStyle(button).position === 'static') {
            button.style.position = 'relative';
        }
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(rippleStyle);

// Profile Dropdown Functions
function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    const arrow = document.getElementById('dropdownArrow');

    if (dropdown.classList.contains('opacity-0')) {
        // Show dropdown
        dropdown.classList.remove('opacity-0', 'invisible', 'translate-y-2');
        dropdown.classList.add('opacity-100', 'visible', 'translate-y-0');
        arrow.style.transform = 'rotate(180deg)';
    } else {
        // Hide dropdown
        dropdown.classList.add('opacity-0', 'invisible', 'translate-y-2');
        dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
        arrow.style.transform = 'rotate(0deg)';
    }
}

function closeProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    const arrow = document.getElementById('dropdownArrow');

    dropdown.classList.add('opacity-0', 'invisible', 'translate-y-2');
    dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
    arrow.style.transform = 'rotate(0deg)';
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const profileDropdown = document.getElementById('profileDropdown');
    const profileButton = event.target.closest('[onclick="toggleProfileDropdown()"]');

    if (!profileButton && !profileDropdown.contains(event.target)) {
        closeProfileDropdown();
    }
});

// Logout function
function logout() {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');

    // Show logout notification
    showNotification('Logged out successfully!', 'success');

    // Redirect to login page
    setTimeout(() => {
        window.location.href = './login.html';
    }, 1000);
}