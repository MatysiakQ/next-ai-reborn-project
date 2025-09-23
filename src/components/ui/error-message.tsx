import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
  showIcon?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Wystąpił błąd",
  message,
  onRetry,
  className,
  showIcon = true
}) => {
  return (
    <Alert variant="destructive" className={cn("my-4", className)}>
      {showIcon && <AlertTriangle className="h-4 w-4" />}
      <AlertTitle className="font-mono">{title}</AlertTitle>
      <AlertDescription className="font-mono">
        {message}
        {onRetry && (
          <div className="mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="h-8 px-3 font-mono"
            >
              <RefreshCw className="mr-2 h-3 w-3" />
              Spróbuj ponownie
            </Button>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;