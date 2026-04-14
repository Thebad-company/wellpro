import React from 'react';
import { AlertTriangle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-6">
              <AlertTriangle className="h-16 w-16 text-red-600" />
            </div>
            <h1 className="text-4xl font-display font-black text-wellpro-navy mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 font-sans mb-8 leading-relaxed">
              We encountered an unexpected error. Our team has been notified and we're working to fix it.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
                <p className="text-xs font-mono text-red-700 break-words">
                  {this.state.error?.toString()}
                </p>
              </div>
            )}
            <Link to="/">
              <button className="inline-flex items-center gap-2 bg-wellpro-green hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
                <Home className="h-5 w-5" />
                Return to Home
              </button>
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
