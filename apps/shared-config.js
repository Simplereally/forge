/**
 * Shared configuration for all forge apps
 * Import this file in each app to centralize configuration
 */
const FORGE_CONFIG = {
    // Usage limits for free tier
    limits: {
        invoice: 3,
        qr: 5,
        password: 10,
        color: 5,
        screenshot: 3,
        readme: 5,
        meta: 10,
        json: 10,
        regex: 10,
        cron: 10,
        diff: 5,
        email: 5,
        font: 5,
        md: 10,
        api: 5
    },
    
    // CORS proxy configuration
    corsProxy: window.CORS_PROXY_URL || 'https://corsproxy.io/?',
    
    // Stripe payment links
    stripe: {
        proUpgrade: 'https://buy.stripe.com/your-payment-link',
        lifetime: 'https://buy.stripe.com/your-lifetime-link'
    },
    
    // Feature flags
    features: {
        enableAnalytics: typeof window !== 'undefined' && window.location.hostname !== 'localhost',
        enableDebug: typeof window !== 'undefined' && window.location.hostname === 'localhost',
        enablePro: true
    },
    
    // Storage keys
    storage: {
        usagePrefix: 'forge_usage_',
        lastResetPrefix: 'forge_last_reset_',
        proStatus: 'forge_pro_status',
        darkMode: 'forge_dark_mode'
    },
    
    // API endpoints (when applicable)
    api: {
        base: window.FORGE_API_URL || '',
        timeout: 30000 // 30 seconds
    }
};

// Utility functions for common operations
const FORGE_UTILS = {
    /**
     * Get usage count for an app
     * @param {string} appName - Name of the app (e.g., 'qr', 'invoice')
     * @returns {number} Current usage count
     */
    getUsageCount: function(appName) {
        try {
            return parseInt(localStorage.getItem(FORGE_CONFIG.storage.usagePrefix + appName) || '0', 10);
        } catch (e) {
            console.warn('Failed to read usage count:', e.message);
            return 0;
        }
    },
    
    /**
     * Increment usage count for an app
     * @param {string} appName - Name of the app
     * @returns {number} New usage count
     */
    incrementUsage: function(appName) {
        try {
            const current = this.getUsageCount(appName);
            const newCount = current + 1;
            localStorage.setItem(FORGE_CONFIG.storage.usagePrefix + appName, newCount.toString());
            return newCount;
        } catch (e) {
            console.warn('Failed to increment usage count:', e.message);
            return 0;
        }
    },
    
    /**
     * Check if user has reached the usage limit
     * @param {string} appName - Name of the app
     * @returns {boolean} True if limit reached
     */
    isLimitReached: function(appName) {
        const limit = FORGE_CONFIG.limits[appName];
        if (!limit) return false;
        return this.getUsageCount(appName) >= limit;
    },
    
    /**
     * Reset daily usage (call this on app load)
     * @param {string} appName - Name of the app
     */
    resetDailyUsage: function(appName) {
        try {
            const lastReset = localStorage.getItem(FORGE_CONFIG.storage.lastResetPrefix + appName);
            const today = new Date().toDateString();
            
            if (lastReset !== today) {
                localStorage.setItem(FORGE_CONFIG.storage.usagePrefix + appName, '0');
                localStorage.setItem(FORGE_CONFIG.storage.lastResetPrefix + appName, today);
            }
        } catch (e) {
            console.warn('Failed to reset daily usage:', e.message);
        }
    },
    
    /**
     * Check if user has pro status
     * @returns {boolean} True if pro user
     */
    isPro: function() {
        try {
            return localStorage.getItem(FORGE_CONFIG.storage.proStatus) === 'true';
        } catch (e) {
            console.warn('Failed to check pro status:', e.message);
            return false;
        }
    },
    
    /**
     * Show a toast notification
     * @param {string} message - Message to display
     * @param {string} type - 'success', 'error', 'warning', 'info'
     * @param {number} duration - Duration in ms (default 3000)
     */
    showToast: function(message, type = 'info', duration = 3000) {
        // Check if toast container exists, if not create it
        let container = document.getElementById('forge-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'forge-toast-container';
            container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:10px;';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = `forge-toast forge-toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-size: 14px;
            animation: slideIn 0.3s ease;
            background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#22c55e' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
};

// Export for module environments, attach to window for script tags
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FORGE_CONFIG, FORGE_UTILS };
} else {
    window.FORGE_CONFIG = FORGE_CONFIG;
    window.FORGE_UTILS = FORGE_UTILS;
}
