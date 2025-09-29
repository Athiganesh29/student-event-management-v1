// ZVENT Admin Dashboard JavaScript

// Main functionality for admin panel



// Sample data for demonstration

let eventsData = [

    {

        id: 1,

        name: "AI & Machine Learning Workshop",

        date: "2024-03-15T14:00",

        category: "Technology",

        registrations: 85,

        maxParticipants: 100,

        status: "Active",

        venue: "Computer Lab 1",

        organizer: "CS Department"

    },

    {

        id: 2,

        name: "Cultural Night 2024",

        date: "2024-03-20T18:00",

        category: "Cultural",

        registrations: 150,

        maxParticipants: 200,

        status: "Active",

        venue: "Main Auditorium",

        organizer: "Cultural Committee"

    },

    {

        id: 3,

        name: "Inter-College Football Championship",

        date: "2024-03-25T09:00",

        category: "Sports",

        registrations: 22,

        maxParticipants: 30,

        status: "Draft",

        venue: "Sports Ground",

        organizer: "Sports Committee"

    }

];



let usersData = [

    {

        id: 1,

        name: "Rahul Kumar",

        email: "rahul.kumar@university.edu",

        department: "Computer Science",

        year: "Third Year",

        studentId: "CS2022001",

        eventsRegistered: 5,

        status: "Active"

    },

    {

        id: 2,

        name: "Priya Sharma",

        email: "priya.sharma@university.edu",

        department: "Electronics",

        year: "Second Year",

        studentId: "EC2023015",

        eventsRegistered: 3,

        status: "Active"

    },

    {

        id: 3,

        name: "Arjun Patel",

        email: "arjun.patel@university.edu",

        department: "Mechanical",

        year: "Final Year",

        studentId: "ME2021045",

        eventsRegistered: 8,

        status: "Active"

    }

];



let announcementsData = [

    {

        id: 1,

        title: "System Maintenance Notice",

        message: "The ZVENT system will undergo scheduled maintenance on March 15th from 2:00 AM to 4:00 AM. During this time, the platform may be temporarily unavailable.",

        priority: "important",

        category: "technical",

        timestamp: "2024-03-10T10:30:00",

        author: "System Administrator"

    },

    {

        id: 2,

        title: "New Event Categories Available",

        message: "We've added new event categories including 'Workshop', 'Seminar', and 'Competition'. Organizers can now select more specific categories for better event classification.",

        priority: "normal",

        category: "general",

        timestamp: "2024-03-09T15:45:00",

        author: "Admin Team"

    },

    {

        id: 3,

        title: "Registration Deadline Extended",

        message: "Due to popular demand, the registration deadline for the Annual Tech Fest has been extended by one week. New deadline: March 25th, 2024.",

        priority: "urgent",

        category: "events",

        timestamp: "2024-03-08T12:00:00",

        author: "Event Coordinator"

    }

];



// Initialize dashboard

document.addEventListener('DOMContentLoaded', function () {

    initializeCharts();

    loadEventsTable();

    loadUsersTable();

    loadAnnouncementsList();

    setupNavigation();

    setupSearch();

});



// Navigation functionality

function setupNavigation() {

    const navItems = document.querySelectorAll('.nav-item');



    navItems.forEach(item => {

        item.addEventListener('click', function (e) {

            e.preventDefault();

            const sectionId = this.getAttribute('data-section');

            showSection(sectionId);



            // Update active nav item

            navItems.forEach(nav => nav.classList.remove('active'));

            this.classList.add('active');

        });

    });

}



// Show specific section

function showSection(sectionId) {

    // Hide all sections

    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {

        section.classList.remove('section-visible');

        section.classList.add('section-hidden');

    });



    // Show selected section

    const targetSection = document.getElementById(sectionId);

    if (targetSection) {

        targetSection.classList.remove('section-hidden');

        targetSection.classList.add('section-visible');

    }



    // Reinitialize charts if showing analytics

    if (sectionId === 'analytics') {

        setTimeout(() => {

            initializeAnalyticsCharts();

        }, 100);

    }

}



