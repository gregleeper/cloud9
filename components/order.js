import moment from "moment";
import { formatMoney } from "../utils";
const Order = ({ order, handleUpdateOrderStatus }) => {
  const deliveryPeriodToString = (period) => {
    switch (period) {
      case 2:
        return "2nd Period";
        break;
      case 3:
        return "3rd Period";
        break;
      case 4:
        return "4th Period";
        break;
      case 5:
        return "5th Period";
        break;
      case 6:
        return "6th Period";
        break;
      default:
        return "";
    }
  };

  const determineStatusUpdate = (status) => {
    if (status === "created" || status === "Created") {
      return "In-Fullfillment";
    }
    if (status === "In-Fullfillment") {
      return "Completed";
    }
  };

  return (
    <div>
      <li>
        <div className="flex justify-between items-center">
          <span className="text-xl">{order.customerEmail}</span>
          {order.hasLoyaltyCard ? (
            <div className="px-2 py-2 bg-green-300 rounded-lg">
              <span>Loyalty Card</span>
            </div>
          ) : null}
        </div>
        <div className="ml-2 py-1">
          <div>
            <span className="text-gray-600">Created At: </span>

            <span>{moment(order.createdAt).format("MM-DD-YY h:mm a")}</span>
          </div>
          <div className="py-1">
            <span className="text-gray-600 mr-2">Period to Deliver:</span>
            <span>{deliveryPeriodToString(order.deliveryPeriod)}</span>
          </div>
          <div className="py-1">
            <span>
              <span className="text-gray-600">Delivery Location: </span>{" "}
              {order.deliveryLocation}
            </span>
          </div>
          <div className="py-1">
            <span className="mr-2 text-gray-600">Status:</span>
            <span>{`${order.status}`}</span>
          </div>
          <div className="py-1">
            <span className="text-gray-600">{`Order Total: `}</span>
            <span>${formatMoney(order.total)}</span>
          </div>
          <div className="flex justify-start py-1">
            <span className="text-gray-600 mr-2">Change required:</span>
            {order.changeRequired > 0 ? (
              <div className="bg-red-200 rounded-full opacity-75 w-16 text-center">
                <span className="text-red-800 text-lg">
                  ${formatMoney(order.changeRequired)}
                </span>
              </div>
            ) : (
              <span>none</span>
            )}
          </div>
          <div className="border rounded px-2 py-6 border-gray-400 shadow">
            {order.items.items.map((i, index) => (
              <div>
                <div>
                  <span className="text-gray-600">{`Item ${index + 1}: `}</span>{" "}
                  <span>{i.item.name}</span>
                </div>
                <div className="ml-2">
                  <span>{`Qty: ${i.quantity}`}</span>
                </div>
                <div className="ml-2">
                  <span>Add Ins: </span>
                  <div>
                    {i.addIns.items.map((addIn) => (
                      <div key={addIn.id}>
                        <span>{addIn.addIn.name}</span>
                        <div className="ml-2">
                          <span>Qty: {addIn.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-6">
          <button
            className="btn-submit"
            onClick={() =>
              handleUpdateOrderStatus(
                order.id,
                determineStatusUpdate(order.status)
              )
            }
          >
            {`Move to ${determineStatusUpdate(order.status)}`}
          </button>
        </div>
      </li>
    </div>
  );
};

export default Order;
