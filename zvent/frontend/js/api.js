// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Get stored authentication token
function getAuthToken() {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
}

// Get stored user data
function getUser() {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Check if user is authenticated
function isAuthenticated() {
    const token = getAuthToken();
    const user = getUser();
    return !!(token && user);
}

// Clear authentication data
function clearAuth() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
}

// Make authenticated API request
async function authenticatedRequest(url, options = {}) {
    const token = getAuthToken();

    if (!token) {
        throw new Error('No authentication token found');
    }

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers
        }
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...defaultOptions,
        ...options
    });

    if (response.status === 401) {
        // Token expired or invalid
        clearAuth();
        window.location.href = 'login.html';
        return;
    }

    return response;
}

// Logout function
function logout() {
    clearAuth();
    window.location.href = 'login.html';
}

// Export functions for use in other files
window.API = {
    BASE_URL: API_BASE_URL,
    getAuthToken,
    getUser,
    isAuthenticated,
    clearAuth,
    authenticatedRequest,
    logout
};

// Also make API_BASE_URL available globally
window.API_BASE_URL = API_BASE_URL;
