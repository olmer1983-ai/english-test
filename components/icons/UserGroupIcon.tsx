import React from 'react';

const UserGroupIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962 3.996 2.07a3 3 0 0 1-3.996-2.07m0 0A3.002 3.002 0 0 1 9 5.25a3 3 0 0 1 6 0c0 1.657-1.343 3-3 3S9 6.907 9 5.25m1.509 7.023-3.996-2.07a3 3 0 0 0-3.996 2.07m0 0A3.002 3.002 0 0 0 3 18.75a3 3 0 0 0 6 0c0-1.657-1.343-3-3-3s-3 1.343-3 3m12-2.25a3 3 0 0 0-3-3s-3 1.343-3 3m3 3a3 3 0 0 0 3-3s-3-1.343-3-3m-1.5-2.25a3 3 0 0 0-3-3s-3 1.343-3 3m3 3a3 3 0 0 0 3-3s-3-1.343-3-3" />
  </svg>
);

export default UserGroupIcon;