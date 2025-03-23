import { StrictMode } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/chat-widget.css';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#c0c0c0]">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but there was an error loading the application.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Analytics Component
const Analytics: React.FC = () => {
  React.useEffect(() => {
    // Track page views
    const trackPageView = () => {
      console.log('Page viewed:', window.location.pathname);
    };

    // Track user interactions
    const trackInteraction = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON') {
        console.log('Button clicked:', target.textContent);
      }
    };

    trackPageView();
    window.addEventListener('click', trackInteraction);

    return () => {
      window.removeEventListener('click', trackInteraction);
    };
  }, []);

  return null;
};

// Performance Monitoring Component
const PerformanceMonitor: React.FC = () => {
  React.useEffect(() => {
    // Monitor page load performance
    if (window.performance) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      console.log('Page load time:', loadTime, 'ms');
    }

    // Monitor resource loading
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          console.log('Resource loaded:', entry.name, entry.duration, 'ms');
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });

    return () => observer.disconnect();
  }, []);

  return null;
};

// Main App Wrapper
const AppWrapper: React.FC = () => {
  return (
    <ErrorBoundary>
      <Analytics />
      <PerformanceMonitor />
      <App />
    </ErrorBoundary>
  );
};

// Render the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
