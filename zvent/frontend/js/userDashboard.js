// User Dashboard Functions
// This file handles user-specific dashboard functionality

// Update user information in the dashboard
function updateUserInfo() {
    const user = API.getUser();
    if (user) {
        console.log('Updating dashboard with user info:', user);

        // Update header name
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = user.firstName;
        }

        // Update welcome message
        const welcomeElement = document.getElementById('welcomeMessage');
        if (welcomeElement) {
            welcomeElement.textContent = `Hello, ${user.firstName}! 👋`;
        }

        // Update profile name
        const profileNameElement = document.getElementById('profileName');
        if (profileNameElement) {
            profileNameElement.textContent = `${user.firstName} ${user.lastName}`;
        }

        // Update profile avatar initial
        const profileAvatar = document.querySelector('.w-24.h-24.gradient-purple');
        if (profileAvatar) {
            profileAvatar.textContent = user.firstName.charAt(0).toUpperCase();
        }

        // Update header avatar initial
        const headerAvatar = document.querySelector('.w-10.h-10.gradient-purple');
        if (headerAvatar) {
            headerAvatar.textContent = user.firstName.charAt(0).toUpperCase();
        }

        // Update welcome notification
        setTimeout(() => {
            if (typeof showNotification === 'function') {
                showNotification(`Welcome back, ${user.firstName}! Ready to explore events?`, 'success');
            }
        }, 1000);
    } else {
        console.log('No user data found, redirecting to login...');
        window.location.href = 'login.html';
    }
}

// Check if user is authenticated before showing dashboard
function checkDashboardAuth() {
    if (!API.isAuthenticated()) {
        console.log('User not authenticated, redirecting to login...');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Initialize dashboard with user data
function initializeUserDashboard() {
    if (checkDashboardAuth()) {
        updateUserInfo();
    }
}

// Call when page loads
document.addEventListener('DOMContentLoaded', function () {
    initializeUserDashboard();
});

// Export functions for use in other scripts
window.UserDashboard = {
    updateUserInfo,
    checkDashboardAuth,
    initializeUserDashboard
};
