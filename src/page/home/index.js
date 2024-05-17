import React, { useEffect, useState } from "react";
import * as Realm from "realm-web";
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { Container, Row, Col, Button } from 'react-bootstrap';
import config from '../../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { redirect } from "react-router-dom";
import ProductCard from "../../component/productCard";

const app = new Realm.App({ id: `${config.API}` });
const user = app.currentUser;

const Login = {
  title: 'Login',
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', title: 'Email', format: 'email' },
    password: { type: 'string', title: 'Password', minLength: 6, format: 'password' },
  },
};
var group = [
  {
    title: "PHÔI THẺ TRẮNG",
    data: [
      {
        id: "26t01n01pat09t09n99ltmh0001",
        title: "PHÔI THẺ TRẮNG",
        desc: "PTT0101",
      },
      {
        id: "26t01n01pat09t09n99ltmh0002",
        title: "THẺ TRẮNG CHIP PROXIMITY",
        desc: "PTT0102",
      },
    ],
  },
  {
    title: "THẺ BÃO LÃNH",
    data: [
      {
        id: "26t01n01pat09t09n99ltmh0003",
        title: "THẺ BÃO LÃNH BSH",
        desc: "PPT0201",
      },
    ],
  },
  {
    title: "THẺ BỆNH VIỆN",
    data: [
      {
        id: "26t01n01pat09t09n99ltmh0004",
        title: "THẺ BỆNH VIỆN ĐA KHOA NGHỆ AN",
        desc: "PPT0301",
      },
      {
        id: "26t01n01pat09t09n99ltmh0005",
        title: "THẺ BỆNH VIỆN HẠNH PHÚC",
        desc: "PPT0301",
      },
    ],
  },
  {
    title: "THẺ DÁN NFC",
    data: [
      {
        id: "26t01n01pat09t09n99ltmh0006",
        title: "THẺ DÁN NFC",
        desc: "PPT0401",
      },
    ],
  },
  {
    title: "THẺ DANH THIẾP",
    data: [
      {
        id: "26t01n01pat09t09n99ltmh0007",
        title: "THẺ DANH THIẾP CÁ NHÂN",
        desc: "PPT0501",
      },
    ],
  },
];
const Home = () => {
  const [total, setTotal] = useState();
  const [SumValue, setSumValue] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const functionName = "module";
    try {
      const res = await user.callFunction(functionName);
      setSumValue(res[0]?.public?.input?.jsonSchema);
      console.log(res);
    } catch (error) {
      console.log(error.error);
    }
  };

  const Logout = async () => {
    try {
      await user.logOut();
      console.log("Đăng xuất thành công:");
      // window.location.reload(true);
    } catch (error) {
      console.log(error.error);
    }
  };

  const OnSum = async (form) => {
    const functionName = "SUMAB";
    const args = [form?.formData, user.id];
    try {
      const res = await user.callFunction(functionName, ...args);
      console.log(res);
      setTotal(res[0]?.public?.output?.total);
      console.log(res[0]?.public?.output?.total);
    } catch (error) {
      console.log(error.error);
    }
  };


  const [cart, setCart] = useState([]);
  const addToCart = (product, quantity) => {
    product.quantity = quantity;

    // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify({products:updatedCart}));
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart.products || []);
    }
  }, []);

  return (
    <Container className="mt-5">
      {user ? (
        <div>
          <div className="mb-3">
            <h3>Home</h3>
            <Button variant="danger" className="me-2" onClick={Logout}>Logout</Button>
          </div>
          <Row>
            <Col md={6}>
              <Form
                schema={SumValue}
                validator={validator}
                onSubmit={OnSum}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h3>Total: {total}</h3>
            </Col>
          </Row>
          <>{group.map((item) => listCard(item.title, item.data, addToCart))}</>
        </div>
      ) : (
        <redirect to="/login" />
      )}
    </Container>
  );
};

const listCard = (title, data = [], addToCart) => {
  var cols = [];
  data.forEach((item) => {
    cols.push(<Col key={item.id} md="12" lg="4" className="mb-4 mb-lg-0">
      <ProductCard {...item} addToCart={addToCart} />
    </Col>);
  })
  return (
    <Container
      className="my-5"
      key={title}
      style={{ backgroundColor: "#eee", padding: "20px" }}
    >
      <h2 className="text-center mb-5">{title}</h2>
      <Row>{cols} </Row>
    </Container>
  );
}

export default Home;
