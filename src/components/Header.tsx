import { Layout, Button, Popover, Divider } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useShopping } from "../context/shoppingCart/shopping";

const { Header: HeaderAntd } = Layout;

const Header = () => {
  const {
    products: productsShopping,
    totalCart,
    removeProduct,
    clearCart,
  } = useShopping();

  const text = (
    <Button type="link" onClick={clearCart}>
      Vaciar
    </Button>
  );
  const content = (
    <div style={{ width: "250px" }}>
      <h4>Carrito</h4>
      {productsShopping &&
        productsShopping.map((prod, i) => (
          <p
            style={{ display: "flex", justifyContent: "space-between" }}
            key={i}
          >
            <span>{prod.name}</span>{" "}
            <Button size={"small"} onClick={() => removeProduct(prod)}>
              X
            </Button>
          </p>
        ))}
      <Divider />
      <p style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Total:</span> <span>{totalCart.toFixed(2)}</span>
      </p>
    </div>
  );
  return (
    <HeaderAntd
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h1 style={{ color: "#faad14" }}>
        QDS <small style={{ color: "#f5222d" }}>Tienda</small>
      </h1>
      <span>
        <Popover
          placement="bottomRight"
          title={text}
          content={content}
          trigger="click"
          style={{ width: "300px" }}
        >
          <Button type="link" icon={<ShoppingCartOutlined />}>
            <span>{productsShopping.length}</span>
          </Button>
        </Popover>
      </span>
    </HeaderAntd>
  );
};

export default Header;
