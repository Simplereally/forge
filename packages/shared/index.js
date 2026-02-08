/**
 * @forge/shared
 * 
 * Shared utilities and constants for Forge tools.
 * This package can be extended to include common functionality
 * that multiple apps need.
 */

// Common Forge CSS variables (for reference when building new tools)
export const FORGE_COLORS = {
  void: '#0a0a0b',
  charcoal: '#141417',
  gunmetal: '#1c1c21',
  steel: '#2a2a32',
  iron: '#4a4a55',
  silver: '#8b8b99',
  chrome: '#c4c4d4',
  white: '#f0f0f5',
  ember: '#ff6b35',
  flame: '#ff8c42',
  spark: '#ffb366',
  heat: '#ef4444',
};

// Common utility functions
export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generate a cryptographically secure random ID.
 * Uses crypto.getRandomValues() for security-grade randomness.
 * 
 * @param {number} length - Length of the ID (default: 8, max: 36)
 * @returns {string} - Random alphanumeric ID
 */
export function generateId(length = 8) {
  // Ensure we generate enough random bytes (each byte gives ~1.5 base36 chars)
  const byteLength = Math.ceil(length * 0.75) + 1;
  const array = new Uint8Array(byteLength);
  crypto.getRandomValues(array);
  
  // Convert to base36 string and truncate to desired length
  let result = '';
  for (const byte of array) {
    result += byte.toString(36);
  }
  return result.substring(0, length);
}

/**
 * Generate a cryptographically secure UUID v4.
 * Preferred for unique identifiers where format doesn't matter.
 * 
 * @returns {string} - UUID v4 string (e.g., "550e8400-e29b-41d4-a716-446655440000")
 */
export function generateUUID() {
  return crypto.randomUUID();
}
