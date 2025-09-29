// Admin Authentication System
// This script checks if the user is authenticated as an admin before allowing access

// Check admin authentication on page load
document.addEventListener('DOMContentLoaded', function () {
    checkAdminAuth();
});

// Function to check if user is authenticated as admin
function checkAdminAuth() {
    const token = API.getAuthToken();
    const user = API.getUser();

    if (!token || !user) {
        // No authentication data found
        console.warn('No authentication data found, redirecting to login.');
        showAuthError('Authentication required. Please log in to access the admin panel.');
        redirectToLogin();
        return false;
    }

    // Check if user has admin role
    if (user.role !== 'admin') {
        console.warn('User is not an admin, access denied.');
        showAuthError('Access denied. Admin privileges required.');
        redirectToLogin();
        return false;
    }

    // User is authenticated as admin
    console.log('Admin authentication successful:', user);
    updateAdminUserInfo(user);
    return true;
}

// Function to show authentication error
function showAuthError(message) {
    // Show simple alert message
    alert('🚫 Access Denied!\n\n' + message + '\n\nYou will be redirected to the login page.');

    // Redirect immediately after alert
    redirectToLogin();
}

// Function to redirect to login page
function redirectToLogin() {
    // Clear any existing authentication data
    API.clearAuth();

    // Redirect to login page
    window.location.href = 'login.html';
}

// Function to update admin user info in the UI
function updateAdminUserInfo(user) {
    // Update admin name in sidebar
    const adminNameElement = document.querySelector('.sidebar .font-semibold');
    if (adminNameElement) {
        adminNameElement.textContent = user.firstName + ' ' + user.lastName;
    }

    // Update admin initial in avatar
    const adminInitialElement = document.querySelector('.sidebar .gradient-bg');
    if (adminInitialElement) {
        adminInitialElement.textContent = user.firstName.charAt(0).toUpperCase();
    }

    // Update admin email if there's a display for it
    const adminEmailElement = document.querySelector('.sidebar .text-xs.text-gray-600');
    if (adminEmailElement) {
        adminEmailElement.textContent = user.email;
    }
}

// Function to handle admin logout
function logout() {
    // Clear authentication data
    API.clearAuth();

    // Show logout confirmation
    showNotification('Logged out successfully', 'success');

    // Redirect to login page
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Function to show notification (if not already defined)
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

// Make logout function globally available
window.logout = logout;
