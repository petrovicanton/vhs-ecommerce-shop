"use client";
import { useAppDispatch } from "@/hooks/storeHook";
import headerClassNames from "./headerClassNames";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiLoginBoxLine } from "react-icons/ri";
import { toggleCart } from "@/redux/features/cartSlice";
import useCartTotals from "@/hooks/useCartTotals";
import SignUp from "../SignUp/SignUp";
import { useState, useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";

const Header = () => {
  const { link, signupBtn, signinBtn, logoutBtn, cart } = headerClassNames;

  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0); // Initialize to 0 initially

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // handle user not authenticated
    },
  });

  const { totalQuantity } = useCartTotals();

  const dispatch = useAppDispatch();

  const toggleForm = () => {
    setIsSignUpFormOpen(!isSignUpFormOpen);
  };

  const signInHandler = async () => {
    try {
      await signIn();
    } catch (error) {
      console.log("SIGN IN ERROR", error);
    }
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 640) {
      setIsMobileMenuOpen(false);
    }
  }, [windowWidth]);

  return (
    <>
      <SignUp isSignUpFormOpen={isSignUpFormOpen} toggleForm={toggleForm} />
      <header className={`fixed w-full top-0 left-0 z-20 bg-transparent`}>
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className={`text-center font-bold text-xl hover:text-primary-light text-white`}
            >
              <h1>
                Retro
                <br /> Movie
                <br /> Mall
              </h1>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`sm:hidden text-white bg-transparent`}
          >
            ☰
          </button>

          <nav
            className={`sm:flex md:flex-row ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul
              className={`flex ${
                isMobileMenuOpen
                  ? "flex-col space-y-2 items-center"
                  : "space-x-6"
              }`}
            >
              <li>
                <button onClick={() => dispatch(toggleCart())} className={link}>
                  <span>
                    Cart
                    <AiOutlineShoppingCart className="inline-block text-3xl" />
                  </span>
                  <div className={cart}>{totalQuantity}</div>
                </button>
              </li>
              {session?.user ? (
                <>
                  <li>
                    <Link href="/orders/#currentOrder">
                      <button className="bg-VHSred ml-4 flex hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Orders
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => signOut()} className={logoutBtn}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button onClick={toggleForm} className={signupBtn}>
                      Sign Up
                    </button>
                  </li>
                  <li>
                    <button onClick={signInHandler} className={signinBtn}>
                      Sign In
                      <RiLoginBoxLine
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                          marginLeft: "12px",
                        }}
                        className={link}
                      />
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
