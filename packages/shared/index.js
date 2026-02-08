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

export function generateId(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}
