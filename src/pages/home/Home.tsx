import { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Layout, Col, Row, Divider, Button, Tooltip, Modal } from "antd";
import { Card, Header, Loader } from "../../components";
import { productService } from "../../services/products.service";
import { Product } from "../../entities/product";
import DialogProduct from "../../components/DialogProduct";
import { useProducts } from "../../context/products/Products";
import { useShopping } from "../../context/shoppingCart/shopping";

const { Content } = Layout;

const Home = () => {
  const [currentProduct, setcurrentProduct] = useState<Product | undefined>(
    undefined
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { addProduct, removeProduct } = useShopping();
  const { products, removeToCart } = useProducts();

  const showCurrentProduct = async (id: string) => {
    showModal();
    await productService.findOne(id).then((res) => {
      setcurrentProduct(res);
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setcurrentProduct(undefined);
  };

  return (
    <>
      <Layout>
        <Header />
        <Content style={{ padding: "0 16px" }}>
          <Divider orientation="left">Horizontal</Divider>
          <Row gutter={[16, 16]} justify="center">
            {products &&
              products.map((prod: Product, i: any) => (
                <Col
                  key={i}
                  className="gutter-row"
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={5}
                >
                  <Card
                    hoverable
                    title={prod.name}
                    description={prod.description}
                    cover={
                      <img
                        alt={prod.name}
                        src={prod.image}
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
                      S/. {prod.price}
                    </h4>
                    <Divider />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Tooltip title="Vista previa">
                        <Button
                          type="link"
                          icon={<EyeOutlined />}
                          onClick={() => showCurrentProduct(prod.id)}
                        ></Button>
                      </Tooltip>
                      <Button
                        type="primary"
                        shape="round"
                        danger={prod.addedToCart}
                        onClick={() =>
                          !prod.addedToCart
                            ? addProduct(prod)
                            : removeProduct(prod)
                        }
                      >
                        {!prod.addedToCart ? "Agregar" : "Eliminar"}
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
        </Content>
      </Layout>
      <Modal
        visible={isModalVisible}
        onCancel={closeModal}
        centered
        footer={<></>}
      >
        {currentProduct ? (
          <DialogProduct product={currentProduct} closeModal={closeModal} />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loader />
          </div>
        )}
      </Modal>
    </>
  );
};

export default Home;
