import { signOut } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  CiLogout,
  CiSearch,
  CiShoppingCart,
  CiUser,
} from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { CartReducerInitialState } from "../types/reducer-types";
import { User } from "../types/types";
import { Button } from "./ui/Button";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );
  const [open, setOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Error logging out");
      console.log(error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/search" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-6 h-20">
        {/* Logo */}
        <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center rounded-xl font-heading font-bold text-xl group-hover:rotate-12 transition-transform duration-300 shadow-md">E</div>
          <span className="font-heading font-bold text-2xl tracking-tight text-foreground">EasyBuy</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary relative group ${location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${location.pathname === link.path ? "scale-x-100" : ""}`}></span>
            </Link>
          ))}
        </div>

        {/* Icons & Actions */}
        <div className="flex items-center gap-4">
          <Link to="/search" className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <CiSearch className="text-2xl" />
          </Link>

          <Link to="/cart" className="p-2 text-muted-foreground hover:text-primary transition-colors relative">
            <CiShoppingCart className="text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-background">
                {cartItems.length}
              </span>
            )}
          </Link>

          {user?._id ? (
            <div className="relative">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
              >
                <CiUser className="text-2xl" />
              </button>

              {/* Dropdown */}
              {open && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-card text-card-foreground shadow-xl rounded-xl border border-border py-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-2 border-b border-border mb-2">
                      <p className="font-medium text-sm truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>

                    {user.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      to="/orders"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      My Orders
                    </Link>
                    <div className="border-t border-border mt-2 pt-2 px-4 pb-1">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full justify-start pl-2"
                        onClick={logout}
                      >
                        <CiLogout className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden md:block">
              <Link to="/login">
                <Button className="rounded-full px-6 font-semibold shadow-lg hover:shadow-primary/25">
                  Login
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-x-0 top-20 bg-background/95 backdrop-blur-lg border-b border-border p-6 md:hidden transition-all duration-300 ease-in-out ${menuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
            }`}
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`text-lg font-medium py-2 border-b border-border/50 ${location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            {!user && (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="pt-4">
                <Button className="w-full rounded-full">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
