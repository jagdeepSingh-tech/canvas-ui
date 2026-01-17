const THEME_KEY = "app-theme";
const VALID_THEMES = ["light", "dark"];

/**
 * Initialize theme system
 * - Loads saved theme from localStorage
 * - Applies theme to document
 * - Sets up cross-app event listener
 */
export function initTheme() {
    const savedTheme = getTheme();
    applyTheme(savedTheme);

    // Listen for theme changes from other micro-frontends
    window.addEventListener("theme-change", (e) => {
        if (e.detail && VALID_THEMES.includes(e.detail)) {
            applyTheme(e.detail);
        }
    });
}

/**
 * Get current theme
 * @returns {string} Current theme ('light' or 'dark')
 */
export function getTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const currentTheme = document.documentElement.getAttribute("data-theme");

    // Priority: current DOM > localStorage > default
    if (currentTheme && VALID_THEMES.includes(currentTheme)) {
        return currentTheme;
    }
    if (savedTheme && VALID_THEMES.includes(savedTheme)) {
        return savedTheme;
    }
    return "light";
}

/**
 * Set theme
 * @param {string} theme - Theme to set ('light' or 'dark')
 */
export function setTheme(theme) {
    if (!VALID_THEMES.includes(theme)) {
        console.warn(`Invalid theme: ${theme}. Using 'light' instead.`);
        theme = "light";
    }

    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);

    // Notify all micro-frontends about theme change
    window.dispatchEvent(new CustomEvent("theme-change", { detail: theme }));
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme() {
    const current = getTheme();
    const next = current === "light" ? "dark" : "light";
    setTheme(next);
}

/**
 * Apply theme to document (internal helper)
 * @param {string} theme - Theme to apply
 */
function applyTheme(theme) {
    if (VALID_THEMES.includes(theme)) {
        document.documentElement.setAttribute("data-theme", theme);
    }
}
