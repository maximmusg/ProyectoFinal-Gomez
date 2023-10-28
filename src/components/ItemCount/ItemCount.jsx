import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "./styles.css";

const ItemCount = () => {
  const [count, setCount] = useState(1);
  const renderCount = useRef(0);
  renderCount.current++;
  const onAdd = () => {
    setCount(count + 1);
  };
  const onSub = () => {
    setCount(count - 1);
  };

  return (
    <div className="count__container">
      <Button variant="outline-primary" className="btnCount" onClick={onSub}>
        -
      </Button>

      <h2>{count}</h2>
      <Button variant="outline-primary" className="btnCount" onClick={onAdd}>
        +
      </Button>
      {/* <Button variant="primary" onClick={sumarTexto}>
        Agregar al carrito
      </Button> */}
      <div>{renderCount.current}</div>
    </div>
  );
};

export default ItemCount;
