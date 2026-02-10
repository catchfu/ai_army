/**
 * AI Army Demo — Login Form Validation
 * Modular client-side validation with accessible error handling.
 * No innerHTML usage — all DOM updates use textContent for XSS safety.
 */

// ============================================================
// Validation Rules
// ============================================================

/**
 * Validates an email address format.
 * @param {string} email - The email string to validate.
 * @returns {{ valid: boolean, message: string }}
 */
function validateEmail(email) {
    if (!email || email.trim() === '') {
        return { valid: false, message: 'Email is required.' };
    }
    // Standard email regex — covers 99% of real-world addresses
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
        return { valid: false, message: 'Please enter a valid email address.' };
    }
    return { valid: true, message: '' };
}

/**
 * Validates a password against minimum requirements.
 * @param {string} password - The password string to validate.
 * @returns {{ valid: boolean, message: string }}
 */
function validatePassword(password) {
    if (!password || password === '') {
        return { valid: false, message: 'Password is required.' };
    }
    if (password.length < 8) {
        return { valid: false, message: 'Password must be at least 8 characters.' };
    }
    return { valid: true, message: '' };
}

// ============================================================
// DOM Helpers
// ============================================================

/**
 * Shows a validation error on a form field.
 * Uses textContent (not innerHTML) to prevent XSS.
 * @param {HTMLInputElement} input - The input element.
 * @param {string} errorId - The ID of the error message span.
 * @param {string} message - The error message to display.
 */
function showError(input, errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
        errorEl.textContent = message;
    }
    input.classList.add('error');
    input.classList.remove('success');
}

/**
 * Clears a validation error from a form field.
 * @param {HTMLInputElement} input - The input element.
 * @param {string} errorId - The ID of the error message span.
 */
function clearError(input, errorId) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
        errorEl.textContent = '';
    }
    input.classList.remove('error');
    if (input.value.trim() !== '') {
        input.classList.add('success');
    }
}

/**
 * Validates a single field and updates UI accordingly.
 * @param {HTMLInputElement} input - The input element.
 * @param {string} errorId - The ID of the error message span.
 * @param {function} validatorFn - Validation function to use.
 * @returns {boolean} Whether the field is valid.
 */
function validateField(input, errorId, validatorFn) {
    const result = validatorFn(input.value);
    if (!result.valid) {
        showError(input, errorId, result.message);
        return false;
    }
    clearError(input, errorId);
    return true;
}

// ============================================================
// Form Initialization
// ============================================================

/**
 * Initializes all form event listeners.
 * Called on DOMContentLoaded to ensure all elements exist.
 */
function initLoginForm() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    const submitBtn = document.getElementById('submitBtn');

    if (!form || !emailInput || !passwordInput) {
        console.error('Login form elements not found in DOM.');
        return;
    }

    // --- Real-time Validation (on blur) ---
    emailInput.addEventListener('blur', function () {
        validateField(emailInput, 'emailError', validateEmail);
    });

    passwordInput.addEventListener('blur', function () {
        validateField(passwordInput, 'passwordError', validatePassword);
    });

    // --- Clear errors on typing ---
    emailInput.addEventListener('input', function () {
        if (emailInput.classList.contains('error')) {
            clearError(emailInput, 'emailError');
        }
    });

    passwordInput.addEventListener('input', function () {
        if (passwordInput.classList.contains('error')) {
            clearError(passwordInput, 'passwordError');
        }
    });

    // --- Password Toggle ---
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            toggleBtn.setAttribute('aria-label',
                isPassword ? 'Hide password' : 'Show password'
            );
        });
    }

    // --- Form Submission ---
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validate all fields
        const isEmailValid = validateField(emailInput, 'emailError', validateEmail);
        const isPasswordValid = validateField(passwordInput, 'passwordError', validatePassword);

        if (!isEmailValid || !isPasswordValid) {
            // Focus the first invalid field
            if (!isEmailValid) {
                emailInput.focus();
            } else {
                passwordInput.focus();
            }
            return;
        }

        // Simulate submission (loading state)
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        // Simulate async request (replace with real API call)
        setTimeout(function () {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');

            // Demo: show success (in real app, redirect or show dashboard)
            alert('Login successful! (Demo — no real authentication)');
        }, 1500);
    });
}

// --- Bootstrap ---
document.addEventListener('DOMContentLoaded', initLoginForm);
