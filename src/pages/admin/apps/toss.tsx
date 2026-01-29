import { useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";

import HeadImage from "../../../assets/images/heads.png";
import TailImage from "../../../assets/images/tails.png";

const Toss = () => {
  const [angle, setAngle] = useState<number>(0);

  const flipCoin = () => {
    if (Math.random() > 0.5) setAngle((prev) => prev + 180);
    else setAngle((prev) => prev + 360);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="admin-container">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide text-center mb-8">
              Coin Toss
            </h1>

            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-12 shadow-lg border border-white/20 flex flex-col items-center justify-center min-h-[400px]">
              <div
                className="relative w-64 h-64 transition-all duration-500 cursor-pointer [transform-style:preserve-3d]"
                style={{ transform: `rotateY(${angle}deg)` }}
                onClick={flipCoin}
              >
                <div className="absolute inset-0 w-full h-full rounded-full backface-hidden shadow-2xl">
                  <img src={HeadImage} alt="Heads" className="w-full h-full object-contain" />
                </div>
                <div className="absolute inset-0 w-full h-full rounded-full backface-hidden [transform:rotateY(180deg)] shadow-2xl">
                  <img src={TailImage} alt="Tails" className="w-full h-full object-contain" />
                </div>
              </div>

              <p className="mt-8 text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Click coin to flip
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Toss;
