// Profile Page Handler
// Handles loading and displaying user profile data

// Show loading overlay
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.remove('opacity-0', 'invisible');
    overlay.classList.add('opacity-100', 'visible');
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.add('opacity-0', 'invisible');
    overlay.classList.remove('opacity-100', 'visible');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;

    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white'
    };

    notification.className += ` ${colors[type] || colors.info}`;
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <span class="text-lg">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Get authentication token
function getAuthToken() {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
}

// Check authentication
function checkAuth() {
    const token = getAuthToken();
    if (!token) {
        showNotification('Please log in to view your profile', 'error');
        setTimeout(() => {
            window.location.href = './login.html';
        }, 2000);
        return false;
    }
    return true;
}

// Load user profile data
async function loadProfileData() {
    if (!checkAuth()) return;

    showLoading();

    try {
        const [profileResponse, organizationResponse] = await Promise.all([
            fetch(`${window.API_BASE_URL}/profile`, {
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            }),
            fetch(`${window.API_BASE_URL}/organization`, {
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            })
        ]);

        let profileData = null;
        let organizationData = null;

        // Handle profile data
        if (profileResponse.ok) {
            const profileResult = await profileResponse.json();
            if (profileResult.success) {
                profileData = profileResult.data;
            }
        }

        // Handle organization data
        if (organizationResponse.ok) {
            const orgResult = await organizationResponse.json();
            if (orgResult.success) {
                organizationData = orgResult.data;
            }
        }

        // Populate the profile page
        populateProfilePage(profileData, organizationData);

    } catch (error) {
        console.error('Error loading profile data:', error);
        showNotification('Failed to load profile data', 'error');
    } finally {
        hideLoading();
    }
}

// Populate profile page with data
function populateProfilePage(profileData, organizationData) {
    // Update profile header
    if (profileData) {
        const fullName = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim();
        document.getElementById('profileName').textContent = fullName || 'User Name';
        document.getElementById('fullName').textContent = fullName || '-';
        document.getElementById('email').textContent = profileData.email || '-';
        document.getElementById('dateOfBirth').textContent = profileData.dateOfBirth ?
            new Date(profileData.dateOfBirth).toLocaleDateString() : '-';
        document.getElementById('gender').textContent = profileData.gender ?
            profileData.gender.charAt(0).toUpperCase() + profileData.gender.slice(1) : '-';
        document.getElementById('phone').textContent = profileData.phoneCode && profileData.mobile ?
            `${profileData.phoneCode} ${profileData.mobile}` : '-';
        document.getElementById('studentId').textContent = profileData.studentId || '-';
        document.getElementById('role').textContent = profileData.role ?
            profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1) : '-';
        document.getElementById('department').textContent = profileData.department || '-';
        document.getElementById('timezone').textContent = profileData.timezone || '-';
        document.getElementById('notifications').textContent = profileData.notifications ? 'Enabled' : 'Disabled';
        // Handle bio with truncation for very long text
        const bio = profileData.bio || 'No bio available';
        if (bio.length > 200) {
            document.getElementById('bio').innerHTML = `
                <div class="relative">
                    <p class="text-gray-700 leading-relaxed">${bio.substring(0, 200)}...</p>
                    <button onclick="toggleFullBio()" class="text-blue-600 hover:text-blue-800 text-sm mt-2">Show more</button>
                    <p class="text-gray-700 leading-relaxed hidden" id="fullBio">${bio}</p>
                </div>
            `;
        } else {
            document.getElementById('bio').textContent = bio;
        }

        // Update avatar with first letter of name
        const avatar = document.getElementById('profileAvatar');
        if (profileData.firstName) {
            avatar.textContent = profileData.firstName.charAt(0).toUpperCase();
        }

        // Update role display
        document.getElementById('profileRole').textContent = profileData.role ?
            profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1) : 'User';
        document.getElementById('profileDepartment').textContent = profileData.department || 'Department not specified';
    }

    // Update organization data
    if (organizationData) {
        document.getElementById('universityName').textContent = organizationData.universityName || '-';
        document.getElementById('campusLocation').textContent = organizationData.campusLocation || '-';
        document.getElementById('orgType').textContent = organizationData.orgType ?
            organizationData.orgType.replace('-', ' ').charAt(0).toUpperCase() +
            organizationData.orgType.replace('-', ' ').slice(1) : '-';
        document.getElementById('organizationName').textContent = organizationData.organizationName || '-';
        document.getElementById('position').textContent = organizationData.position ?
            organizationData.position.replace('-', ' ').charAt(0).toUpperCase() +
            organizationData.position.replace('-', ' ').slice(1) : '-';
        document.getElementById('orgSize').textContent = organizationData.orgSize ?
            organizationData.orgSize.charAt(0).toUpperCase() + organizationData.orgSize.slice(1) : '-';
        document.getElementById('contactEmail').textContent = organizationData.contactEmail || '-';
        document.getElementById('contactPhone').textContent = organizationData.contactPhone || '-';
        // Handle website URL with proper formatting
        const website = organizationData.website || '-';
        if (website !== '-' && website.length > 30) {
            // Create clickable link for long URLs
            const websiteElement = document.getElementById('website');
            websiteElement.innerHTML = `<a href="${website}" target="_blank" class="text-blue-600 hover:text-blue-800 underline break-all">${website}</a>`;
        } else {
            document.getElementById('website').textContent = website;
        }

        // Handle focus areas
        if (organizationData.focusAreas && organizationData.focusAreas.length > 0) {
            const focusAreasText = organizationData.focusAreas.map(area =>
                area.charAt(0).toUpperCase() + area.slice(1)
            ).join(', ');
            document.getElementById('focusAreas').textContent = focusAreasText;
        } else {
            document.getElementById('focusAreas').textContent = '-';
        }
    }

    // Calculate profile completion
    calculateProfileCompletion(profileData, organizationData);
}

