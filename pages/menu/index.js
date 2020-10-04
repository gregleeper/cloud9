import { API } from "aws-amplify";
import {
  listItems,
  listAddIns,
  listCategorys,
} from "../../src/graphql/queries";
import Layout from "../../components/layout";
import { useState, useEffect } from "react";
import { useCart } from "../_app";
import MenuItem from "../../components/menuItem";

const Menu = ({ items, addIns, categories }) => {
  const [menuItems, setMenuItems] = useState();
  const [menuCategories, setMenuCategories] = useState();
  const [menuAddIns, setMenuAddIns] = useState();
  const [filterBy, setFilterBy] = useState([]);

  const cart = useCart();

  const handleFilterChange = (checked, id) => {
    if (checked) {
      const currentFilters = filterBy;
      setFilterBy([...currentFilters, id]);
    }
    if (!checked) {
      const newFilters = filterBy.filter((i) => i !== id);
      setFilterBy(newFilters);
    }
  };

  useEffect(() => {
    if (filterBy.length > 0) {
      let myItems = [];
      const originalItemList = items.data.listItems.items;
      originalItemList.map((item) => {
        filterBy.forEach((element) => {
          if (item.categoryId === element) {
            myItems.push(item);
          }
        });
        setMenuItems(myItems);
      });
    }
    if (filterBy.length === 0) {
      const sortedItems = items.data.listItems.items.sort(compare);
      setMenuItems(sortedItems);
    }
  }, [filterBy]);

  const isBeverage = (itemId) => {
    const isBeverageItem = menuItems.filter((i) => i.id === itemId);
    console.log(isBeverageItem);
    return (
      isBeverageItem[0].category.name.toLowerCase().includes("beverage") &&
      !isBeverageItem[0].name.toLowerCase().includes("water")
    );
  };

  const compare = (a, b) => {
    const itemA = a.category.name.toLowerCase();
    const itemB = b.category.name.toLowerCase();

    if (itemA > itemB) {
      return 1;
    } else if (itemA < itemB) {
      return -1;
    }
    return 0;
  };

  useEffect(() => {
    if (items) {
      const sortedItems = items.data.listItems.items.sort(compare);
      const sortedItemsAvailable = sortedItems.filter(
        (item) => item.isAvailable === "True"
      );
      setMenuItems(sortedItemsAvailable);
    }
    if (addIns) {
      setMenuAddIns(addIns.data.listAddIns.items);
    }
    if (categories) {
      setMenuCategories(categories.data.listCategorys.items);
    }
  }, [items, addIns]);

  return (
    <Layout>
      <div className="">
        <div className="relative w-1/2 mx-auto py-16">
          <div className="bg-gold transform rotate-2 w-full m-auto h-16 absolute inset-0"></div>

          <div className="bg-blue-900 w-full m-auto h-16 absolute inset-0 transform rotate-1"></div>

          <h2 className="text-white text-5xl relative z-10 text-center leading-none text-shadow-lg font-display">
            Menu
          </h2>
        </div>
        <div className="lg:w-8/12 w-full mx-auto border lg:p-4 sm:p-3 p-2 lg:text-base text-sm bg-white border-gray-400 shadow rounded flex justify-center items-center">
          {menuCategories &&
            menuCategories.map((c) => (
              <div className="px-4 py-2">
                <input
                  className="form-checkbox mr-1"
                  type="checkbox"
                  id={c.id}
                  value={c.id}
                  name={c.name}
                  onChange={({ target }) =>
                    handleFilterChange(target.checked, target.value)
                  }
                />
                <label htmlFor={c.name}>{c.name}</label>
              </div>
            ))}
        </div>
        <div className="w-11/12 mx-auto pb-24 pt-8">
          <ul>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
              {menuItems &&
                menuItems.map((i) => (
                  <div
                    key={i.id}
                    className="py-4 w-9/12 text-gray-900 mx-auto border border-gray-400 shadow rounded-lg px-4 bg-light-gray  hover:shadow-lg "
                  >
                    <li className="">
                      <MenuItem
                        name={i.name}
                        description={i.description}
                        price={i.price}
                        itemId={i.id}
                        item={i}
                        isBeverage={isBeverage(i.id)}
                        menuAddIns={menuAddIns}
                      />
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

  const categories =
    (await API.graphql({
      query: listCategorys,
      authMode: "API_KEY",
    })) || [];

  return {
    props: {
      items,
      addIns,
      categories,
      preview,
    },
    revalidate: 1,
  };
}

export default Menu;
