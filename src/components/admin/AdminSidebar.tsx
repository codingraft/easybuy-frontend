import { useEffect, useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaGamepad,
  FaStopwatch,
} from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import {
  RiCoupon3Fill,
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";
import { Link, Location, useLocation } from "react-router-dom";
import { IconType } from "react-icons";

const AdminSidebar = () => {
  const location = useLocation();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <>
      {phoneActive && (
        <button
          id="hamburger"
          onClick={() => setShowModal(true)}
          className="fixed top-24 left-4 z-50 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
        >
          <HiMenuAlt4 className="text-2xl" />
        </button>
      )}

      <aside
        className={`bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto transition-all duration-300 ${phoneActive
          ? `fixed top-0 left-0 h-screen w-72 z-50 shadow-2xl ${showModal ? "translate-x-0" : "-translate-x-full"
          }`
          : "relative"
          }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            EasyBuy
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Admin Dashboard
          </p>
        </div>

        {/* Navigation Sections */}
        <div className="p-4 space-y-6">
          <DivOne location={location} />
          <DivTwo location={location} />
          <DivThree location={location} />
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200"
            >
              <span className="text-lg">🏠</span>
              <span className="text-sm">Home</span>
            </Link>
          </div>
        </div>

        {phoneActive && (
          <button
            onClick={() => setShowModal(false)}
            className="m-4 w-[calc(100%-2rem)] py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
          >
            Close
          </button>
        )}
      </aside>
    </>
  );
};

const DivOne = ({ location }: { location: Location }) => (
  <div>
    <h5 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-3">
      Dashboard
    </h5>
    <ul className="space-y-1">
      <Li
        url="/admin/dashboard"
        text="Dashboard"
        Icon={RiDashboardFill}
        location={location}
      />
      <Li
        url="/admin/product"
        text="Product"
        Icon={RiShoppingBag3Fill}
        location={location}
      />
      <Li
        url="/admin/customer"
        text="Customer"
        Icon={IoIosPeople}
        location={location}
      />
      <Li
        url="/admin/transaction"
        text="Transaction"
        Icon={AiFillFileText}
        location={location}
      />
    </ul>
  </div>
);

const DivTwo = ({ location }: { location: Location }) => (
  <div>
    <h5 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-3">
      Charts
    </h5>
    <ul className="space-y-1">
      <Li
        url="/admin/chart/bar"
        text="Bar"
        Icon={FaChartBar}
        location={location}
      />
      <Li
        url="/admin/chart/pie"
        text="Pie"
        Icon={FaChartPie}
        location={location}
      />
      <Li
        url="/admin/chart/line"
        text="Line"
        Icon={FaChartLine}
        location={location}
      />
    </ul>
  </div>
);

const DivThree = ({ location }: { location: Location }) => (
  <div>
    <h5 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-3">
      Apps
    </h5>
    <ul className="space-y-1">
      <Li
        url="/admin/app/stopwatch"
        text="Stopwatch"
        Icon={FaStopwatch}
        location={location}
      />
      <Li
        url="/admin/app/coupon"
        text="Coupon"
        Icon={RiCoupon3Fill}
        location={location}
      />
      <Li
        url="/admin/app/toss"
        text="Toss"
        Icon={FaGamepad}
        location={location}
      />
    </ul>
  </div>
);

interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}

const Li = ({ url, text, location, Icon }: LiProps) => {
  const isActive = location.pathname.includes(url);

  return (
    <li>
      <Link
        to={url}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${isActive
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
      >
        <Icon className={`text-lg ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`} />
        <span className="text-sm">{text}</span>
      </Link>
    </li>
  );
};

export default AdminSidebar;