// Search functionality

function setupSearch() {

    const searchInput = document.getElementById('adminSearch');

    if (searchInput) {

        searchInput.addEventListener('input', function (e) {

            const query = e.target.value.toLowerCase();

            performSearch(query);

        });

    }

}



function performSearch(query) {

    if (!query) return;



    // Simple search implementation - in real app, this would query the backend

    console.log('Searching for:', query);



    // Show search results in a toast or modal

    showToast(`Searching for: "${query}"`);

}



// Chart initialization

function initializeCharts() {

    // User trend chart

    const userTrendCtx = document.getElementById('userTrendChart');

    if (userTrendCtx) {

        new Chart(userTrendCtx, {

            type: 'line',

            data: {

                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

                datasets: [{

                    label: 'New Users',

                    data: [120, 190, 300, 250, 420, 380],

                    borderColor: 'rgb(59, 130, 246)',

                    backgroundColor: 'rgba(59, 130, 246, 0.1)',

                    tension: 0.4

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        display: false

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        grid: {

                            color: 'rgba(0,0,0,0.1)'

                        }

                    },

                    x: {

                        grid: {

                            display: false

                        }

                    }

                }

            }

        });

    }

}



function initializeAnalyticsCharts() {

    // Category chart

    const categoryCtx = document.getElementById('categoryChart');

    if (categoryCtx) {

        new Chart(categoryCtx, {

            type: 'doughnut',

            data: {

                labels: ['Technology', 'Cultural', 'Sports', 'Academic'],

                datasets: [{

                    data: [35, 25, 20, 20],

                    backgroundColor: [

                        'rgb(59, 130, 246)',

                        'rgb(16, 185, 129)',

                        'rgb(245, 101, 101)',

                        'rgb(139, 92, 246)'

                    ]

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: 'bottom'

                    }

                }

            }

        });

    }



    // Registration chart

    const registrationCtx = document.getElementById('registrationChart');

    if (registrationCtx) {

        new Chart(registrationCtx, {

            type: 'bar',

            data: {

                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

                datasets: [{

                    label: 'Registrations',

                    data: [450, 520, 680, 590, 720, 640],

                    backgroundColor: 'rgba(59, 130, 246, 0.8)'

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        display: false

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true

                    }

                }

            }

        });

    }

}



// Events management

function loadEventsTable() {

    const tableBody = document.getElementById('eventsTable');

    if (!tableBody) return;



    tableBody.innerHTML = eventsData.map(event => `

        <tr class="hover:bg-gray-50 transition-colors">

            <td class="py-4 px-4 font-medium text-gray-900">${event.name}</td>

            <td class="py-4 px-4 text-gray-600">${formatDate(event.date)}</td>

            <td class="py-4 px-4">

                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">${event.category}</span>

            </td>

            <td class="py-4 px-4 text-gray-600">${event.registrations}/${event.maxParticipants}</td>

            <td class="py-4 px-4">

                <span class="px-3 py-1 ${getStatusColor(event.status)} rounded-full text-xs font-medium">${event.status}</span>

            </td>

            <td class="py-4 px-4">

                <div class="flex gap-2">

                    <button onclick="editEvent(${event.id})" class="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">

                        ✏️

                    </button>

                    <button onclick="deleteEvent(${event.id})" class="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Delete">

                        🗑️

                    </button>

                    <button onclick="viewEventDetails(${event.id})" class="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">

                        👁️

                    </button>

                </div>

            </td>

        </tr>

    `).join('');

}



function getStatusColor(status) {

    switch (status) {

        case 'Active': return 'bg-green-100 text-green-800';

        case 'Draft': return 'bg-yellow-100 text-yellow-800';

        case 'Completed': return 'bg-gray-100 text-gray-800';

        case 'Cancelled': return 'bg-red-100 text-red-800';

        default: return 'bg-gray-100 text-gray-800';

    }

}



