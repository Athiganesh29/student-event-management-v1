

// Sample data

let eventsData = [

    { id: 1, title: 'AI/ML Workshop 2024', date: '2025-11-15', category: 'Technology', registrations: 125, maxParticipants: 150, status: 'active', organizer: 'Tech Club' },

    { id: 2, title: 'Cultural Night 2024', date: '2025-11-20', category: 'Cultural', registrations: 245, maxParticipants: 300, status: 'active', organizer: 'Cultural Committee' },

    { id: 3, title: 'Sports Day', date: '2025-11-25', category: 'Sports', registrations: 180, maxParticipants: 200, status: 'active', organizer: 'Sports Committee' },

    { id: 4, title: 'Research Symposium', date: '2025-12-01', category: 'Academic', registrations: 95, maxParticipants: 120, status: 'draft', organizer: 'Academic Council' },

];



let usersData = [

    { id: 1, name: 'Priya Sharma', email: 'priya.sharma@university.edu', department: 'Computer Science', year: 'Final Year', events: 8, status: 'active' },

    { id: 2, name: 'Rahul Kumar', email: 'rahul.kumar@university.edu', department: 'Electronics', year: 'Third Year', events: 5, status: 'active' },

    { id: 3, name: 'Anjali Patel', email: 'anjali.patel@university.edu', department: 'Mechanical', year: 'Second Year', events: 12, status: 'active' },

    { id: 4, name: 'Vikram Singh', email: 'vikram.singh@university.edu', department: 'Civil', year: 'Final Year', events: 3, status: 'inactive' },

];



let announcementsData = [

    { id: 1, title: 'Tech Fest Registration Extended', message: 'Registration deadline extended until Nov 30th due to popular demand.', priority: 'urgent', category: 'events', date: '2025-10-20', author: 'Admin' },

    { id: 2, title: 'Library Hours Extended', message: 'Library will remain open 24/7 during exam season starting Nov 1st.', priority: 'important', category: 'academic', date: '2025-10-18', author: 'Library Admin' },

    { id: 3, title: 'Campus WiFi Maintenance', message: 'WiFi will be down for maintenance on Oct 25th from 2-6 AM.', priority: 'normal', category: 'technical', date: '2025-10-15', author: 'IT Team' },

];



let currentSection = 'overview';



// Navigation functionality

function initializeNavigation() {

    const navItems = document.querySelectorAll('.nav-item');



    navItems.forEach(item => {

        item.addEventListener('click', function (e) {

            e.preventDefault();

            const section = this.dataset.section;



            navItems.forEach(nav => nav.classList.remove('active'));

            this.classList.add('active');



            showSection(section);

        });

    });

}



function showSection(sectionName) {

    document.querySelectorAll('.section').forEach(section => {

        section.classList.remove('section-visible');

        section.classList.add('section-hidden');

    });



    const targetSection = document.getElementById(sectionName);

    if (targetSection) {

        targetSection.classList.remove('section-hidden');

        targetSection.classList.add('section-visible');

        currentSection = sectionName;



        // Initialize section-specific data

        switch (sectionName) {

            case 'events':

                populateEventsTable();

                break;

            case 'users':

                populateUsersTable();

                break;

            case 'announcements':

                populateAnnouncementsList();

                break;

            case 'analytics':

                initializeCharts();

                break;

        }

    }

}



// Modal functions

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



// Events management

function populateEventsTable() {

    const tableBody = document.getElementById('eventsTable');

    if (!tableBody) return;



    tableBody.innerHTML = eventsData.map(event => `

                <tr>

                    <td class="font-semibold text-gray-900">${event.title}</td>

                    <td class="text-gray-600">${new Date(event.date).toLocaleDateString()}</td>

                    <td><span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">${event.category}</span></td>

                    <td class="text-gray-600">${event.registrations}/${event.maxParticipants}</td>

                    <td><span class="status-badge status-${event.status}">${capitalizeFirst(event.status)}</span></td>

                    <td>

                        <div class="flex gap-2">

                            <button class="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors" onclick="editEvent(${event.id})">Edit</button>

                            <button class="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors" onclick="deleteEvent(${event.id})">Delete</button>

                        </div>

                    </td>

                </tr>

            `).join('');

}



// Users management

