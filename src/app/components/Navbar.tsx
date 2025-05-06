// components/Navbar.tsx
import Link from "next/link";
import ChangeLanguage from "./ChangeLanguage";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 py-3 items-center">
        <div className="w-full flex flex-row justify-between">
          <div>
            <Link href="/users" className="hover:text-blue-600 text-black">
              Home
            </Link>
            <Link
              href="/ingredients"
              className="hover:text-blue-600 text-black ml-10"
            >
              Ingredients
            </Link>
          </div>
          
          <div>
            <ChangeLanguage />
          </div>

          {/* <Link href="/contact" className="hover:text-blue-600">Contact</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
