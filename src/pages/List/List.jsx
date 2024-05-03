import { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/food`);
    if (res.status == 200) {
      setList(res.data);
    } else {
      toast.error("Something Wrong");
    }
  };

  const removeFood = async (itemId) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/food/${itemId}`
    );
    await fetchList();
    if (res.statusText === "OK") {
      toast.success("Item Removed");
    } else {
      toast.error("Something Wrong");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => removeFood(item._id)} className="delete">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