function populateUsersTable() {

    const tableBody = document.getElementById('usersTable');

    if (!tableBody) return;



    tableBody.innerHTML = usersData.map(user => `

                <tr>

                    <td class="font-semibold text-gray-900">${user.name}</td>

                    <td class="text-gray-600">${user.email}</td>

                    <td class="text-gray-600">${user.department}</td>

                    <td class="text-gray-600">${user.year}</td>

                    <td class="text-gray-600">${user.events} events</td>

                    <td><span class="status-badge status-${user.status}">${capitalizeFirst(user.status)}</span></td>

                    <td>

                        <div class="flex gap-2">

                            <button class="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors" onclick="viewUser(${user.id})">View</button>

                            <button class="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors" onclick="editUser(${user.id})">Edit</button>

                        </div>

                    </td>

                </tr>

            `).join('');

}



// Announcements management

function populateAnnouncementsList() {

    const container = document.getElementById('announcementsList');

    if (!container) return;



    container.innerHTML = announcementsData.map(announcement => `

                <div class="flex items-start gap-4 p-4 glass-effect rounded-2xl hover:bg-white/50 transition-all">

                    <div class="w-4 h-4 rounded-full mt-1 ${getPriorityColor(announcement.priority)}"></div>

                    <div class="flex-1">

                        <div class="flex items-center gap-3 mb-2">

                            <h4 class="font-bold text-gray-900">${announcement.title}</h4>

                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">${announcement.category}</span>

                            <span class="px-2 py-1 ${getPriorityBadgeClass(announcement.priority)} rounded-full text-xs font-medium">${capitalizeFirst(announcement.priority)}</span>

                        </div>

                        <p class="text-gray-600 text-sm mb-2">${announcement.message}</p>

                        <div class="flex items-center gap-4 text-xs text-gray-500">

                            <span>${new Date(announcement.date).toLocaleDateString()}</span>

                            <span>By: ${announcement.author}</span>

                        </div>

                    </div>

                    <div class="flex gap-2">

                        <button class="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors" onclick="editAnnouncement(${announcement.id})">Edit</button>

                        <button class="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors" onclick="deleteAnnouncement(${announcement.id})">Delete</button>

                    </div>

                </div>

            `).join('');

}



// Form handlers

function createEvent(event) {

    event.preventDefault();

    showNotification('Event created successfully!', 'success');

    closeModal('createEventModal');

    // Add to events data and refresh table

    const newEvent = {

        id: eventsData.length + 1,

        title: event.target.querySelector('input[placeholder="Enter event title"]').value,

        date: event.target.querySelector('input[type="datetime-local"]').value,

        category: event.target.querySelector('select').value,

        registrations: 0,

        maxParticipants: parseInt(event.target.querySelector('input[type="number"]').value),

        status: 'active',

        organizer: event.target.querySelector('input[placeholder="Organizing committee"]').value

    };

    eventsData.push(newEvent);

    if (currentSection === 'events') populateEventsTable();

    return false;

}



function createAnnouncement(event) {

    event.preventDefault();

    const priority = document.getElementById('announcementPriority').value;

    const category = document.getElementById('announcementCategory').value;

    const title = document.getElementById('announcementTitle').value;

    const message = document.getElementById('announcementMessage').value;



    if (!title || !message) {

        showNotification('Please fill in all required fields.', 'error');

        return false;

    }



    const newAnnouncement = {

        id: announcementsData.length + 1,

        title: title,

        message: message,

        priority: priority,

        category: category,

        date: new Date().toISOString().split('T')[0],

        author: 'Admin'

    };



    announcementsData.unshift(newAnnouncement);

    populateAnnouncementsList();



    // Clear form

    document.getElementById('announcementTitle').value = '';

    document.getElementById('announcementMessage').value = '';



    showNotification('Announcement published successfully!', 'success');

    return false;

}



function createAnnouncementFromModal(event) {

    event.preventDefault();

    showNotification('Announcement published successfully!', 'success');

    closeModal('createAnnouncementModal');

    return false;

}



function addUser(event) {

    event.preventDefault();

    showNotification('User added successfully!', 'success');

    closeModal('addUserModal');

    return false;

}



// Action functions

function editEvent(id) {

    showNotification('Edit event functionality would open here', 'info');

}



function deleteEvent(id) {

    if (confirm('Are you sure you want to delete this event?')) {

        eventsData = eventsData.filter(event => event.id !== id);

        populateEventsTable();

        showNotification('Event deleted successfully', 'success');

    }

}