function createEvent(event) {

    event.preventDefault();

    const formData = new FormData(event.target);



    // In a real application, this would send data to the server

    const newEvent = {

        id: eventsData.length + 1,

        name: formData.get('title') || event.target.querySelector('input[placeholder="Enter event title"]').value,

        date: event.target.querySelector('input[type="datetime-local"]').value,

        category: event.target.querySelector('select').value,

        venue: event.target.querySelector('input[placeholder="Enter venue"]').value,

        organizer: event.target.querySelector('input[placeholder="Organizing committee"]').value,

        maxParticipants: parseInt(event.target.querySelector('input[type="number"]').value),

        registrations: 0,

        status: 'Draft'

    };



    eventsData.push(newEvent);

    loadEventsTable();

    closeModal('createEventModal');

    showToast('Event created successfully!');



    return false;

}



function editEvent(eventId) {

    const event = eventsData.find(e => e.id === eventId);

    if (event) {

        // In a real application, this would open an edit modal with pre-filled data

        showToast(`Editing event: ${event.name}`);

    }

}



function deleteEvent(eventId) {

    if (confirm('Are you sure you want to delete this event?')) {

        eventsData = eventsData.filter(e => e.id !== eventId);

        loadEventsTable();

        showToast('Event deleted successfully!');

    }

}



function viewEventDetails(eventId) {

    const event = eventsData.find(e => e.id === eventId);

    if (event) {

        showToast(`Viewing details for: ${event.name}`);

    }

}



// Users management

function loadUsersTable() {

    const tableBody = document.getElementById('usersTable');

    if (!tableBody) return;



    tableBody.innerHTML = usersData.map(user => `

        <tr class="hover:bg-gray-50 transition-colors">

            <td class="py-4 px-4 font-medium text-gray-900">${user.name}</td>

            <td class="py-4 px-4 text-gray-600">${user.email}</td>

            <td class="py-4 px-4 text-gray-600">${user.department}</td>

            <td class="py-4 px-4 text-gray-600">${user.year}</td>

            <td class="py-4 px-4 text-gray-600">${user.eventsRegistered}</td>

            <td class="py-4 px-4">

                <span class="px-3 py-1 ${getUserStatusColor(user.status)} rounded-full text-xs font-medium">${user.status}</span>

            </td>

            <td class="py-4 px-4">

                <div class="flex gap-2">

                    <button onclick="editUser(${user.id})" class="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">

                        ✏️

                    </button>

                    <button onclick="deleteUser(${user.id})" class="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Delete">

                        🗑️

                    </button>

                    <button onclick="viewUserProfile(${user.id})" class="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Profile">

                        👁️

                    </button>

                </div>

            </td>

        </tr>

    `).join('');

}



function getUserStatusColor(status) {

    switch (status) {

        case 'Active': return 'bg-green-100 text-green-800';

        case 'Inactive': return 'bg-red-100 text-red-800';

        case 'Suspended': return 'bg-yellow-100 text-yellow-800';

        default: return 'bg-gray-100 text-gray-800';

    }

}



function addUser(event) {

    event.preventDefault();



    const formData = {

        id: usersData.length + 1,

        name: event.target.querySelector('input[placeholder="Enter full name"]').value,

        email: event.target.querySelector('input[type="email"]').value,

        department: event.target.querySelector('select').value,

        year: event.target.querySelectorAll('select')[1].value,

        studentId: event.target.querySelector('input[placeholder="CS2025001"]').value,

        eventsRegistered: 0,

        status: 'Active'

    };



    // Convert department and year codes to readable names

    const departmentNames = {

        'cs': 'Computer Science',

        'ec': 'Electronics',

        'me': 'Mechanical',

        'ce': 'Civil Engineering'

    };



    const yearNames = {

        '1': 'First Year',

        '2': 'Second Year',

        '3': 'Third Year',

        '4': 'Final Year'

    };



    formData.department = departmentNames[formData.department] || formData.department;

    formData.year = yearNames[formData.year] || formData.year;



    usersData.push(formData);

    loadUsersTable();

    closeModal('addUserModal');

    showToast('User added successfully!');



    return false;

}



