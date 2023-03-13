import React from 'react'
import {Link} from "react-router-dom";

export default function Home() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <Link to="/login">Login</Link>
      <h1 className="p-3">
        Hello world!
      </h1>
    </div>
  )
}
