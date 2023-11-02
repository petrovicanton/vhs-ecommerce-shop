import { getServerSession } from "next-auth/next";
import HeroSection from "@/components/HeroSection/HeroSection";
import { fetchOrder } from "@/libs/apis";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";

const Orders = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const email = session?.user?.email as string;
  const orderData: any = await fetchOrder(email);

  console.log(orderData);

  return (
    <div>
      <HeroSection />
      <div className="relative overflow-x-auto px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pb-8 sm:pb-12 mt-12 sm:mt-20">
        <h1
          id="currentOrder"
          className="text-center text-2xl sm:text-4xl font-bold text-gray-300 mb-4 sm:mb-6 md:mb-8 lg:mb-10"
        >
          Current Order:
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left text-gray-400">
            <thead className="text-xs sm:text-sm uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3">
                  Product(s) name
                </th>
                <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3">
                  Unit Price
                </th>
                <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3">
                  Order Status
                </th>
                <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order: any) => {
                const totalPrice = order.items.reduce((acc: any, item: any) => {
                  const itemPrice = item.quantity * item.movie.price;
                  return acc + itemPrice;
                }, 0);

                return (
                  <tr
                    key={order._id}
                    className="border-b bg-gray-800 border-gray-700"
                  >
                    <td
                      scope="row"
                      className="px-2 sm:px-4 py-2 sm:py-4 font-medium whitespace-nowrap text-white"
                    >
                      {order.items.map((item: any) => (
                        <span key={item._id}>
                          {item.movie.name} ({item.quantity}) <br />
                        </span>
                      ))}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4">
                      {order.items.map((item: any) => (
                        <span key={item._id}>
                          $ {item.movie.price} <br />
                        </span>
                      ))}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4">
                      {order.orderStatus}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4">
                      $ {totalPrice}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