function editUser(userId) {

    const user = usersData.find(u => u.id === userId);

    if (user) {

        showToast(`Editing user: ${user.name}`);

    }

}



function deleteUser(userId) {

    if (confirm('Are you sure you want to delete this user?')) {

        usersData = usersData.filter(u => u.id !== userId);

        loadUsersTable();

        showToast('User deleted successfully!');

    }

}



function viewUserProfile(userId) {

    const user = usersData.find(u => u.id === userId);

    if (user) {

        showToast(`Viewing profile for: ${user.name}`);

    }

}



// Announcements management

function loadAnnouncementsList() {

    const listContainer = document.getElementById('announcementsList');

    if (!listContainer) return;



    listContainer.innerHTML = announcementsData.map(announcement => `

        <div class="p-4 glass-effect rounded-xl border-l-4 ${getPriorityBorderColor(announcement.priority)}">

            <div class="flex justify-between items-start mb-2">

                <h4 class="font-semibold text-gray-900">${announcement.title}</h4>

                <div class="flex gap-2">

                    <span class="px-2 py-1 ${getPriorityColor(announcement.priority)} rounded text-xs font-medium">${announcement.priority.toUpperCase()}</span>

                    <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">${announcement.category}</span>

                </div>

            </div>

            <p class="text-gray-600 text-sm mb-3">${announcement.message}</p>

            <div class="flex justify-between items-center text-xs text-gray-500">

                <span>By ${announcement.author}</span>

                <span>${formatDate(announcement.timestamp)}</span>

            </div>

            <div class="flex gap-2 mt-3">

                <button onclick="editAnnouncement(${announcement.id})" class="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors">

                    Edit

                </button>

                <button onclick="deleteAnnouncement(${announcement.id})" class="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors">

                    Delete

                </button>

            </div>

        </div>

    `).join('');

}



function getPriorityColor(priority) {

    switch (priority) {

        case 'urgent': return 'bg-red-100 text-red-800';

        case 'important': return 'bg-orange-100 text-orange-800';

        case 'normal': return 'bg-blue-100 text-blue-800';

        default: return 'bg-gray-100 text-gray-800';

    }

}



function getPriorityBorderColor(priority) {

    switch (priority) {

        case 'urgent': return 'border-red-500';

        case 'important': return 'border-orange-500';

        case 'normal': return 'border-blue-500';

        default: return 'border-gray-500';

    }

}



function createAnnouncement(event) {

    event.preventDefault();



    const priority = document.getElementById('announcementPriority').value;

    const category = document.getElementById('announcementCategory').value;

    const title = document.getElementById('announcementTitle').value;

    const message = document.getElementById('announcementMessage').value;



    if (!title || !message) {

        showToast('Please fill in all required fields!', 'error');

        return false;

    }



    const newAnnouncement = {

        id: announcementsData.length + 1,

        title,

        message,

        priority,

        category,

        timestamp: new Date().toISOString(),

        author: 'Admin User'

    };



    announcementsData.unshift(newAnnouncement);

    loadAnnouncementsList();



    // Clear form

    document.getElementById('announcementTitle').value = '';

    document.getElementById('announcementMessage').value = '';



    showToast('Announcement created successfully!');

    return false;

}



function createAnnouncementFromModal(event) {

    event.preventDefault();



    const selects = event.target.querySelectorAll('select');

    const inputs = event.target.querySelectorAll('input, textarea');



    const newAnnouncement = {

        id: announcementsData.length + 1,

        title: inputs[0].value,

        message: inputs[1].value,

        priority: selects[0].value,

        category: selects[1].value,

        timestamp: new Date().toISOString(),

        author: 'Admin User'

    };



    announcementsData.unshift(newAnnouncement);

    loadAnnouncementsList();

    closeModal('createAnnouncementModal');

    showToast('Announcement published successfully!');



    return false;

}



function editAnnouncement(announcementId) {

    const announcement = announcementsData.find(a => a.id === announcementId);

    if (announcement) {

        showToast(`Editing announcement: ${announcement.title}`);

    }

}



