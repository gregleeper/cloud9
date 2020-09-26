import { useCart } from "../pages/_app";
import { MdAddShoppingCart } from "react-icons/md";
const AddItem = ({ item }) => {
  const cart = useCart();

  return (
    <div>
      <button
        className="px-4 py-1 text-xl bg-gold text-white rounded-lg hover:bg-opacity-75 border-gray-400 border shadow"
        onClick={() => cart.addProduct(item)}
      >
        <MdAddShoppingCart />
      </button>
    </div>
  );
};

export default AddItem;
