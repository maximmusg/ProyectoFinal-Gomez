import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Item from "../Item/Item";
import "./styles.css";

const ItemList = ({ productList }) => {
  return productList.length === 0 ? (
    <div className="spinner__container">
      <Spinner animation="border" role="status" size="xl" className="spinner">
        <span className="visually-hidden ">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <div className="card__container ">
      {productList.map(({ title, description, price, image, id, quantity }) => (
        <Link
          className="styles__item"
          to={`/item/${id}`}
          key={id}
          onClick={() => {}}
        >
          <Item
            title={title}
            description={description}
            price={price}
            image={image}
            quantity={quantity}
          />
        </Link>
      ))}
    </div>
  );
};

export default ItemList;