function viewUser(id) {

    const user = usersData.find(u => u.id === id);

    if (user) {

        showNotification(`Viewing details for ${user.name}`, 'info');

    }

}



function editUser(id) {

    showNotification('Edit user functionality would open here', 'info');

}



function editAnnouncement(id) {

    showNotification('Edit announcement functionality would open here', 'info');

}



function deleteAnnouncement(id) {

    if (confirm('Are you sure you want to delete this announcement?')) {

        announcementsData = announcementsData.filter(ann => ann.id !== id);

        populateAnnouncementsList();

        showNotification('Announcement deleted successfully', 'success');

    }

}



// Charts initialization

function initializeCharts() {

    // User Trend Chart

    const userTrendCtx = document.getElementById('userTrendChart');

    if (userTrendCtx) {

        new Chart(userTrendCtx, {

            type: 'line',

            data: {

                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],

                datasets: [{

                    label: 'New Users',

                    data: [120, 190, 300, 500, 200, 300, 450, 300, 250, 400],

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

                        grid: { color: 'rgba(0,0,0,0.1)' }

                    },

                    x: {

                        grid: { color: 'rgba(0,0,0,0.1)' }

                    }

                },

                plugins: { legend: { display: false } }

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

                    data: [35, 25, 20, 20],

                    backgroundColor: ['#3b82f6', '#a855f7', '#10b981', '#f97316'],

                    borderWidth: 0

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: 'bottom',

                        labels: { usePointStyle: true, padding: 20 }

                    }

                }

            }

        });

    }



    // Registration Chart

    const registrationCtx = document.getElementById('registrationChart');

    if (registrationCtx) {

        new Chart(registrationCtx, {

            type: 'bar',

            data: {

                labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],

                datasets: [{

                    label: 'Registrations',

                    data: [800, 1200, 1500, 1100, 1300],

                    backgroundColor: 'rgba(168, 85, 247, 0.8)',

                    borderRadius: 8

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                scales: {

                    y: {

                        beginAtZero: true,

                        grid: { color: 'rgba(0,0,0,0.1)' }

                    },

                    x: {

                        grid: { display: false }

                    }

                },

                plugins: { legend: { display: false } }

            }

        });

    }

}



// Utility functions

function capitalizeFirst(str) {

    return str.charAt(0).toUpperCase() + str.slice(1);

}



function getPriorityColor(priority) {

    const colors = {

        'urgent': 'bg-red-500',

        'important': 'bg-orange-500',

        'normal': 'bg-green-500'

    };

    return colors[priority] || 'bg-gray-500';

}



function getPriorityBadgeClass(priority) {

    const classes = {

        'urgent': 'bg-red-100 text-red-800',

        'important': 'bg-orange-100 text-orange-800',

        'normal': 'bg-green-100 text-green-800'

    };

    return classes[priority] || 'bg-gray-100 text-gray-800';

}



// System functions

function showSystemAlerts() {

    const alerts = [

        { type: 'warning', message: 'Server disk space at 85% capacity', time: '5 min ago' },

        { type: 'error', message: 'Failed login attempts detected', time: '15 min ago' }

    ];



    let alertHtml = `

                <div class="fixed top-20 right-8 w-80 modern-card rounded-2xl p-6 z-[90] slide-in">

                    <div class="flex justify-between items-center mb-4">

                        <h3 class="text-lg font-bold text-gray-900">System Alerts</h3>

                        <button onclick="closeSystemAlerts()" class="text-gray-500 hover:text-gray-700">

                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>

                            </svg>

                        </button>

                    </div>

                    <div class="space-y-3">

            `;



    alerts.forEach(alert => {

        const icon = alert.type === 'error' ? '🚨' : '⚠️';

        alertHtml += `

                    <div class="flex items-start gap-3 p-3 glass-effect rounded-xl">

                        <span class="text-xl">${icon}</span>

                        <div>

                            <div class="font-semibold text-sm text-gray-900">${alert.message}</div>

                            <div class="text-xs text-gray-600">${alert.time}</div>

                        </div>

                    </div>

                `;

    });



    alertHtml += `

                    </div>

                    <button class="w-full mt-4 px-4 py-2 text-sm glass-effect rounded-xl hover:bg-white/50 transition-all">

                        View All Alerts

                    </button>

                </div>

            `;



    const existing = document.getElementById('systemAlertsPopup');

    if (existing) existing.remove();



    const popup = document.createElement('div');

    popup.id = 'systemAlertsPopup';

    popup.innerHTML = alertHtml;

    document.body.appendChild(popup);

}



