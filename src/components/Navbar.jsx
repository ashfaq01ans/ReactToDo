import React from "react";
import { FaGithub } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-indigo-900 text-white py-2">
      <div className="logo">
        <span className="font-bold text-xl mx-9"> iTask </span>
      </div>
      <ul className="flex gap-8 mx-9">
        {/* <li className='cursor-pointer hover:font-bold transition-all '>Home</li> */}
        <li className="cursor-pointer hover:font-bold transition-all flex items-center justify-center text-2xl ">
          {" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ashfaq01ans"
          >
            <FaGithub />
          </a>{" "}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
