
// Authentication helper functions

// Toast notification function
function showToast(message, type = 'success', duration = 3000) {
    const toastContainer = document.getElementById('toastContainer');

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3 min-w-80 max-w-96`;

    // Icon based on type
    const icon = type === 'success' ?
        '<svg class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>' :
        '<svg class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';

    toast.innerHTML = `
                ${icon}
                <div class="flex-1">
                    <p class="font-medium text-white">${message}</p>
                </div>
                <button onclick="this.parentElement.remove()" class="text-white/80 hover:text-white transition-colors duration-200">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
                <div class="toast-progress"></div>
            `;

    // Add to container
    toastContainer.appendChild(toast);

    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Auto remove after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }, duration);

    return toast;
}

// Password strength checker
function checkPasswordStrength(password) {
    const strengthIndicator = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('passwordStrengthText');

    let strength = 0;
    let feedback = [];

    // Length check
    if (password.length >= 8) strength += 1;
    else feedback.push('at least 8 characters');

    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 1;
    else feedback.push('uppercase letter');

    // Lowercase check
    if (/[a-z]/.test(password)) strength += 1;
    else feedback.push('lowercase letter');

    // Number check
    if (/\d/.test(password)) strength += 1;
    else feedback.push('number');

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    else feedback.push('special character');

    // Update UI based on strength
    strengthIndicator.className = 'password-strength';

    if (strength <= 2) {
        strengthIndicator.classList.add('strength-weak');
        strengthText.textContent = 'Weak password';
        strengthText.className = 'text-xs text-red-500 mt-1';
    } else if (strength === 3) {
        strengthIndicator.classList.add('strength-fair');
        strengthText.textContent = 'Fair password';
        strengthText.className = 'text-xs text-yellow-600 mt-1';
    } else if (strength === 4) {
        strengthIndicator.classList.add('strength-good');
        strengthText.textContent = 'Good password';
        strengthText.className = 'text-xs text-green-600 mt-1';
    } else {
        strengthIndicator.classList.add('strength-strong');
        strengthText.textContent = 'Strong password';
        strengthText.className = 'text-xs text-green-700 mt-1';
    }

    return strength;
}

// Password confirmation checker
function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const matchIndicator = document.getElementById('passwordMatch');

    if (confirmPassword === '') {
        matchIndicator.innerHTML = '';
        return;
    }

    if (password === confirmPassword) {
        matchIndicator.innerHTML = '<svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
    } else {
        matchIndicator.innerHTML = '<svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';
    }
}

// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function () {
    const password = document.getElementById('password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // Toggle eye icon
    this.innerHTML = type === 'password' ?
        '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>' :
        '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414l4.242 4.242m-4.242-4.242L8.464 8.464m7.071 7.071L17.95 17.95m-2.829-2.829L13.636 16.607m1.485-1.485L17.95 17.95"></path></svg>';
});

// Add event listeners
document.getElementById('password').addEventListener('input', function () {
    checkPasswordStrength(this.value);
});

document.getElementById('confirmPassword').addEventListener('input', checkPasswordMatch);

// API Configuration - using from api.js

// Form submission
document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    const newsletter = document.getElementById('newsletter').checked;

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    // Password match validation
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }

    // Password strength validation
    if (checkPasswordStrength(password) < 3) {
        showToast('Please choose a stronger password', 'error');
        return;
    }

    // Terms validation
    if (!terms) {
        showToast('Please accept the Terms of Service and Privacy Policy', 'error');
        return;
    }

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;

    try {
        // Send data to backend
        const apiUrl = API.BASE_URL || 'http://localhost:5000/api';
        const response = await fetch(`${apiUrl}/auth/signup`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                newsletter
            })
        });

        const data = await response.json();

        if (data.success) {
            // Show success toast
            showToast('🎉 Account created successfully! Redirecting to login page...', 'success', 4000);

            // Reset form
            this.reset();

            // Reset password strength indicator
            const strengthIndicator = document.getElementById('passwordStrength');
            const strengthText = document.getElementById('passwordStrengthText');
            strengthIndicator.className = 'password-strength bg-gray-300';
            strengthText.textContent = 'Password strength';
            strengthText.className = 'text-xs text-gray-500 mt-1';

            // Clear password match indicator
            document.getElementById('passwordMatch').innerHTML = '';

            // Redirect to login page after delay
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            // Show error message
            showToast(data.message || 'Failed to create account. Please try again.', 'error');
        }

    } catch (error) {
        console.error('Signup error:', error);
        showToast('Network error. Please check your connection and try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Add input focus effects
document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('transform', 'scale-[1.02]');
    });

    input.addEventListener('blur', function () {
        this.parentElement.classList.remove('transform', 'scale-[1.02]');
    });
});

// Initialize page when loaded
window.onload = function () {
    // Page initialization complete
};
