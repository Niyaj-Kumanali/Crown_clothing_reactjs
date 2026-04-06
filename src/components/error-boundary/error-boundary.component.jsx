import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <div style={styles.card}>
            <span style={styles.icon}>⚠️</span>
            <h2 style={styles.heading}>Something went wrong</h2>
            <p style={styles.message}>
              {this.state.errorMessage || 'An unexpected error occurred.'}
            </p>
            <button style={styles.button} onClick={this.handleReset}>
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    padding: '2rem',
  },
  card: {
    textAlign: 'center',
    padding: '3rem 4rem',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    maxWidth: '480px',
    width: '100%',
  },
  icon: {
    fontSize: '3rem',
    display: 'block',
    marginBottom: '1rem',
  },
  heading: {
    fontFamily: "'Open Sans Condensed', sans-serif",
    fontSize: '1.8rem',
    fontWeight: 700,
    margin: '0 0 0.75rem',
    color: '#1a1a1a',
  },
  message: {
    color: '#666',
    fontSize: '0.95rem',
    marginBottom: '2rem',
    lineHeight: 1.6,
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 2rem',
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  },
};

export default ErrorBoundary;
