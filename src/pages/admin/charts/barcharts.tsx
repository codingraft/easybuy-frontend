import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { useBarQuery } from "../../../redux/api/dashboardApi";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../../components/Loader";
import { getlastMonths } from "../../../utils/features";


const { last6Months, last12Months } = getlastMonths();

const Barcharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, isError, error, data } = useBarQuery(user?._id || "");

  const products = data?.barCharts.products || [];
  const orders = data?.barCharts.orders || [];
  const users = data?.barCharts.users || [];

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
                Bar Charts
              </h1>

              <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20">
                <BarChart
                  data_1={products}
                  data_2={users}
                  labels={last6Months}
                  title_1="Products"
                  title_2="Users"
                  bgColor_1={`hsl(260, 50%, 30%)`}
                  bgColor_2={`hsl(360, 90%, 90%)`}
                />
                <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300 text-center mt-6 uppercase tracking-wider">
                  Top Products & Top Customers
                </h2>
              </section>

              <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20">
                <BarChart
                  horizontal={true}
                  data_1={orders}
                  data_2={[]}
                  title_1="Orders"
                  title_2=""
                  bgColor_1={`hsl(180, 40%, 50%)`}
                  bgColor_2=""
                  labels={last12Months}
                />
                <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300 text-center mt-6 uppercase tracking-wider">
                  Orders throughout the year
                </h2>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Barcharts;
