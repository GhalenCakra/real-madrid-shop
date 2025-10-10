// Initialize toast when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap toast
    const toastElement = document.getElementById('toast-component');
    if (toastElement) {
        window.bootstrapToast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 4000
        });
    }
});

function showToast(title, message, type = 'success', duration = 4000) {
    const toastElement = document.getElementById('toast-component');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');
    
    if (!toastElement) {
        console.error('Toast element not found');
        return;
    }

    // Remove previous background classes
    toastElement.classList.remove('text-bg-success', 'text-bg-danger', 'text-bg-warning', 'text-bg-info', 'text-bg-primary');
    
    // Set content
    toastTitle.textContent = title;
    toastMessage.textContent = message;

    // Set type styles and icon
    let icon = '✓';
    let bgClass = 'text-bg-success';
    
    switch (type) {
        case 'success':
            icon = '✓';
            bgClass = 'text-bg-success';
            break;
        case 'error':
            icon = '✕';
            bgClass = 'text-bg-danger';
            break;
        case 'warning':
            icon = '⚠';
            bgClass = 'text-bg-warning';
            break;
        case 'info':
            icon = 'ℹ';
            bgClass = 'text-bg-info';
            break;
        default:
            icon = '✓';
            bgClass = 'text-bg-primary';
    }

    // Apply styles
    toastElement.classList.add(bgClass);
    toastIcon.textContent = icon;

    // Update autohide delay if custom duration is provided
    if (window.bootstrapToast) {
        window.bootstrapToast._config.delay = duration;
        window.bootstrapToast.show();
    }
}

// Convenience functions for different toast types
function showSuccessToast(title, message, duration = 4000) {
    showToast(title, message, 'success', duration);
}

function showErrorToast(title, message, duration = 4000) {
    showToast(title, message, 'error', duration);
}

function showWarningToast(title, message, duration = 4000) {
    showToast(title, message, 'warning', duration);
}

function showInfoToast(title, message, duration = 4000) {
    showToast(title, message, 'info', duration);
}

// Make functions globally available
window.showToast = showToast;
window.showSuccessToast = showSuccessToast;
window.showErrorToast = showErrorToast;
window.showWarningToast = showWarningToast;
window.showInfoToast = showInfoToast;