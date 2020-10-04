import { useCart } from "../pages/_app";
import MenuAddIn from "./menuAddIn";
import AddItem from "./addItem";
import { formatMoney } from "../utils";

type MenuItemProps = {
  name: string;
  description: string;
  price: number;
  itemId: string;
  item: object;
  isBeverage: boolean;
  menuAddIns: Array<object>;
};

interface MenuAddIn {
  id: string;
  name: string;
  description: string;
  isAvailable: string;
}

const MenuItem = ({
  name,
  description,
  price,
  itemId,
  item,
  isBeverage,
  menuAddIns,
}: MenuItemProps) => {
  const cart = useCart();

  const getCartItem = (itemId) => {
    return cart.cartItems.findIndex((item) => item.id === itemId);
  };

  const isInCart = (itemId) => {
    return cart.cartItems.some((i) => i.id === itemId);
  };

  const getCartItemQuantity = (itemId) => {
    const { quantity } = cart.cartItems.find((i) => i.id === itemId);
    return quantity;
  };

  return (
    <div>
      <div className=" h-38">
        <div className="flex justify-between items-center mb-2">
          <div className="">
            <span className="text-lg font-title">{name}</span>
          </div>
          <div>
            <span className=" font-thin">${formatMoney(price)}</span>
          </div>
        </div>
        <div className="text-gray-600 pb-3 mb-2">
          <span>{description}</span>
        </div>
      </div>
      {!isInCart(itemId) && (
        <div className="">
          <AddItem item={item} />
        </div>
      )}
      {isInCart(itemId) && (
        <div>
          <div className="flex justify-between items-center w-9/12 mx-auto">
            <button
              className="bg-red-600 text-white px-2 -py-1 rounded-md disabled:opacity-50"
              onClick={() => cart.decrease(item)}
              disabled={getCartItemQuantity(itemId) === 1}
            >
              -
            </button>
            <span className="text-xl">{`qty: ${getCartItemQuantity(
              itemId
            )}`}</span>
            <button
              className="bg-green-600 text-white px-2 -py-1 rounded-md"
              onClick={() => cart.increase(item)}
            >
              +
            </button>
          </div>
          {isBeverage && (
            <div>
              <div className=" w-24  mt-8 py-1">
                <span className="w-full  text-gray-800">Extras:</span>
              </div>
              <div className="flex flex-wrap">
                {menuAddIns &&
                  menuAddIns.map((a: MenuAddIn) => (
                    <MenuAddIn
                      name={a.name}
                      description={a.description}
                      addInId={a.id}
                      itemId={itemId}
                      isAvailable={a.isAvailable}
                      addIn={a}
                    />
                  ))}
              </div>
            </div>
          )}
          <div className=" w-9/12 mx-auto">
            <button
              className="text-center w-full btn-delete text-sm"
              onClick={() => cart.removeProduct(item)}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
