import { useRef } from "react";
import { useDetectOutsideClick } from "../lib/useDetectOutsideClick";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { Auth } from "aws-amplify";

const DropdownMenu = ({ username, isManager, isStaff }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  console.log(Auth);

  return (
    <div className=" container">
      <div className="">
        <button
          onClick={onClick}
          className="border focus:outline-none shadow border-blue-900 text-gray-900 px-6 py-2 bg-white text-md transition-all duration-200 rounded-lg hover:bg-blue-800 hover:text-white"
        >
          <FaUser />
        </button>
        <div className="">
          <nav
            ref={dropdownRef}
            className={`w-64 -ml-24  absolute border ${
              isActive ? "visible" : "invisible"
            } border-gray-600 bg-white text-lg rounded-lg  text-gray-900 shadow-lg`}
          >
            <ul className=" divide-y divide-gray-400 mt-2">
              <li className=" hover:bg-blue-800 hover:text-white bg-opacity-50 transition-colors duration-300 ease-linear">
                <Link href="/profile">
                  <a className=" text-md">
                    <div className="flex items-center mt-2 mb-2 px-8 py-2 hover:bg-blue-800 hover:text-white bg-opacity-50 transition-colors duration-300 ease-linear">
                      My Orders
                    </div>
                  </a>
                </Link>
              </li>
              <li className=" ">
                <div className="flex items-center mt-2 px-8 py-2 hover:bg-blue-800 hover:text-white bg-opacity-50 transition-colors duration-300 ease-linear mb-2">
                  <button onClick={() => Auth.signOut()}>Sign Out</button>
                </div>
              </li>
              {(isManager || isStaff) && (
                <>
                  <li className=" ">
                    <Link href="/item/create">
                      <a className=" text-md hover:text-white">
                        <div className="flex items-center mt-2 mb-2 px-8 py-2 hover:bg-blue-800 hover:text-white bg-opacity-50 transition-colors duration-300 ease-linear">
                          Items
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li className=" ">
                    <Link href="/add-in/create">
                      <a className=" text-md hover:text-white">
                        <div className="flex items-center mt-2 mb-2 px-8 py-2 hover:bg-blue-800 hover:text-white bg-opacity-50 transition-colors duration-300 ease-linear">
                          Add-Ins
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li className=" ">
                    <Link href="/category/create">
                      <a className=" text-md hover:text-white">
                        <div className="flex items-center mt-2 px-8 py-2 hover:bg-blue-800 hover:text-white bg-opacity-50 transition-colors duration-300 ease-linear mb-2">
                          Categories
                        </div>
                      </a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
