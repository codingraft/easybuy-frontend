import { FormEvent, useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [coupon, setCoupon] = useState<string>("");

  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!includeNumbers && !includeCharacters && !includeSymbols)
      return alert("Please Select One At Least");

    let result: string = prefix || "";
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="admin-container">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide text-center mb-8">
              Coupon Generator
            </h1>

            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20">
              <form className="space-y-6" onSubmit={submitHandler}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Prefix Text</label>
                    <input
                      type="text"
                      placeholder="Text to include"
                      value={prefix}
                      onChange={(e) => setPrefix(e.target.value)}
                      maxLength={size}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Length</label>
                    <input
                      type="number"
                      placeholder="Coupon Length"
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                      min={8}
                      max={25}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <fieldset className="p-4 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                  <legend className="text-sm font-medium text-slate-600 dark:text-slate-400 px-2 uppercase tracking-wider">Include</legend>

                  <div className="flex flex-wrap gap-6 justify-center mt-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={() => setIncludeNumbers((prev) => !prev)}
                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all"
                      />
                      <span className="text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">Numbers</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={includeCharacters}
                        onChange={() => setIncludeCharacters((prev) => !prev)}
                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all"
                      />
                      <span className="text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">Characters</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={() => setIncludeSymbols((prev) => !prev)}
                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all"
                      />
                      <span className="text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">Symbols</span>
                    </label>
                  </div>
                </fieldset>

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold uppercase tracking-wider shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
                >
                  Generate
                </button>
              </form>

              {coupon && (
                <div className="mt-8 flex justify-center">
                  <div
                    className="relative group cursor-pointer"
                    onClick={() => copyText(coupon)}
                  >
                    <code className="block px-8 py-4 bg-slate-900 text-green-400 rounded-xl font-mono text-xl tracking-widest shadow-inner border border-slate-700 relative overflow-hidden">
                      {coupon}
                      <div className={`absolute inset-0 bg-blue-600/90 flex items-center justify-center transition-all duration-300 ${isCopied ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                        <span className="text-white font-bold uppercase tracking-wider">
                          {isCopied ? "Copied!" : "Copy"}
                        </span>
                      </div>
                    </code>
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Coupon;
