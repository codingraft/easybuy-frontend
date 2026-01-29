import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useState, useEffect } from "react";

const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const hoursInString = hours.toString().padStart(2, "0");
  const minutesInString = minutes.toString().padStart(2, "0");
  const secondsInString = seconds.toString().padStart(2, "0");

  return `${hoursInString}:${minutesInString}:${secondsInString}`;
};

const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const resetHandler = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let intervalID: NodeJS.Timeout;
    if (isRunning)
      intervalID = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="admin-container">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide text-center mb-8">
              Stopwatch
            </h1>

            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-12 shadow-lg border border-white/20 flex flex-col items-center justify-center space-y-8 min-h-[400px]">
              <div className="text-6xl md:text-8xl font-mono font-bold text-slate-800 dark:text-slate-100 tracking-wider">
                {formatTime(time)}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsRunning((prev) => !prev)}
                  className={`px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-white shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 ${isRunning
                      ? "bg-red-500 hover:bg-red-600 shadow-red-500/30"
                      : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/30"
                    }`}
                >
                  {isRunning ? "Stop" : "Start"}
                </button>
                <button
                  onClick={resetHandler}
                  className="px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 shadow-lg transition-all transform hover:-translate-y-1 active:scale-95"
                >
                  Reset
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Stopwatch;