function deleteAnnouncement(announcementId) {

    if (confirm('Are you sure you want to delete this announcement?')) {

        announcementsData = announcementsData.filter(a => a.id !== announcementId);

        loadAnnouncementsList();

        showToast('Announcement deleted successfully!');

    }

}



// Modal management

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



// Utility functions

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {

        year: 'numeric',

        month: 'short',

        day: 'numeric',

        hour: '2-digit',

        minute: '2-digit'

    });

}



function showToast(message, type = 'success') {

    // Create toast element

    const toast = document.createElement('div');

    toast.className = `fixed top-4 right-4 z-[200] px-6 py-4 rounded-xl shadow-lg transition-all duration-300 transform translate-x-full ${type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'

        }`;

    toast.textContent = message;



    document.body.appendChild(toast);



    // Show toast

    setTimeout(() => {

        toast.classList.remove('translate-x-full');

    }, 100);



    // Hide toast

    setTimeout(() => {

        toast.classList.add('translate-x-full');

        setTimeout(() => {

            if (toast.parentNode) {

                toast.parentNode.removeChild(toast);

            }

        }, 300);

    }, 3000);

}



function showSystemAlerts() {

    showToast('System alerts: 2 pending notifications');

}



function logout() {

    if (confirm('Are you sure you want to logout?')) {

        // In a real application, this would clear session and redirect

        showToast('Logging out...', 'error');

        setTimeout(() => {

            window.location.href = '/login.html';

        }, 1500);

    }

}



// Close modals when clicking outside

document.addEventListener('click', function (e) {

    if (e.target.classList.contains('modal-backdrop')) {

        const modalId = e.target.id;

        closeModal(modalId);

    }

});



// Keyboard shortcuts

document.addEventListener('keydown', function (e) {

    // Close modal with Escape key

    if (e.key === 'Escape') {

        const visibleModals = document.querySelectorAll('.modal-backdrop.opacity-100');

        visibleModals.forEach(modal => {

            closeModal(modal.id);

        });

    }



    // Quick actions with Ctrl+key combinations

    if (e.ctrlKey) {

        switch (e.key) {

            case 'e':

                e.preventDefault();

                openModal('createEventModal');

                break;

            case 'a':

                e.preventDefault();

                openModal('createAnnouncementModal');

                break;

            case 'u':

                e.preventDefault();

                openModal('addUserModal');

                break;

        }

    }

});


function deleteEvent(eventId) {

    if (confirm('Are you sure you want to delete this event?')) {

        eventsData = eventsData.filter(e => e.id !== eventId);

        loadEventsTable();

        showToast('Event deleted successfully!');

    }

}



function viewEventDetails(eventId) {

    const event = eventsData.find(e => e.id === eventId);

    if (event) {

        showToast(`Viewing details for: ${event.name}`);

    }

}



// Users management

function loadUsersTable() {

    const tableBody = document.getElementById('usersTable');

    if (!tableBody) return;



    tableBody.innerHTML = usersData.map(user => `

        <tr class="hover:bg-gray-50 transition-colors">

            <td class="py-4 px-4 font-medium text-gray-900">${user.name}</td>

            <td class="py-4 px-4 text-gray-600">${user.email}</td>

            <td class="py-4 px-4 text-gray-600">${user.department}</td>

            <td class="py-4 px-4 text-gray-600">${user.year}</td>

            <td class="py-4 px-4 text-gray-600">${user.eventsRegistered}</td>

            <td class="py-4 px-4">

                <span class="px-3 py-1 ${getUserStatusColor(user.status)} rounded-full text-xs font-medium">${user.status}</span>

            </td>

            <td class="py-4 px-4">

                <div class="flex gap-2">

                    <button onclick="editUser(${user.id})" class="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">

                        ✏️

                    </button>

                    <button onclick="deleteUser(${user.id})" class="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Delete">

                        🗑️

                    </button>

                    <button onclick="viewUserProfile(${user.id})" class="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Profile">

                        👁️

                    </button>

                </div>

            </td>

        </tr>

    `).join('');

}



