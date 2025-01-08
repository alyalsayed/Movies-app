import React from 'react';

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return <div className="text-center text-gray-500 mt-8">{message}</div>;
};

export default EmptyState;