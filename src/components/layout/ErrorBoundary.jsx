import { Component } from 'react';

/**
 * Last line of defence: if any card throws while rendering, the visitor gets a
 * calm fallback with a reload button instead of a blank page.
 */
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('Portfolio crashed while rendering:', error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main
        style={{
          minHeight: '100dvh',
          display: 'grid',
          placeItems: 'center',
          padding: '2rem',
          textAlign: 'center',
          color: 'var(--text)'
        }}
      >
        <div>
          <p style={{ fontSize: '1.1rem', margin: '0 0 1rem' }}>
            Something went wrong / Une erreur est survenue.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: '0.7rem 1.4rem',
              minHeight: 44,
              borderRadius: 999,
              border: '1px solid var(--card-border)',
              background: 'var(--card-bg)',
              color: 'var(--text)',
              fontSize: '1rem'
            }}
          >
            Reload / Recharger
          </button>
        </div>
      </main>
    );
  }
}
