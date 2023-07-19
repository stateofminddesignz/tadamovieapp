import React from "react";

function Header() {
  return (
    <>
      <div className="main-header h-60 bg-hero bg-cover">
        <div className="bg-black h-12 ">
          <nav className="flex justify-end ">
            <ul className="text-white flex mr-5 mt-2">
              <li>Home</li>
              <li className="ml-5">Watch List</li>
            </ul>
          </nav>
          <div className=" flex items-center justify-center  ">
            <h1 className="title text-white mt-11 bg-black bg-opacity-50 rounded-xl  ">TADA Movie Search</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
