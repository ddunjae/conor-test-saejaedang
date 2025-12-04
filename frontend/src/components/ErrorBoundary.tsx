import React, { Component, ErrorInfo, ReactNode } from 'react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h1>앗! 문제가 발생했습니다</h1>
            <h2>Oops! Something went wrong</h2>
            <p className="error-message">
              죄송합니다. 페이지를 표시하는 중 오류가 발생했습니다.
              <br />
              We're sorry, but something went wrong while displaying this page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Error details (Development only)</summary>
                <pre>{this.state.error.toString()}</pre>
              </details>
            )}
            <button
              className="error-button"
              onClick={() => window.location.reload()}
            >
              페이지 새로고침 / Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
