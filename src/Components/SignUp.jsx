import React from 'react'
import Button from "../Components/Button"


const SignUp = () => {
  return (
    <div className=" h-screen w-full bg-red-400 flex ">
      <div className="w-1/2 bg-slate-500 flex flex-col justify-center p-6">
        <p className=" text-6xl hover:underline m-4">Chronical</p>
        <p className=" text-5xl hover:underline m-4">Connect</p>

        <p className="text-xl m-4">
          seeks to empower individuals to share their unique narratives, find
          common ground with others, and contribute to a diverse tapestry of
          human experiences in a digital age.
        </p>
      </div>

      <div className=" w-1/2 flex justify-center items-center">
        {/* other details */}

        <form
          action=""
          className=" w-1/2   flex flex-col gap-6 justify-center items-center p-6 "
        >
          <input
            type="email"
            name=""
            id="email"
            placeholder="Email"
            className=" p-1 rounded-md placeholder:font-medium w-2/3"
          />

          <input
            type="password"
            name=""
            id="pas"
            placeholder="Password"
            className=" p-1 rounded-md placeholder:font-medium w-2/3 "
          />

          <Button Title="Sign Up" />
        </form>
      </div>
    </div>
  );
}

export default SignUp