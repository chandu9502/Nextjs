"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [isAdd, setIsAdd] = useState(false);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/products/mobile");
      setData(response.data);
    };
    fetchData();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (flag) {
      console.log("Updating product with ID:", flag);
      axios
        .put(`http://localhost:3000/products/mobile/update/${flag}`, {
          brand,
          title,
          price,
        })
        .then((res) => {
          console.log("Product updated successfully:", res);
          fetchData();
        })
        .catch((err) => console.log("Error updating product:", err));
      setFlag(0);
    } else {
      axios
        .post("http://localhost:3000/products/mobile", { brand, title, price })
        .then((res) => {
          console.log("Data submitted successfully:", res);
          fetchData();
        })
        .catch((err) => console.log("Error:", err));
    }
    setBrand("");
    setTitle("");
    setPrice(0);
    setIsAdd(false);
  };

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/products/mobile");
    setData(response.data);
  };

  const addHandler = () => {
    setIsAdd(true);
  };

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:3000/products/mobile/deleteproduct/${id}`)
      .then((res) => {
        console.log("Product deleted successfully:", res);
        fetchData();
      })
      .catch((err) => console.log("Error deleting product:", err));
  };

  const updateHandler = (id) => {
    setIsAdd(true);
    setFlag(id);
    const selectedProduct = data.find((item) => item._id === id);
    setBrand(selectedProduct.brand);
    setTitle(selectedProduct.title);
    setPrice(selectedProduct.price);
  };

  return (
    <div className={styles.page}>
      <h1>Product List</h1>
      {data.length > 0 &&
        data.map((item) => {
          return (
            <div key={item._id}>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                {item.title}
                <button onClick={() => updateHandler(item._id)}>Update</button>
                <button onClick={() => deleteHandler(item._id)}>Delete</button>
              </div>
              <hr />
            </div>
          );
        })}

      {isAdd && (
        <div>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button type="submit">Submit Data</button>
          </form>
        </div>
      )}

      <button onClick={addHandler} hidden={isAdd ? true : false}>
        Add Data
      </button>
    </div>
  );
}