function getUserStatusColor(status) {

    switch (status) {

        case 'Active': return 'bg-green-100 text-green-800';

        case 'Inactive': return 'bg-red-100 text-red-800';

        case 'Suspended': return 'bg-yellow-100 text-yellow-800';

        default: return 'bg-gray-100 text-gray-800';

    }

}



function addUser(event) {

    event.preventDefault();



    const formData = {

        id: usersData.length + 1,

        name: event.target.querySelector('input[placeholder="Enter full name"]').value,

        email: event.target.querySelector('input[type="email"]').value,

        department: event.target.querySelector('select').value,

        year: event.target.querySelectorAll('select')[1].value,

        studentId: event.target.querySelector('input[placeholder="CS2025001"]').value,

        eventsRegistered: 0,

        status: 'Active'

    };



    // Convert department and year codes to readable names

    const departmentNames = {

        'cs': 'Computer Science',

        'ec': 'Electronics',

        'me': 'Mechanical',

        'ce': 'Civil Engineering'

    };



    const yearNames = {

        '1': 'First Year',

        '2': 'Second Year',

        '3': 'Third Year',

        '4': 'Final Year'

    };



    formData.department = departmentNames[formData.department] || formData.department;

    formData.year = yearNames[formData.year] || formData.year;



    usersData.push(formData);

    loadUsersTable();

    closeModal('addUserModal');

    showToast('User added successfully!');



    return false;

}



function editUser(userId) {

    const user = usersData.find(u => u.id === userId);

    if (user) {

        showToast(`Editing user: ${user.name}`);

    }

}



function deleteUser(userId) {

    if (confirm('Are you sure you want to delete this user?')) {

        usersData = usersData.filter(u => u.id !== userId);

        loadUsersTable();

        showToast('User deleted successfully!');

    }

}



function viewUserProfile(userId) {

    const user = usersData.find(u => u.id === userId);

    if (user) {

        showToast(`Viewing profile for: ${user.name}`);

    }

}



// Announcements management

function loadAnnouncementsList() {

    const listContainer = document.getElementById('announcementsList');

    if (!listContainer) return;



    listContainer.innerHTML = announcementsData.map(announcement => `

        <div class="p-4 glass-effect rounded-xl border-l-4 ${getPriorityBorderColor(announcement.priority)}">

            <div class="flex justify-between items-start mb-2">

                <h4 class="font-semibold text-gray-900">${announcement.title}</h4>

                <div class="flex gap-2">

                    <span class="px-2 py-1 ${getPriorityColor(announcement.priority)} rounded text-xs font-medium">${announcement.priority.toUpperCase()}</span>

                    <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">${announcement.category}</span>

                </div>

            </div>

            <p class="text-gray-600 text-sm mb-3">${announcement.message}</p>

            <div class="flex justify-between items-center text-xs text-gray-500">

                <span>By ${announcement.author}</span>

                <span>${formatDate(announcement.timestamp)}</span>

            </div>

            <div class="flex gap-2 mt-3">

                <button onclick="editAnnouncement(${announcement.id})" class="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors">

                    Edit

                </button>

                <button onclick="deleteAnnouncement(${announcement.id})" class="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors">

                    Delete

                </button>

            </div>

        </div>

    `).join('');

}



function getPriorityColor(priority) {

    switch (priority) {

        case 'urgent': return 'bg-red-100 text-red-800';

        case 'important': return 'bg-orange-100 text-orange-800';

        case 'normal': return 'bg-blue-100 text-blue-800';

        default: return 'bg-gray-100 text-gray-800';

    }

}



function getPriorityBorderColor(priority) {

    switch (priority) {

        case 'urgent': return 'border-red-500';

        case 'important': return 'border-orange-500';

        case 'normal': return 'border-blue-500';

        default: return 'border-gray-500';

    }

}



