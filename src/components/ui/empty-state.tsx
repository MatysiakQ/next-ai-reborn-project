import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className
}) => {
  return (
    <Card className={cn("text-center py-8", className)}>
      <CardHeader>
        {icon && (
          <div className="flex justify-center mb-4 text-muted-foreground">
            {icon}
          </div>
        )}
        <CardTitle className="font-mono">{title}</CardTitle>
        {description && (
          <CardDescription className="font-mono">{description}</CardDescription>
        )}
      </CardHeader>
      {action && (
        <CardContent>
          <Button onClick={action.onClick} className="font-mono">
            {action.label}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default EmptyState;