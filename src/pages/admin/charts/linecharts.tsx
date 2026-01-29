import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { Skeleton } from "../../../components/Loader";
import { useLineQuery } from "../../../redux/api/dashboardApi";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import { getlastMonths } from "../../../utils/features";

const { last12Months: months } = getlastMonths();
const Linecharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, isError, error, data } = useLineQuery(user?._id || "");

  const products = data?.lineCharts.products || [];
  const revenue = data?.lineCharts.revenue || [];
  const users = data?.lineCharts.users || [];
  const discount = data?.lineCharts.discount || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="admin-container">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {isLoading ? (
            <Skeleton count={10} />
          ) : (
            <div className="max-w-6xl mx-auto space-y-8">
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide mb-8">
                Line Charts
              </h1>

              <div className="space-y-8">
                <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20 transition-transform hover:scale-[1.01]">
                  <LineChart
                    data={users}
                    label="Users"
                    borderColor="rgb(53, 162, 255)"
                    labels={months}
                    backgroundColor="rgba(53, 162, 255, 0.5)"
                  />
                  <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300 text-center mt-6 uppercase tracking-wider">
                    Active Users
                  </h2>
                </section>

                <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20 transition-transform hover:scale-[1.01]">
                  <LineChart
                    data={products}
                    backgroundColor={"hsla(269,80%,40%,0.4)"}
                    borderColor={"hsl(269,80%,40%)"}
                    labels={months}
                    label="Products"
                  />
                  <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300 text-center mt-6 uppercase tracking-wider">
                    Total Products (SKU)
                  </h2>
                </section>

                <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20 transition-transform hover:scale-[1.01]">
                  <LineChart
                    data={revenue}
                    backgroundColor={"hsla(129,80%,40%,0.4)"}
                    borderColor={"hsl(129,80%,40%)"}
                    label="Revenue"
                    labels={months}
                  />
                  <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300 text-center mt-6 uppercase tracking-wider">
                    Total Revenue
                  </h2>
                </section>

                <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20 transition-transform hover:scale-[1.01]">
                  <LineChart
                    data={discount}
                    backgroundColor={"hsla(29,80%,40%,0.4)"}
                    borderColor={"hsl(29,80%,40%)"}
                    label="Discount"
                    labels={months}
                  />
                  <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300 text-center mt-6 uppercase tracking-wider">
                    Discount Allotted
                  </h2>
                </section>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Linecharts;
