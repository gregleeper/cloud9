import { useCart } from "../pages/_app";
import { GoDiffAdded } from "react-icons/go";

type AddInProps = {
  name: string;
  description: string;
  addIn: object;
  isAvailable: string;
  itemId: string;
  addInId: string;
};

const MenuAddIn = ({
  name,
  description,
  addIn,
  isAvailable,
  itemId,
  addInId,
}: AddInProps) => {
  const cart = useCart();

  const isInItem = (itemId, addInId) => {
    const itemIndex = cart.cartItems.findIndex((item) => item.id === itemId);
    return cart.cartItems[itemIndex].addIns.some((i) => i.id === addInId);
  };

  const getCartItem = (itemId) => {
    return cart.cartItems.findIndex((item) => item.id === itemId);
  };

  const getAddInQuantity = (itemId, addInId) => {
    const index = getCartItem(itemId);
    console.log(index);
    const { quantity } = cart.cartItems[index].addIns.find(
      (addIn) => addIn.id === addInId
    );

    return quantity;
  };

  const getCartItemQuantity = (itemId) => {
    const { quantity } = cart.cartItems.find((i) => i.id === itemId);
    return quantity;
  };

  return (
    <div className="py-3 px-1 mx-2 mb-2 w-2/5">
      <div className="block hover:text-blue-800">
        <div>
          <span className="lg:text-base text-sm font-title">{name}</span>
        </div>
        <div className="text-gray-600 text-xs hover:text-blue-800">
          <span>{description}</span>
        </div>
        {!isInItem(itemId, addInId) && (
          <div className="py-1">
            <button
              className="px-2 py-1 rounded-full h-12 w-12 flex justify-center items-center border-4 border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-white text-blue-600"
              onClick={() =>
                cart.addAddIn({
                  itemId,
                  addIn,
                })
              }
              disabled={isAvailable === "false"}
            >
              <GoDiffAdded className="text-2xl" />
            </button>
          </div>
        )}
      </div>
      {isInItem(itemId, addInId) && (
        <>
          <div className="">
            <button
              className="bg-red-600 text-white px-2 -py-1 rounded-md disabled:opacity-50"
              onClick={() =>
                cart.decreaseAddIn({
                  itemId,
                  addInId,
                })
              }
              disabled={getAddInQuantity(itemId, addInId) <= 1}
            >
              -
            </button>
            <span className="mx-2">{getAddInQuantity(itemId, addInId)}</span>
            <button
              className="bg-green-600 text-white px-2 -py-1 rounded-md disabled:opacity-50"
              onClick={() =>
                cart.increaseAddIn({
                  itemId,
                  addInId,
                })
              }
              disabled={
                getAddInQuantity(itemId, addInId) >=
                2 * getCartItemQuantity(itemId)
              }
            >
              +
            </button>
            <div>
              <button
                onClick={() =>
                  cart.removeAddIn({
                    itemId,
                    addInId,
                  })
                }
                className="bg-red-600 text-white px-2 mt-1 rounded"
              >
                <span className="shadow-lg">Remove</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MenuAddIn;
