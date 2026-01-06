import React from "react";

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)",
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
    color: "#1a1a1a",
    margin: "0 0 0.5rem 0",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "1.25rem",
    color: "#6b7280",
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
    background: "#ffffff",
    borderRadius: "16px",
    padding: "2.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  cardHover: {
    transform: "scale(1.03)",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.08)",
  },
  icon: {
    fontSize: "4rem",
    marginBottom: "1.5rem",
    display: "block",
  },
  cardTitle: {
    fontSize: "1.75rem",
    fontWeight: "600",
    color: "#1a1a1a",
    margin: "0 0 0.75rem 0",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "#6b7280",
    lineHeight: "1.6",
    margin: "0 0 1.5rem 0",
    maxWidth: "280px",
  },
  button: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#ffffff",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(102, 126, 234, 0.3)",
  },
  buttonHover: {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 8px rgba(102, 126, 234, 0.4)",
  },
};

export default function Root(props) {
  const [hoveredCard, setHoveredCard] = React.useState(null);

  // Don't render if we're not on the root path (safeguard)
  if (window.location.pathname !== "/") {
    return null;
  }

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

  return (
    <div style={styles.container}>
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
    </div>
  );
}