function closeSystemAlerts() {

    const popup = document.getElementById('systemAlertsPopup');

    if (popup) popup.remove();

}



function logout() {

    if (confirm('Are you sure you want to logout?')) {

        showNotification('Logging out...', 'info');

        // Redirect to login page

        setTimeout(() => {

            window.location.href = 'login.html';

        }, 1500);

    }

}



// Search functionality

function initializeSearch() {

    const searchInput = document.getElementById('adminSearch');

    if (searchInput) {

        searchInput.addEventListener('input', function (e) {

            const searchTerm = e.target.value.toLowerCase().trim();



            if (searchTerm.length > 2) {

                performSearch(searchTerm);

            } else {

                clearSearchResults();

            }

        });

    }

}



function performSearch(term) {

    // Search based on current section

    if (currentSection === 'events') {

        const filtered = eventsData.filter(event =>

            event.title.toLowerCase().includes(term) ||

            event.category.toLowerCase().includes(term) ||

            event.organizer.toLowerCase().includes(term)

        );

        renderFilteredEvents(filtered);

    } else if (currentSection === 'users') {

        const filtered = usersData.filter(user =>

            user.name.toLowerCase().includes(term) ||

            user.email.toLowerCase().includes(term) ||

            user.department.toLowerCase().includes(term)

        );

        renderFilteredUsers(filtered);

    }

}



function clearSearchResults() {

    if (currentSection === 'events') {

        populateEventsTable();

    } else if (currentSection === 'users') {

        populateUsersTable();

    }

}



function renderFilteredEvents(events) {

    const tableBody = document.getElementById('eventsTable');

    if (!tableBody) return;



    if (events.length === 0) {

        tableBody.innerHTML = '<tr><td colspan="6" class="text-center text-gray-500 py-8">No events found</td></tr>';

        return;

    }



    tableBody.innerHTML = events.map(event => `

                <tr>

                    <td class="font-semibold text-gray-900">${event.title}</td>

                    <td class="text-gray-600">${new Date(event.date).toLocaleDateString()}</td>

                    <td><span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">${event.category}</span></td>

                    <td class="text-gray-600">${event.registrations}/${event.maxParticipants}</td>

                    <td><span class="status-badge status-${event.status}">${capitalizeFirst(event.status)}</span></td>

                    <td>

                        <div class="flex gap-2">

                            <button class="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors" onclick="editEvent(${event.id})">Edit</button>

                            <button class="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors" onclick="deleteEvent(${event.id})">Delete</button>

                        </div>

                    </td>

                </tr>

            `).join('');

}



function renderFilteredUsers(users) {

    const tableBody = document.getElementById('usersTable');

    if (!tableBody) return;



    if (users.length === 0) {

        tableBody.innerHTML = '<tr><td colspan="7" class="text-center text-gray-500 py-8">No users found</td></tr>';

        return;

    }



    tableBody.innerHTML = users.map(user => `

                <tr>

                    <td class="font-semibold text-gray-900">${user.name}</td>

                    <td class="text-gray-600">${user.email}</td>

                    <td class="text-gray-600">${user.department}</td>

                    <td class="text-gray-600">${user.year}</td>

                    <td class="text-gray-600">${user.events} events</td>

                    <td><span class="status-badge status-${user.status}">${capitalizeFirst(user.status)}</span></td>

                    <td>

                        <div class="flex gap-2">

                            <button class="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors" onclick="viewUser(${user.id})">View</button>

                            <button class="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors" onclick="editUser(${user.id})">Edit</button>

                        </div>

                    </td>

                </tr>

            `).join('');

}



// Notification system