// Calculate profile completion percentage
function calculateProfileCompletion(profileData, organizationData) {
    let completedFields = 0;
    let totalFields = 0;

    // Profile fields
    const profileFields = ['firstName', 'lastName', 'dateOfBirth', 'gender', 'phoneCode', 'mobile', 'studentId', 'role', 'department', 'timezone', 'bio'];
    profileFields.forEach(field => {
        totalFields++;
        if (profileData && profileData[field]) {
            completedFields++;
        }
    });

    // Organization fields
    const orgFields = ['universityName', 'campusLocation', 'orgType', 'organizationName', 'position', 'contactEmail', 'contactPhone'];
    orgFields.forEach(field => {
        totalFields++;
        if (organizationData && organizationData[field]) {
            completedFields++;
        }
    });

    const percentage = Math.round((completedFields / totalFields) * 100);

    // Update completion bar
    document.getElementById('completionPercentage').textContent = `${percentage}%`;
    document.getElementById('completionBar').style.width = `${percentage}%`;

    // Update last updated time
    const now = new Date();
    document.getElementById('lastUpdated').textContent = now.toLocaleDateString() + ' at ' + now.toLocaleTimeString();
}

// Edit profile function
function editProfile() {
    showNotification('Redirecting to profile editor...', 'info');
    setTimeout(() => {
        window.location.href = './register.html';
    }, 1000);
}

// Logout function
function logout() {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');

    showNotification('Logged out successfully!', 'success');

    setTimeout(() => {
        window.location.href = './login.html';
    }, 1500);
}

// Toggle full bio display
function toggleFullBio() {
    const shortBio = document.querySelector('#bio p');
    const fullBio = document.getElementById('fullBio');
    const toggleBtn = document.querySelector('#bio button');

    if (fullBio.classList.contains('hidden')) {
        shortBio.style.display = 'none';
        fullBio.classList.remove('hidden');
        toggleBtn.textContent = 'Show less';
    } else {
        shortBio.style.display = 'block';
        fullBio.classList.add('hidden');
        toggleBtn.textContent = 'Show more';
    }
}

// Initialize profile page
document.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
});
