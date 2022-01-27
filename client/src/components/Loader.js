import React from "react";

export default function Loader() {
  return (
    <div className='flex justify-center items-center relative h-screen'>
      <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 absolute'></div>
    </div>
  );
}