function showNotification(message, type = 'success') {

    const notification = document.createElement('div');

    const bgColor = type === 'success' ? 'from-green-500 to-emerald-600' :

        type === 'error' ? 'from-red-500 to-red-600' :

            'from-blue-500 to-blue-600';



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



// Initialize everything

document.addEventListener('DOMContentLoaded', function () {

    initializeNavigation();

    initializeSearch();



    // Initialize overview charts

    const userTrendCtx = document.getElementById('userTrendChart');

    if (userTrendCtx) {

        new Chart(userTrendCtx, {

            type: 'line',

            data: {

                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],

                datasets: [{

                    label: 'New Users',

                    data: [120, 190, 300, 500, 200, 300, 450, 300, 250, 400],

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

                        grid: { color: 'rgba(0,0,0,0.1)' }

                    },

                    x: {

                        grid: { color: 'rgba(0,0,0,0.1)' }

                    }

                },

                plugins: { legend: { display: false } }

            }

        });

    }



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



    // Add animations to cards

    const animatedElements = document.querySelectorAll('.modern-card');

    animatedElements.forEach((el, index) => {

        el.style.animationDelay = `${index * 0.1}s`;

        el.classList.add('fade-in-up');

    });



    // Welcome notification

    setTimeout(() => {

        showNotification('Welcome to ZVENT Admin Dashboard!', 'success');

    }, 1000);

});

// Registration Chart

const registrationCtx = document.getElementById('registrationChart');

if (registrationCtx) {

    new Chart(registrationCtx, {

        type: 'bar',

        data: {

            labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],

            datasets: [{

                label: 'Registrations',

                data: [800, 1200, 1500, 1100, 1300],

                backgroundColor: 'rgba(168, 85, 247, 0.8)',

                borderRadius: 8

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                y: {

                    beginAtZero: true,

                    grid: { color: 'rgba(0,0,0,0.1)' }

                },

                x: {

                    grid: { display: false }

                }

            },

            plugins: { legend: { display: false } }

        }

    });

}





// Utility functions

function capitalizeFirst(str) {

    return str.charAt(0).toUpperCase() + str.slice(1);

}



function getPriorityColor(priority) {

    const colors = {

        'urgent': 'bg-red-500',

        'important': 'bg-orange-500',

        'normal': 'bg-green-500'

    };

    return colors[priority] || 'bg-gray-500';

}



function getPriorityBadgeClass(priority) {

    const classes = {

        'urgent': 'bg-red-100 text-red-800',

        'important': 'bg-orange-100 text-orange-800',

        'normal': 'bg-green-100 text-green-800'

    };

    return classes[priority] || 'bg-gray-100 text-gray-800';

}



// System functions

function showSystemAlerts() {

    const alerts = [

        { type: 'warning', message: 'Server disk space at 85% capacity', time: '5 min ago' },

        { type: 'error', message: 'Failed login attempts detected', time: '15 min ago' }

    ];



    let alertHtml = `

                <div class="fixed top-20 right-8 w-80 modern-card rounded-2xl p-6 z-[90] slide-in">

                    <div class="flex justify-between items-center mb-4">

                        <h3 class="text-lg font-bold text-gray-900">System Alerts</h3>

                        <button onclick="closeSystemAlerts()" class="text-gray-500 hover:text-gray-700">

                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>

                            </svg>

                        </button>

                    </div>

                    <div class="space-y-3">

            `;



    alerts.forEach(alert => {

        const icon = alert.type === 'error' ? '🚨' : '⚠️';

        alertHtml += `

                    <div class="flex items-start gap-3 p-3 glass-effect rounded-xl">

                        <span class="text-xl">${icon}</span>

                        <div>

                            <div class="font-semibold text-sm text-gray-900">${alert.message}</div>

                            <div class="text-xs text-gray-600">${alert.time}</div>

                        </div>

                    </div>

                `;

    });



    alertHtml += `

                    </div>

                    <button class="w-full mt-4 px-4 py-2 text-sm glass-effect rounded-xl hover:bg-white/50 transition-all">

                        View All Alerts

                    </button>

                </div>

            `;



    const existing = document.getElementById('systemAlertsPopup');

    if (existing) existing.remove();



    const popup = document.createElement('div');

    popup.id = 'systemAlertsPopup';

    popup.innerHTML = alertHtml;

    document.body.appendChild(popup);

}



function closeSystemAlerts() {

    const popup = document.getElementById('systemAlertsPopup');

    if (popup) popup.remove();

}



function logout() {

    if (confirm('Are you sure you want to logout?')) {

        showNotification('Logging out...', 'info');

        // Redirect to login page

        setTimeout(() => {

            window.location.href = 'login.html';

        }, 1500);

    }

}



// Search functionality

function initializeSearch() {

    const searchInput = document.getElementById('adminSearch');

    if (searchInput) {

        searchInput.addEventListener('input', function (e) {

            const searchTerm = e.target.value.toLowerCase().trim();



            if (searchTerm.length > 2) {

                performSearch(searchTerm);

            } else {

                clearSearchResults();

            }

        });

    }

}



