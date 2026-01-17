import React, { useEffect, useState } from "react";
import { initTheme, toggleTheme, getTheme } from "./themeManager";
import Toast from "./Toast";

// Initialize theme immediately
initTheme();
window.toggleGlobalTheme = toggleTheme;

const styles = {
  container: {
    minHeight: "100vh",
    background: "var(--bg-secondary)",
    padding: "2rem 1rem",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "4rem",
    paddingTop: "2rem",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "700",
    color: "var(--text-primary)",
    margin: "0 0 0.5rem 0",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "1.25rem",
    color: "var(--text-secondary)",
    margin: "0",
    fontWeight: "400",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2rem",
    padding: "0 1rem",
  },
  card: {
    background: "var(--card-bg)",
    borderRadius: "16px",
    padding: "2.5rem",
    boxShadow: "var(--shadow-sm)",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid var(--border-color)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  cardHover: {
    transform: "scale(1.03)",
    boxShadow: "var(--shadow-md)",
  },
  icon: {
    fontSize: "4rem",
    marginBottom: "1.5rem",
    display: "block",
  },
  cardTitle: {
    fontSize: "1.75rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: "0 0 0.75rem 0",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
    margin: "0 0 1.5rem 0",
    maxWidth: "280px",
  },
  button: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#ffffff",
    background: "var(--accent)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(99, 102, 241, 0.3)",
  },
  buttonHover: {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 8px rgba(99, 102, 241, 0.4)",
    background: "var(--accent-hover)",
  },
};

export default function Root(props) {
  const [hoveredCard, setHoveredCard] = React.useState(null);
  const [currentTheme, setCurrentTheme] = useState(getTheme());

  const [toast, setToast] = useState(null);

  // Listen for theme changes and global toasts
  useEffect(() => {
    const handleThemeChange = (e) => {
      setCurrentTheme(e.detail);
    };

    const handleGlobalToast = (e) => {
      const { type, message, actionLabel, onAction } = e.detail;
      setToast({ type, message, actionLabel, onAction });
    };

    window.addEventListener("theme-change", handleThemeChange);
    window.addEventListener("global-toast", handleGlobalToast);

    return () => {
      window.removeEventListener("theme-change", handleThemeChange);
      window.removeEventListener("global-toast", handleGlobalToast);
    };
  }, []);

  const handleCardClick = (path) => {
    window.history.pushState({}, "", path);
    // Trigger a popstate event so single-spa can detect the route change
    window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
  };

  const handleCardMouseEnter = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
  };

  const getCardStyle = (cardId) => {
    return {
      ...styles.card,
      ...(hoveredCard === cardId ? styles.cardHover : {}),
    };
  };

  const getButtonStyle = (cardId) => {
    return {
      ...styles.button,
      ...(hoveredCard === cardId ? styles.buttonHover : {}),
    };
  };

  const [isRoot, setIsRoot] = useState(window.location.pathname === "/");

  useEffect(() => {
    const handleRouteChange = () => {
      setIsRoot(window.location.pathname === "/");
    };

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("single-spa:routing-event", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("single-spa:routing-event", handleRouteChange);
    };
  }, []);

  const containerStyle = isRoot
    ? styles.container
    : {
      ...styles.container,
      minHeight: 0,
      height: 0,
      padding: 0,
      background: "transparent",
      overflow: "visible",
    };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div style={containerStyle}>
      {isRoot && (
        <div style={styles.content}>
          <header style={styles.header}>
            <h1 style={styles.title}>Form Platform</h1>
            <p style={styles.subtitle}>Build and manage dynamic forms</p>
          </header>

          <div style={styles.grid}>
            <div
              style={getCardStyle("builder")}
              onClick={() => handleCardClick("/form-builder")}
              onMouseEnter={() => handleCardMouseEnter("builder")}
              onMouseLeave={handleCardMouseLeave}
            >
              <span style={styles.icon}>📝</span>
              <h2 style={styles.cardTitle}>Form Builder</h2>
              <p style={styles.cardDescription}>
                Create and customize dynamic forms with an intuitive drag-and-drop interface. Design forms that adapt to your needs.
              </p>
              <button style={getButtonStyle("builder")}>Open</button>
            </div>

            <div
              style={getCardStyle("viewer")}
              onClick={() => handleCardClick("/form-viewer")}
              onMouseEnter={() => handleCardMouseEnter("viewer")}
              onMouseLeave={handleCardMouseLeave}
            >
              <span style={styles.icon}>👁️</span>
              <h2 style={styles.cardTitle}>Form Viewer</h2>
              <p style={styles.cardDescription}>
                View and interact with your forms. Fill out forms, review submissions, and manage form data efficiently.
              </p>
              <button style={getButtonStyle("viewer")}>Open</button>
            </div>
          </div>
        </div>
      )}
      <button
        id="global-theme-toggle"
        onClick={handleThemeToggle}
        aria-label="Toggle theme"
        title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
      >
        {currentTheme === 'light' ? '🌙' : '☀️'}
      </button>

      {toast && (
        <Toast
          {...toast}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
