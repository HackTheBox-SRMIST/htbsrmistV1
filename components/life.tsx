import React from 'react';

const Life: React.FC = () => {
  return (
    <div className="w-full p-4 flex justify-center items-center">
      <div className="w-full max-w-5xl rounded-3xl border-4 border-lime-400 bg-htb-navy p-32 relative overflow-hidden">
        <h1 className="text-center text-6xl font-bold">
          <span className="text-lime-400 opacity-90">Life In </span>
          <span className="text-lime-400 font-extrabold">HTB</span>
        </h1>
      </div>
    </div>
  );
};

export default Life;