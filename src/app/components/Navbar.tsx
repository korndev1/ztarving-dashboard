// components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="space-x-4">
          <Link href="/users" className="hover:text-blue-600 text-black">Home</Link>
          <Link href="/ingredients" className="hover:text-blue-600 text-black">Ingredients</Link>
          {/* <Link href="/contact" className="hover:text-blue-600">Contact</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
