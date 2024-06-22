import React from 'react';

function Layout ({ children }) {
  return (
    <div className='min-h-screen max-w-full flex flex-col justify-center items-center bg-gradient-to-r from-slate-800 to-slate-950 text-slate-50'>
      {children}
    </div>
  );
};

export default Layout;
