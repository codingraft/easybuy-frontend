import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { BarChart, DoughnutChart } from "../../components/admin/Charts";
import Table from "../../components/admin/DashboardTable";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Skeleton } from "../../components/Loader";
import { useStatsQuery } from "../../redux/api/dashboardApi";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { getlastMonths } from "../../utils/features";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, isError, error, data } = useStatsQuery(user?._id || "");

  const stats = data?.stats;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  const { last6Months: months } = getlastMonths();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="admin-container">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-8">
              <Skeleton count={10} />
            </div>
          ) : (
            <div className="p-4 md:p-8 space-y-6">
              {/* Top Bar */}
              <div className="flex items-center gap-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20">
                <div className="flex items-center flex-1 gap-3 bg-slate-100 dark:bg-slate-700/50 rounded-xl px-4 py-3">
                  <BsSearch className="text-slate-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Search for data, users, docs..."
                    className="flex-1 bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                  />
                </div>
                <button className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors relative">
                  <FaRegBell className="text-slate-600 dark:text-slate-300 text-xl" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <img
                  src={user?.image}
                  alt="User"
                  className="w-10 h-10 rounded-full ring-2 ring-blue-500/20 object-cover"
                />
              </div>

              {/* Stats Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <WidgetItem
                  percent={stats?.changePercent.revenue ?? 0}
                  amount={true}
                  value={stats?.count.revenue ?? 0}
                  heading="Revenue"
                  color="rgb(59, 130, 246)"
                  gradient="from-blue-500 to-blue-600"
                />
                <WidgetItem
                  percent={stats?.changePercent.user ?? 0}
                  value={stats?.count.user ?? 0}
                  color="rgb(14, 165, 233)"
                  heading="Users"
                  gradient="from-cyan-500 to-cyan-600"
                />
                <WidgetItem
                  percent={stats?.changePercent.order ?? 0}
                  value={stats?.count.order ?? 0}
                  color="rgb(251, 146, 60)"
                  heading="Transactions"
                  gradient="from-orange-500 to-orange-600"
                />
                <WidgetItem
                  percent={stats?.changePercent.product ?? 0}
                  value={stats?.count.product ?? 0}
                  color="rgb(168, 85, 247)"
                  heading="Products"
                  gradient="from-purple-500 to-purple-600"
                />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                    Revenue & Transactions
                  </h2>
                  <BarChart
                    labels={months}
                    data_1={stats?.chart.revenue ?? []}
                    data_2={stats?.chart.order ?? []}
                    title_1="Revenue"
                    title_2="Transaction"
                    bgColor_1="rgb(59, 130, 246)"
                    bgColor_2="rgba(14, 165, 233, 0.8)"
                  />
                </div>

                {/* Inventory Categories */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                    Inventory
                  </h2>
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
                    {stats?.categoryCount.map((i) => {
                      const [heading, value] = Object.entries(i)[0];
                      return (
                        <CategoryItem
                          key={heading}
                          value={value}
                          heading={heading}
                          color={`hsl(${value * 4}, 70%, 55%)`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gender Chart */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 text-center">
                    Gender Ratio
                  </h2>
                  <div className="relative">
                    <DoughnutChart
                      labels={["Female", "Male"]}
                      data={[
                        stats?.userGenderRatio.female ?? 0,
                        stats?.userGenderRatio.male ?? 0,
                      ]}
                      backgroundColor={[
                        "hsl(340, 82%, 56%)",
                        "rgba(59, 130, 246, 0.8)",
                      ]}
                      cutout={90}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <BiMaleFemale className="text-5xl text-slate-400 dark:text-slate-500" />
                    </div>
                  </div>
                </div>

                {/* Latest Transactions */}
                <div className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                    Latest Transactions
                  </h2>
                  <Table data={stats?.latestTransactions || []} />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
  gradient: string;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
  gradient,
}: WidgetItemProps) => {
  const isPositive = percent > 0;
  const displayPercent = Math.abs(percent) > 10000 ? 9999 : Math.abs(percent);

  return (
    <article className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Gradient accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} rounded-t-2xl`}></div>

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
            {heading}
          </p>
          <h4 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3">
            {amount ? `₹${value.toLocaleString()}` : value.toLocaleString()}
          </h4>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-semibold">
                <HiTrendingUp className="text-base" />
                +{displayPercent}%
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm font-semibold">
                <HiTrendingDown className="text-base" />
                {displayPercent}%
              </span>
            )}
            <span className="text-xs text-slate-400 ml-1">vs last month</span>
          </div>
        </div>

        {/* Circular Progress */}
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-slate-200 dark:text-slate-700"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke={color}
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${(Math.abs(percent) / 100) * 176} 176`}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold" style={{ color }}>
              {displayPercent}%
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="group">
    <div className="flex items-center justify-between mb-2">
      <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
        {heading}
      </h5>
      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
        {value}%
      </span>
    </div>
    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500 ease-out group-hover:opacity-80"
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>
  </div>
);

export default Dashboard;
