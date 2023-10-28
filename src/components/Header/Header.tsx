"use client";
import { useAppDispatch } from "@/hooks/storeHook";
import headerClassNames from "./headerClassNames";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiLoginBoxLine } from "react-icons/ri";
import { toggleCart } from "@/redux/features/cartSlice";
import useCartTotals from "@/hooks/useCartTotals";
import SignUp from "../SignUp/SignUp";
import { useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react";

const Header = () => {
  const {
    header,
    container,
    logoContainer,
    link,
    logo,
    nav,
    ul,
    orders,
    signupBtn,
    signinBtn,
    logoutBtn,
    cart,
  } = headerClassNames;

  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);
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

  return (
    <>
      <SignUp isSignUpFormOpen={isSignUpFormOpen} toggleForm={toggleForm} />
      <header className={header}>
        <div className={container}>
          <Link href="/" className={logoContainer}>
            <h1 className={logo}>
              Retro
              <br /> Movie
              <br /> Mall
            </h1>
          </Link>

          <nav className={nav}>
            <ul className={ul}>
              <li>
                <button onClick={() => dispatch(toggleCart())} className={link}>
                  <span>
                    Cart
                    <AiOutlineShoppingCart className="inline-block text-3xl" />
                  </span>
                  <div className={cart}>{totalQuantity}</div>
                </button>
              </li>
              <li className="flex items-center justify-center h-7">
                {session?.user && (
                  <>
                    <Link href="/orders/#currentOrder" className={orders}>
                      Orders
                    </Link>
                    <button onClick={() => signOut()} className={logoutBtn}>
                      Logout
                    </button>
                  </>
                )}
                {!session?.user && (
                  <>
                    <button onClick={toggleForm} className={signupBtn}>
                      Sign Up
                    </button>
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
                  </>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
