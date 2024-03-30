import React from 'react'
import "../Style/SignUp.scss";
import Button from "../Components/Button"


const SignUp = () => {
  return (
    <div className="Signup">
      <div className="left">
        <p className="heading1">Chronical</p>
        <p className="heading2">Connect</p>

        <p className="signpara">
          seeks to empower individuals to share their unique narratives, find
          common ground with others, and contribute to a diverse tapestry of
          human experiences in a digital age.
        </p>
      </div>

      <div className="right">
        {/* other details */}

        <form action="">
    
            <input type="email" name="" id="email" placeholder='Email' />
   
            <input type="password" name="" id="pas" placeholder='Password' />

            <Button Title='Submit'/>
  
        </form>
      </div>
    </div>
  );
}

export default SignUp