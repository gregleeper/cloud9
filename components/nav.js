import Link from "next/link";
import { useCart } from "../pages/_app";
import { RiShoppingCartLine } from "react-icons/ri";
import DropdownMenu from "./dropdownMenu";
import { FcGoogle } from "react-icons/fc";
import { Auth } from "aws-amplify";

const Nav = ({ user, isManager, isStaff }) => {
  const { itemCount } = useCart();

  return (
    <nav className="py-6 border-b-2 border-gray-800 shadow">
      <div className="flex justify-between items-center">
        <ul className="flex justify-around w-8/12">
          <li className="nav-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/menu">
              <a>Menu</a>
            </Link>
          </li>

          {(isManager || isStaff) && (
            <li className="nav-item">
              <Link href="/orders">
                <a>Orders</a>
              </Link>
            </li>
          )}
        </ul>
        {user ? (
          <div className="flex justify-around mr-12">
            <DropdownMenu isManager isStaff />

            <div className="flex ml-4">
              <Link href="/cart">
                <a>
                  <div className="flex ml-4">
                    <RiShoppingCartLine className="text-3xl hover:text-gray-800" />
                    <span className="bg-blue-700 w-8 rounded-full -ml-4 text-center h-6 -mt-2 text-white">
                      {itemCount}
                    </span>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <div className="px-12 xl:w-2/12 lg:w-3/12 md:w-3/12 sm:w-4/12 w-5/12 ">
            <button
              className=" w-full border rounded-lg bg-white border-bluish-gray shadow py-1 px-2 transform hover:-translate-y-1 hover:scale-105"
              onClick={() => Auth.federatedSignIn({ provider: "Google" })}
            >
              <div className="flex items-center justify-around px-2">
                <FcGoogle className="lg:text-3xl md:text-xl sm:text-lg text-lg" />
                <span className="lg:text-lg md:text-md text-sm ">Sign In</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