function performSearch(term) {

    // Search based on current section

    if (currentSection === 'events') {

        const filtered = eventsData.filter(event =>

            event.title.toLowerCase().includes(term) ||

            event.category.toLowerCase().includes(term) ||

            event.organizer.toLowerCase().includes(term)

        );

        renderFilteredEvents(filtered);

    } else if (currentSection === 'users') {

        const filtered = usersData.filter(user =>

            user.name.toLowerCase().includes(term) ||

            user.email.toLowerCase().includes(term) ||

            user.department.toLowerCase().includes(term)

        );

        renderFilteredUsers(filtered);

    }

}



function clearSearchResults() {

    if (currentSection === 'events') {

        populateEventsTable();

    } else if (currentSection === 'users') {

        populateUsersTable();

    }

}



function renderFilteredEvents(events) {

    const tableBody = document.getElementById('eventsTable');

    if (!tableBody) return;



    if (events.length === 0) {

        tableBody.innerHTML = '<tr><td colspan="6" class="text-center text-gray-500 py-8">No events found</td></tr>';

        return;

    }



    tableBody.innerHTML = events.map(event => `

                <tr>

                    <td class="font-semibold text-gray-900">${event.title}</td>

                    <td class="text-gray-600">${new Date(event.date).toLocaleDateString()}</td>

                    <td><span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">${event.category}</span></td>

                    <td class="text-gray-600">${event.registrations}/${event.maxParticipants}</td>

                    <td><span class="status-badge status-${event.status}">${capitalizeFirst(event.status)}</span></td>

                    <td>

                        <div class="flex gap-2">

                            <button class="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors" onclick="editEvent(${event.id})">Edit</button>

                            <button class="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors" onclick="deleteEvent(${event.id})">Delete</button>

                        </div>

                    </td>

                </tr>

            `).join('');

}



function renderFilteredUsers(users) {

    const tableBody = document.getElementById('usersTable');

    if (!tableBody) return;



    if (users.length === 0) {

        tableBody.innerHTML = '<tr><td colspan="7" class="text-center text-gray-500 py-8">No users found</td></tr>';

        return;

    }



    tableBody.innerHTML = users.map(user => `

                <tr>

                    <td class="font-semibold text-gray-900">${user.name}</td>

                    <td class="text-gray-600">${user.email}</td>

                    <td class="text-gray-600">${user.department}</td>

                    <td class="text-gray-600">${user.year}</td>

                    <td class="text-gray-600">${user.events} events</td>

                    <td><span class="status-badge status-${user.status}">${capitalizeFirst(user.status)}</span></td>

                    <td>

                        <div class="flex gap-2">

                            <button class="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors" onclick="viewUser(${user.id})">View</button>

                            <button class="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors" onclick="editUser(${user.id})">Edit</button>

                        </div>

                    </td>

                </tr>

            `).join('');

}



// Notification system

function showNotification(message, type = 'success') {

    const notification = document.createElement('div');

    const bgColor = type === 'success' ? 'from-green-500 to-emerald-600' :

        type === 'error' ? 'from-red-500 to-red-600' :

            'from-blue-500 to-blue-600';



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



// Initialize everything

document.addEventListener('DOMContentLoaded', function () {

    initializeNavigation();

    initializeSearch();



    // Initialize overview charts

    const userTrendCtx = document.getElementById('userTrendChart');

    if (userTrendCtx) {

        new Chart(userTrendCtx, {

            type: 'line',

            data: {

                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],

                datasets: [{

                    label: 'New Users',

                    data: [120, 190, 300, 500, 200, 300, 450, 300, 250, 400],

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

                        grid: { color: 'rgba(0,0,0,0.1)' }

                    },

                    x: {

                        grid: { color: 'rgba(0,0,0,0.1)' }

                    }

                },

                plugins: { legend: { display: false } }

            }

        });

    }



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



    // Add animations to cards

    const animatedElements = document.querySelectorAll('.modern-card');

    animatedElements.forEach((el, index) => {

        el.style.animationDelay = `${index * 0.1}s`;

        el.classList.add('fade-in-up');

    });



    // Welcome notification

    setTimeout(() => {

        showNotification('Welcome to ZVENT Admin Dashboard!', 'success');

    }, 1000);

});


