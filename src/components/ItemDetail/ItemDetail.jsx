// import { Button } from "react-bootstrap";
import ItemCount from "../ItemCount/ItemCount";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import "./styles.css";

const ItemDetail = ({ itemSelected }) => {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const { addItem } = useContext(CartContext);

  const addToCart = () => {
    addItem(itemSelected, count);
    navigate("/");
  };

  const handleNavigation = () => {
    navigate("/Cart");
  };

  return (
    <div className="item__details">
      <div className="card__image">
        <img src={itemSelected?.image} alt={itemSelected?.title} width={70} />
      </div>
      <div className="card__description">
        <h1 className="product__title">{itemSelected?.title}</h1>
        <p className="product__description">{itemSelected?.description}</p>
        <span className="detail__stock">
          Stock: {itemSelected?.stock - count}
        </span>
        <p className="product__price">${itemSelected?.price}</p>
        <div>
          <div className="detail__count">
            <ItemCount
              count={count}
              setCount={setCount}
              stock={itemSelected.stock}
            />
          </div>
          <div className="detail__buttons">
            <button onClick={handleNavigation} className="btn__style">
              Ver el carrito
            </button>
            <button onClick={addToCart} className="btn__style">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
