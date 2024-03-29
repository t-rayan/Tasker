import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <svg
        className="inline-block 
        h-4
        w-4 
        animate-spin 
        rounded-full 
        border-[2px] 
        border-solid 
        border-slate-400
        border-current 
        border-r-transparent
        align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {/* <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle> */}
        {/* <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"
        ></path> */}
      </svg>
    </div>
  );
};

export default Spinner;
