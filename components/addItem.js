import { useCart } from "../pages/_app";
import { MdAddShoppingCart } from "react-icons/md";
const AddItem = ({ item }) => {
  const cart = useCart();
  console.log(cart);
  return (
    <div>
      <button
        className="px-4 py-1 text-xl bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        onClick={() => cart.addProduct(item)}
      >
        <MdAddShoppingCart />
      </button>
    </div>
  );
};

export default AddItem;