function createAnnouncement(event) {

    event.preventDefault();



    const priority = document.getElementById('announcementPriority').value;

    const category = document.getElementById('announcementCategory').value;

    const title = document.getElementById('announcementTitle').value;

    const message = document.getElementById('announcementMessage').value;



    if (!title || !message) {

        showToast('Please fill in all required fields!', 'error');

        return false;

    }



    const newAnnouncement = {

        id: announcementsData.length + 1,

        title,

        message,

        priority,

        category,

        timestamp: new Date().toISOString(),

        author: 'Admin User'

    };



    announcementsData.unshift(newAnnouncement);

    loadAnnouncementsList();



    // Clear form

    document.getElementById('announcementTitle').value = '';

    document.getElementById('announcementMessage').value = '';



    showToast('Announcement created successfully!');

    return false;

}



function createAnnouncementFromModal(event) {

    event.preventDefault();



    const selects = event.target.querySelectorAll('select');

    const inputs = event.target.querySelectorAll('input, textarea');



    const newAnnouncement = {

        id: announcementsData.length + 1,

        title: inputs[0].value,

        message: inputs[1].value,

        priority: selects[0].value,

        category: selects[1].value,

        timestamp: new Date().toISOString(),

        author: 'Admin User'

    };



    announcementsData.unshift(newAnnouncement);

    loadAnnouncementsList();

    closeModal('createAnnouncementModal');

    showToast('Announcement published successfully!');



    return false;

}



function editAnnouncement(announcementId) {

    const announcement = announcementsData.find(a => a.id === announcementId);

    if (announcement) {

        showToast(`Editing announcement: ${announcement.title}`);

    }

}



function deleteAnnouncement(announcementId) {

    if (confirm('Are you sure you want to delete this announcement?')) {

        announcementsData = announcementsData.filter(a => a.id !== announcementId);

        loadAnnouncementsList();

        showToast('Announcement deleted successfully!');

    }

}



// Modal management

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



// Utility functions

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {

        year: 'numeric',

        month: 'short',

        day: 'numeric',

        hour: '2-digit',

        minute: '2-digit'

    });

}



function showToast(message, type = 'success') {

    // Create toast element

    const toast = document.createElement('div');

    toast.className = `fixed top-4 right-4 z-[200] px-6 py-4 rounded-xl shadow-lg transition-all duration-300 transform translate-x-full ${type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'

        }`;

    toast.textContent = message;



    document.body.appendChild(toast);



    // Show toast

    setTimeout(() => {

        toast.classList.remove('translate-x-full');

    }, 100);



    // Hide toast

    setTimeout(() => {

        toast.classList.add('translate-x-full');

        setTimeout(() => {

            if (toast.parentNode) {

                toast.parentNode.removeChild(toast);

            }

        }, 300);

    }, 3000);

}



function showSystemAlerts() {

    showToast('System alerts: 2 pending notifications');

}



function logout() {

    if (confirm('Are you sure you want to logout?')) {

        // In a real application, this would clear session and redirect

        showToast('Logging out...', 'error');

        setTimeout(() => {

            window.location.href = '/login.html';

        }, 1500);

    }

}



// Close modals when clicking outside

document.addEventListener('click', function (e) {

    if (e.target.classList.contains('modal-backdrop')) {

        const modalId = e.target.id;

        closeModal(modalId);

    }

});



// Keyboard shortcuts

document.addEventListener('keydown', function (e) {

    // Close modal with Escape key

    if (e.key === 'Escape') {

        const visibleModals = document.querySelectorAll('.modal-backdrop.opacity-100');

        visibleModals.forEach(modal => {

            closeModal(modal.id);

        });

    }



    // Quick actions with Ctrl+key combinations

    if (e.ctrlKey) {

        switch (e.key) {

            case 'e':

                e.preventDefault();

                openModal('createEventModal');

                break;

            case 'a':

                e.preventDefault();

                openModal('createAnnouncementModal');

                break;

            case 'u':

                e.preventDefault();

                openModal('addUserModal');

                break;

        }

    }

});
