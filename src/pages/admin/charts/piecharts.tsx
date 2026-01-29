import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { Skeleton } from "../../../components/Loader";
import { usePieQuery } from "../../../redux/api/dashboardApi";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";

const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, isError, error, data } = usePieQuery(user?._id || "");

  const charts = data?.charts;

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
            <div className="max-w-7xl mx-auto space-y-8">
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide mb-8">
                Pie & Doughnut Charts
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 flex flex-col items-center">
                  <div className="w-full aspect-square relative mb-4">
                    <PieChart
                      labels={["Processing", "Shipped", "Delivered"]}
                      data={[
                        charts?.orderFullfillment.processing || 0,
                        charts?.orderFullfillment.shipped || 0,
                        charts?.orderFullfillment.delivered || 0,
                      ]}
                      backgroundColor={[
                        `hsl(110,80%, 80%)`,
                        `hsl(110,80%, 50%)`,
                        `hsl(110,40%, 50%)`,
                      ]}
                      offset={[0, 0, 50]}
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300 text-center uppercase tracking-wider">
                    Order Fulfillment Ratio
                  </h2>
                </section>

                <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 flex flex-col items-center">
                  <div className="w-full aspect-square relative mb-4">
                    <DoughnutChart
                      labels={
                        charts?.productCategories.map((i) => Object.keys(i)[0]) ||
                        []
                      }
                      data={
                        charts?.productCategories.map((i) => Object.values(i)[0]) ||
                        []
                      }
                      backgroundColor={
                        charts?.productCategories?.map(
                          (i) =>
                            `hsl(${Object.values(i)[0] * 4}, ${Object.values(i)[0]
                            }%, 50%)`
                        ) || []
                      }
                      legends={false}
                      offset={[0, 0, 0, 80]}
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300 text-center uppercase tracking-wider">
                    Product Categories Ratio
                  </h2>
                </section>

                <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 flex flex-col items-center">
                  <div className="w-full aspect-square relative mb-4">
                    <DoughnutChart
                      labels={["In Stock", "Out Of Stock"]}
                      data={[
                        charts?.stockAvailability.inStock || 0,
                        charts?.stockAvailability.outOfStock || 0,
                      ]}
                      backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                      legends={false}
                      offset={[0, 80]}
                      cutout={"70%"}
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300 text-center uppercase tracking-wider">
                    Stock Availability
                  </h2>
                </section>

                <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 flex flex-col items-center">
                  <div className="w-full aspect-square relative mb-4">
                    <DoughnutChart
                      labels={[
                        "Marketing Cost",
                        "Discount",
                        "Burnt",
                        "Production Cost",
                        "Net Margin",
                      ]}
                      data={[
                        charts?.revenueDistribution.marketingCost || 0,
                        charts?.revenueDistribution.discount || 0,
                        charts?.revenueDistribution.burnt || 0,
                        charts?.revenueDistribution.productionCost || 0,
                        charts?.revenueDistribution.netMargin || 0,
                      ]}
                      backgroundColor={[
                        "hsl(110,80%,40%)",
                        "hsl(19,80%,40%)",
                        "hsl(69,80%,40%)",
                        "hsl(300,80%,40%)",
                        "rgb(53, 162, 255)",
                      ]}
                      legends={false}
                      offset={[20, 30, 20, 30, 80]}
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300 text-center uppercase tracking-wider">
                    Revenue Distribution
                  </h2>
                </section>

                <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 flex flex-col items-center">
                  <div className="w-full aspect-square relative mb-4">
                    <PieChart
                      labels={[
                        "Teenager(Below 20)",
                        "Adult (20-40)",
                        "Older (above 40)",
                      ]}
                      data={[
                        charts?.usersAgeGroup.teen || 0,
                        charts?.usersAgeGroup.adult || 0,
                        charts?.usersAgeGroup.senior || 0,
                      ]}
                      backgroundColor={[
                        `hsl(10, ${80}%, 80%)`,
                        `hsl(10, ${80}%, 50%)`,
                        `hsl(10, ${40}%, 50%)`,
                      ]}
                      offset={[0, 0, 50]}
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300 text-center uppercase tracking-wider">
                    Users Age Group
                  </h2>
                </section>

                <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 flex flex-col items-center">
                  <div className="w-full aspect-square relative mb-4">
                    <DoughnutChart
                      labels={["Admin", "Customers"]}
                      data={[
                        charts?.adminCustomer.admin || 0,
                        charts?.adminCustomer.customer || 0,
                      ]}
                      backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                      offset={[0, 50]}
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300 text-center uppercase tracking-wider">
                    Admin vs Customers
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

export default PieCharts;
