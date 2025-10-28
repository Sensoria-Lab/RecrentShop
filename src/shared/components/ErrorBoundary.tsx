import React, { Component, ReactNode } from 'react';
import { Button } from '../../shared/ui';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * Error Boundary component that catches JavaScript errors anywhere in the child component tree
 *
 * Features:
 * - Beautiful error UI with glass morphism design
 * - Reset functionality to recover from errors
 * - Development mode shows error details
 * - Production mode shows user-friendly message
 *
 * @example
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // You can also log to an error reporting service here
    // Example: logErrorToService(error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="max-w-2xl w-full">
            <div className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 md:p-12">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-2xl" />

              <div className="relative z-10">
                {/* Error Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 sm:w-12 sm:h-12 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Error Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-manrope font-bold text-white text-center mb-4">
                  Упс! Что-то пошло не так
                </h1>

                {/* Error Description */}
                <p className="text-base sm:text-lg text-white/70 text-center mb-8">
                  Произошла непредвиденная ошибка. Мы уже работаем над её исправлением.
                </p>

                {/* Error Details (Development only) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="mb-8 p-4 rounded-lg bg-black/40 border border-red-500/20">
                    <p className="text-sm font-mono text-red-400 mb-2">
                      <strong>Error:</strong> {this.state.error.toString()}
                    </p>
                    {this.state.errorInfo && (
                      <details className="mt-2">
                        <summary className="text-xs text-white/60 cursor-pointer hover:text-white/80">
                          Stack Trace
                        </summary>
                        <pre className="text-xs text-white/50 mt-2 overflow-x-auto">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </details>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    onClick={this.handleReset}
                    variant="primary"
                    size="lg"
                    fullWidth
                  >
                    Попробовать снова
                  </Button>
                  <Button
                    onClick={this.handleReload}
                    variant="secondary"
                    size="lg"
                    fullWidth
                  >
                    Обновить страницу
                  </Button>
                  <Button
                    onClick={this.handleGoHome}
                    variant="ghost"
                    size="lg"
                    fullWidth
                  >
                    На главную
                  </Button>
                </div>

                {/* Support Info */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm text-white/50 text-center">
                    Если проблема повторяется, пожалуйста, свяжитесь с нами
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
