import React from "react";
import Card from "./Card";
import { EyeOutlined } from "@ant-design/icons";
import { Divider, Tooltip, Button, Tag } from "antd";
import { Product } from "../entities/product";
import { useShopping } from "../context/shoppingCart/shopping";

type Props = { product: Product; closeModal: () => void };

const DialogProduct: React.FC<Props> = ({ product, closeModal }) => {
  const { addProduct, removeProduct } = useShopping();
  return (
    <Card
      hoverable
      title={product.name}
      description={product.description}
      cover={
        <img
          alt={product.name}
          src={product.image}
          height="160"
          style={{ objectFit: "cover" }}
        />
      }
    >
      <h4
        style={{
          textAlign: "right",
          padding: "5px 0",
        }}
      >
        S/. {product.price}
      </h4>
      <p>
        Material: {product.material}
        <span style={{ color: product.color, marginLeft: "20px" }}>
          color: {product.color}
        </span>
      </p>
      <Tag color={product.color}>{product.tag}</Tag>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tooltip title="Vista previa"></Tooltip>
        <Button
          type="primary"
          shape="round"
          danger={product.addedToCart}
          onClick={() => {
            !product.addedToCart ? addProduct(product) : removeProduct(product);
            closeModal();
          }}
        >
          {!product.addedToCart ? "Agregar" : "Eliminar"}
        </Button>
      </div>
    </Card>
  );
};

export default DialogProduct;
