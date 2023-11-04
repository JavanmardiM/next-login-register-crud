import { storage } from "@/Utilities/storage";
import authService from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
      const subscription = authService.user.subscribe(x => setUser(x));
      return () => subscription.unsubscribe();
  }, []);

  if (!user) return null;

  const handleLogOut = () => {
    storage.clearToken();
    router.push({
      pathname: "/",
    });
  };

  if (typeof window !== "undefined" && !storage.getToken()) return null;

  return (
    <header
    //  className="bg-[#051236] bg-secondary h-14 top-0 flex justify-between items-center z-20 py-10 lg:px-40 w-full"
     >
      <div className="bg-[#0f0e17] bg-secondary hidden md:flex md:text-l text-white font-extrabold pb-10 w-full mx-auto border-b items-center justify-between py-10 md:px-[10%] lg:px-[20%] select-none">
        <Link key="home" href="/" className="text-l " aria-label="home">
          Home
        </Link>
        <Link key="about" href="/about" className="text-l " aria-label="about">
          About
        </Link>
        <button onClick={handleLogOut} className="text-l">
          Logout
        </button>
      </div>
      <div className="md:hidden bg-[#0f0e17] bg-secondary text-white text-center pt-5 select-none">
        <div className="flex justify-between text-lg font-extrabold px-[10%] py-5 select-none">
          <Link href="/" className="headerLink" aria-label="Home">
            Home
          </Link>
          <Link
            key="about"
            href="/about"
            className="text-l "
            aria-label="about"
          >
            About
          </Link>
          {/* <Link className="text-l ">Logout</Link> */}
          <button onClick={handleLogOut} className="text-l">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
