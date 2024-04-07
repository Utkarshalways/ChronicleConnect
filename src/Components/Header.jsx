import React from 'react';
import { useState } from 'react';

const Header = () => {

  const [navOpen, setnavOpen] = useState(false);
  return (
    <header className="bg-purple-800 p-2 flex gap-2 items-center justify-between text-white">
      <div className="left flex gap-2 items-center mx-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png"
          alt=""
          className="h-8"
        />
        <p className=" font-bold">Logo</p>
      </div>

      <div
        className="HAMBURGER-ICON space-y-2 " 
        onClick={() => setnavOpen((prev) => !prev)} // toggle isNavOpen state on click
      >
      {console.log(navOpen)}
        <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
        <span className="block h-0.5 w-8 animate-bounce bg-white"></span>
        <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
      </div>

      <div className={!navOpen?"hidden":""}>
        <ul
          className="flex gap-2 items-center 
       "
        >
          <li className=" m-2 cursor-pointer hover:underline">Home</li>
          <li className=" m-2 cursor-pointer hover:underline">Post</li>
          <li className=" m-2 cursor-pointer hover:underline">Sign Up</li>
          <li className=" m-2 cursor-pointer hover:underline">Style</li>
        </ul>
      </div>
    </header>
  );
}

export default Header




{/*

  this was the first approach of making the navbar
  but now I have changed that approach

<header className="bg-purple-800 p-2 flex gap-2 items-center justify-between">
      <div className="left flex gap-2 items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png"
          alt=""
          className="h-8"
        />
        <p className=" font-bold">Logo</p>
      </div>
      <div className="right ">
        <ul className="flex gap-2 items-center">
          <li>Home</li>
          <li>Post</li>
          <li>Sign Up</li>
          <li>Style</li>
        </ul>
      </div>
</header>


*/}