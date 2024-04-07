import React from "react";

const Button = ({ Title = "" }) => {
  return (
    
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-full text-sm
        sm:bg-red-500 
      ">
        {Title}
      </button>
      
  
  );
};

export default Button;
