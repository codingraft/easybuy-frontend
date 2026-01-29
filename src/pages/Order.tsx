import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import { useMyOrdersQuery } from "../redux/api/orderApi";
import { RootState } from "../redux/store";
import { CustomError } from "../types/api-types";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const Order = () => {
  const { user } = useSelector(
    (state: RootState) => state.userReducer
  );

  const { isLoading, isError, error, data } = useMyOrdersQuery(user?._id || "");

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="container mx-auto p-4 md:p-10 min-h-[80vh] animate-in fade-in duration-500">
      <h1 className="text-3xl font-heading font-bold mb-8 text-foreground">My Orders</h1>
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton count={5} />
        </div>
      ) : data?.orders.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-border">
          <h2 className="text-2xl font-bold text-muted-foreground mb-4">No orders found</h2>
          <Link to="/search">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Desktop Table View */}
          <Card className="hidden md:block overflow-hidden border-border shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-bold">Order ID</th>
                    <th className="px-6 py-4 font-bold">Quantity</th>
                    <th className="px-6 py-4 font-bold">Discount</th>
                    <th className="px-6 py-4 font-bold">Amount</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.orders.map((order) => (
                    <tr key={order._id} className="bg-background border-b border-border hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground truncate max-w-[150px]">{order._id}</td>
                      <td className="px-6 py-4">{order.orderItems.length}</td>
                      <td className="px-6 py-4 text-green-600 font-medium">{order.discount}</td>
                      <td className="px-6 py-4 font-bold">₹{order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === "Processing" ? "bg-red-100 text-red-600" :
                          order.status === "Shipped" ? "bg-green-100 text-green-600" :
                            "bg-purple-100 text-purple-600"
                          }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {/* Since user can't manage transaction in admin way, maybe just 'View' or keep existing link if valid */}
                        {/* Note: Original code linked to /admin/transaction/:id. Users generally shouldn't see admin pages? 
                                            If this is the intended user detail view, I'll keep it, but normally users have /order/:id.
                                            Assuming /admin/transaction/:id is shared or I should check route. 
                                            Actually, I should assume the user has access if the code was there, OR assume it was lazy coding.
                                            Safest to keep the link but maybe style it better? 
                                            Wait, "Manage" implies admin rights. A user usually "Views".
                                            But I'll stick to the link destination `admin/transaction/${order._id}` for now to avoid 404s, 
                                            unless I see a User Order Detail route.
                                            Actually `OrderDetails` might be `src/pages/OrderDetails.tsx`? No file named that.
                                            So `admin/transaction` might be the only detail view. I'll keep it.
                                          */}
                        <Link to={`/admin/transaction/${order._id}`}>
                          <Button variant="outline" size="sm">View</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {data?.orders.map((order) => (
              <Card key={order._id} className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium truncate w-1/2">
                    ID: {order._id}
                  </CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === "Processing" ? "bg-red-100 text-red-600" :
                    order.status === "Shipped" ? "bg-green-100 text-green-600" :
                      "bg-purple-100 text-purple-600"
                    }`}>
                    {order.status}
                  </span>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground text-xs">Quantity</p>
                      <p className="font-medium">{order.orderItems.length}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Amount</p>
                      <p className="font-bold">₹{order.total}</p>
                    </div>
                  </div>
                  <Link to={`/admin/transaction/${order._id}`} className="block w-full">
                    <Button className="w-full" variant="secondary" size="sm">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Order;
