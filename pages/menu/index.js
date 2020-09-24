import { API } from "aws-amplify";
import { listItems, listAddIns } from "../../src/graphql/queries";
import Layout from "../../components/layout";
import { useState, useEffect } from "react";
import { formatMoney } from "../../utils";
import AddItem from "../../components/addItem";
import { useCart } from "../_app";
import { GrAddCircle } from "react-icons/gr";
import { GoDiffAdded } from "react-icons/go";

const Menu = ({ items, addIns }) => {
  const [menuItems, setMenuItems] = useState();
  const [menuAddIns, setMenuAddIns] = useState();

  const cart = useCart();

  const getCartItem = (itemId) => {
    return cart.cartItems.findIndex((item) => item.id === itemId);
  };

  const isInCart = (itemId) => {
    return cart.cartItems.some((i) => i.id === itemId);
  };

  const isInItem = (itemId, addInId) => {
    const itemIndex = cart.cartItems.findIndex((item) => item.id === itemId);
    return cart.cartItems[itemIndex].addIns.some((i) => i.id === addInId);
  };

  const getCartItemQuantity = (itemId) => {
    const { quantity } = cart.cartItems.find((i) => i.id === itemId);
    return quantity;
  };

  const getAddInQuantity = (itemId, addInId) => {
    const index = getCartItem(itemId);
    const { quantity } = cart.cartItems[index].addIns.find(
      (addIn) => addIn.id === addInId
    );

    return quantity;
  };

  useEffect(() => {
    if (items) {
      setMenuItems(items.data.listItems.items);
    }
    if (addIns) {
      setMenuAddIns(addIns.data.listAddIns.items);
    }
  }, [items, addIns]);

  return (
    <Layout>
      <div className="">
        <div className="relative w-1/2 mx-auto py-16">
          <div className="bg-gold transform rotate-2 w-full m-auto h-16 absolute inset-0"></div>

          <div className="bg-gray-700 w-full m-auto h-16 absolute inset-0 transform rotate-1"></div>

          <h2 className="text-white text-5xl relative z-10 text-center leading-none text-shadow-lg font-display">
            Menu
          </h2>
        </div>
        <div className="w-11/12 mx-auto pb-24">
          <ul>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
              {menuItems &&
                menuItems.map((i) => (
                  <div
                    key={i.id}
                    className="py-4 w-9/12 text-gray-900 mx-auto border border-gray-400 shadow rounded-lg px-4 bg-light-gray  hover:shadow-lg "
                  >
                    <li className="">
                      <div className="h-24">
                        <div className="flex justify-between items-center mb-2">
                          <div className="">
                            <span className="text-lg font-title">{i.name}</span>
                          </div>
                          <div>
                            <span className=" font-thin">
                              ${formatMoney(i.price)}
                            </span>
                          </div>
                        </div>
                        <div className="text-gray-600 pb-3 mb-2">
                          <span>{i.description}</span>
                        </div>
                      </div>
                      {!isInCart(i.id) && (
                        <div className="">
                          <AddItem item={i} />
                        </div>
                      )}
                      {isInCart(i.id) && (
                        <div>
                          <div className="flex justify-between items-center w-9/12 mx-auto">
                            <button
                              className="bg-red-600 text-white px-2 -py-1 rounded-md disabled:opacity-50"
                              onClick={() => cart.decrease(i)}
                              disabled={getCartItemQuantity(i.id) === 1}
                            >
                              -
                            </button>
                            <span className="text-xl">{`qty: ${getCartItemQuantity(
                              i.id
                            )}`}</span>
                            <button
                              className="bg-green-600 text-white px-2 -py-1 rounded-md"
                              onClick={() => cart.increase(i)}
                            >
                              +
                            </button>
                          </div>
                          <div>
                            <div className=" w-24  mt-8 py-1">
                              <span className="w-full  text-gray-800">
                                Extras:
                              </span>
                            </div>
                            <div className="flex flex-wrap">
                              {menuAddIns &&
                                menuAddIns.map((a) => (
                                  <div className="py-3 w-2/5  px-1 mx-2 mb-2 ">
                                    <div className="block hover:text-blue-800 hover:bold">
                                      <div>
                                        <span className="lg:text-base text-sm font-title">
                                          {a.name}
                                        </span>
                                      </div>
                                      <div className="text-gray-600 hover:text-blue-800 text-xs">
                                        <span>{a.description}</span>
                                      </div>
                                      {!isInItem(i.id, a.id) && (
                                        <div className="py-1">
                                          <button
                                            className="px-2 py-1 rounded-full h-12 w-12 flex justify-center items-center border-4 border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-white text-blue-600"
                                            onClick={() =>
                                              cart.addAddIn({
                                                itemId: i.id,
                                                addIn: a,
                                              })
                                            }
                                            disabled={a.isAvailable === "false"}
                                          >
                                            <GoDiffAdded className="text-2xl" />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                    {isInItem(i.id, a.id) && (
                                      <>
                                        <div className="">
                                          <button
                                            className="bg-red-600 text-white px-2 -py-1 rounded-md disabled:opacity-50"
                                            onClick={() =>
                                              cart.decreaseAddIn({
                                                itemId: i.id,
                                                addInId: a.id,
                                              })
                                            }
                                            disabled={
                                              getAddInQuantity(i.id, a.id) <= 1
                                            }
                                          >
                                            -
                                          </button>
                                          <span className="mx-2">
                                            {getAddInQuantity(i.id, a.id)}
                                          </span>
                                          <button
                                            className="bg-green-600 text-white px-2 -py-1 rounded-md disabled:opacity-50"
                                            onClick={() =>
                                              cart.increaseAddIn({
                                                itemId: i.id,
                                                addInId: a.id,
                                              })
                                            }
                                            disabled={
                                              getAddInQuantity(i.id, a.id) >=
                                              2 * getCartItemQuantity(i.id)
                                            }
                                          >
                                            +
                                          </button>
                                          <div>
                                            <button
                                              onClick={() =>
                                                cart.removeAddIn({
                                                  itemId: i.id,
                                                  addInId: a.id,
                                                })
                                              }
                                              className="bg-red-600 text-white px-2 mt-1 rounded"
                                            >
                                              <span className="shadow-lg">
                                                Remove
                                              </span>
                                            </button>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className=" w-9/12 mx-auto">
                            <button
                              className="text-center w-full btn-delete text-sm"
                              onClick={() => cart.removeProduct(i)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  </div>
                ))}
            </div>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ preview = null }) {
  const items =
    (await API.graphql({
      query: listItems,
      authMode: "API_KEY",
    })) || [];

  const addIns =
    (await API.graphql({
      query: listAddIns,
      authMode: "API_KEY",
    })) || [];
  return {
    props: {
      items,
      addIns,
      preview,
    },
  };
}

export default Menu;
