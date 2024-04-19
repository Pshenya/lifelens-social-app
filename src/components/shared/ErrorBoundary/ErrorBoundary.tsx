import React, { ReactNode } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  navigate: NavigateFunction;
  children?: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    const { navigate } = this.props;

    if (this.state.hasError) {
      console.log("ERRORRRR: ", this.state.error, this.state.errorInfo)
      return (
        <div className="error-container">
          <div className='flex flex-col'>
            <p className='max-w-[350px] md:max-w-5xl'>
              Ooops, something went wrong here.
            </p>
            <div className='flex justify-center items-center gap-2 mt-10 hover:svg-icon-primary-500'>
              <img src="/assets/icons/back_arrow.png" alt="404" className="size-6 svg-icon"/>
              <button className='back-home_btn' onClick={() => navigate('/')}>Homepage</button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}


export default function WrappedErrorBoundary(props: React.PropsWithChildren<object>) {
  const navigate = useNavigate();
  return <ErrorBoundary navigate={navigate} {...props} />;
}