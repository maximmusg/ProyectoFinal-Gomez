import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
// import { listaProductos } from "../../data";
import ItemList from "../../components/ItemList/ItemList";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  // addDoc,
} from "firebase/firestore";
import "./styles.css";

const ItemListContainer = () => {
  const [productList, setProductList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const { id } = useParams();
  const colorTheme = useContext(ThemeContext);

  // const upLoadToFirestore = async () => {
  //   const db = getFirestore();

  //   const ordersCollection = collection(db, "products");

  //   const promises = listaProductos.map((product) => {
  //     const newProduct = {
  //       ...product,
  //       stock: 50,
  //     };
  //     return addDoc(ordersCollection, newProduct);
  //   });
  //   try {
  //     await Promise.all(promises);
  //     console.log("Todos los productos han sido agregados a Firestore");
  //   } catch (error) {
  //     console.log("Error al subir datos", error);
  //   }
  // };

  const fetchData = () => {
    const db = getFirestore();
    const productsQuery = collection(db, "products");
    const querySnapshot = !id
      ? productsQuery
      : query(productsQuery, where("category", "==", id));

    getDocs(querySnapshot)
      .then((response) => {
        const products = response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductList(products);
        if (id) {
          const categoryName = products.length > 0 ? products[0].category : "";
          setCategoryName(categoryName);
        } else {
          setCategoryName("");
        }
      })
      .catch((er) => {
        console.error("Error en la carga de los productos:", er);
      });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div
      style={{
        backgroundColor: colorTheme.theme === "light" ? "#D9AB9A" : "#302927",
      }}
      className="item__Container"
    >
      {id && <h2 className="category__name">{categoryName}</h2>}
      <ItemList productList={productList} />

      {/* <button onClick={upLoadToFirestore}>Agregar Productos a Firestore</button> */}
    </div>
  );
};

export default ItemListContainer;
