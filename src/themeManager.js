const THEME_KEY = "app-theme";

export function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || "light";
    applyTheme(savedTheme);

    window.addEventListener("theme-change", (e) => {
        applyTheme(e.detail);
    });
}

export function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";

    localStorage.setItem(THEME_KEY, next);
    document.documentElement.setAttribute("data-theme", next);

    window.dispatchEvent(new CustomEvent("theme-change", { detail: next }));
}

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
}
