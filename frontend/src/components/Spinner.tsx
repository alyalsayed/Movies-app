import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-8">
      <span className="loading loading-spinner loading-lg text-blue-500"></span>
    </div>
  );
};

export default Spinner;
