import { Component } from "react";

// Shows the error on screen instead of a blank page
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "96px 24px", maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, marginBottom: 12 }}>Something went wrong</h2>
          <pre style={{ whiteSpace: "pre-wrap", color: "#fca5a5", fontSize: 14 }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <button onClick={() => (window.location.href = "/services")} style={{ marginTop: 16, padding: "10px 20px", border: "1px solid #444", borderRadius: 999 }}>
            Back to Services
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
