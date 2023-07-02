import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to display an error message
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Render an error message
      return (
      <div className="points-error">
        <p>Yikes...Looks like you aren't Registered.</p>
        <p>Reload the page to try again.</p>
      </div>)
    }

    // Render the wrapped components
    return this.props.children;
  }
}

export default ErrorBoundary;
