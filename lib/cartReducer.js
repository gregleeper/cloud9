import cookie from "js-cookie";

const Storage = (cartItems) => {
  cookie.set("cart", JSON.stringify(cartItems.length > 0 ? cartItems : []));
};

const getItem = (cartItems, itemId) => {
  return cartItems[cartItems.findIndex((item) => item.id === itemId)];
};

export const sumItems = (cartItems) => {
  Storage(cartItems);
  let itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  let total = cartItems
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return { itemCount, total };
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        Object.assign(action.payload, { addIns: [] });
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "ADD_ADDIN":
      const item = getItem(state.cartItems, action.payload.itemId);
      item.addIns.push({ ...action.payload.addIn, quantity: 1 });

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter((item) => item.id !== action.payload.id)
        ),
        cartItems: [
          ...state.cartItems.filter((item) => item.id !== action.payload.id),
        ],
      };
    case "REMOVE_ADDIN":
      const itemToRemoveAddIn = getItem(state.cartItems, action.payload.itemId);

      const addInIndex2 = itemToRemoveAddIn.addIns.findIndex(
        (addIn) => addIn.id === action.payload.addInId
      );

      itemToRemoveAddIn.addIns.splice(addInIndex2, 1);
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
      break;
    // return {
    //   ...state,
    //   ...sumItems,
    //   cartItems
    // }
    case "INCREASE_ADDIN":
      const itemForAddInIncrease = getItem(
        state.cartItems,
        action.payload.itemId
      );
      const addInIndex = itemForAddInIncrease.addIns.findIndex(
        (addIn) => addIn.id === action.payload.addInId
      );
      itemForAddInIncrease.addIns[addInIndex].quantity++;

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "INCREASE":
      state.cartItems[
        state.cartItems.findIndex((item) => item.id === action.payload.id)
      ].quantity++;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "DECREASE_ADDIN":
      const itemForAddInDecrease = getItem(
        state.cartItems,
        action.payload.itemId
      );
      const myIndex = itemForAddInDecrease.addIns.findIndex(
        (addIn) => addIn.id === action.payload.addInId
      );
      itemForAddInDecrease.addIns[myIndex].quantity--;

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "DECREASE":
      state.cartItems[
        state.cartItems.findIndex((item) => item.id === action.payload.id)
      ].quantity--;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "CHECKOUT":
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      };
    case "CLEAR":
      return {
        cartItems: [],
        ...sumItems([]),
      };
    default:
      return state;
  }
};
