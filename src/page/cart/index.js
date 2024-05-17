import React, { useEffect, useState } from "react";
import ReceiptCard from "../../component/recieptCard";
import { Link } from "react-router-dom";
import "./index.css";
import * as Realm from "realm-web";
import config from '../../config';

const app = new Realm.App({ id: `${config.API}` });
const user = app.currentUser;

const Order = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isChangeCart, setIsChangeCart] = useState(false);
  const [SumValue, setSumValue] = useState();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart.products || []);
    }
  }, []);

  const SumPriceData = async () => {
    const functionName = "module_cart";
    try {
      const res = await user.callFunction(functionName);
      setSumValue(res[0]?.public?.output?.jsonData?.total);
      console.log(res);
    } catch (error) {
      console.log(error.error);
    }
  };

  const AddtoCartDB = async (form) => {
    const functionName = "AddToCart";
    const args = [form, user.id]; // Truyền dữ liệu đúng định dạng
    try {
      const res = await user.callFunction(functionName, ...args);
      console.log("success: ", res);
    } catch (error) {
      console.log("err:", error.error);
    }
  };

  const handleAddToCart = async () => {
    try {
      await AddtoCartDB({ products: cartItems }); // Gọi hàm AddtoCartDB để lưu vào cơ sở dữ liệu
      await SumPriceData(); // Gọi hàm SumPriceData để tính toán tổng giá trị
    } catch (error) {
      console.log(error.error);
    }
  };

  var removeItem = (id) => {
    var updatedCart = []

    cartItems.forEach((e) => {
      if (e?.id != id) {
        updatedCart.push(e)
      }
    })

    setCartItems(updatedCart);
    setIsChangeCart(true)
  }

  useEffect(() => {
    if (isChangeCart) {
      localStorage.setItem("cart", JSON.stringify({ products: cartItems }));
    }

    setIsChangeCart(false)
  }, [isChangeCart])

  const renderReceiptCard = () => {
    return cartItems.map((item) => (
      <ReceiptCard key={item.id} removeItem={removeItem} {...item} />
    ));
  };

  return (
    <section className="section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="fw-bold mb-4 text-uppercase text-center">Thanks for your Order</h2>
                {renderReceiptCard()}
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center" style={{ backgroundColor: "#f0f0f0" }}>
                <button className="btn btn-calculate mr-2" onClick={handleAddToCart}>TÍNH TIỀN</button>

                <span className="total-price mr-2">Total paid: $ {SumValue}</span>
                {/* {bookingSuccess && <span>Book Successfully</span>} */}
                <Link to="/" className="btn btn-light">Continue Booking</Link>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center" style={{ backgroundColor: "#f0f0f0" }}>
                <button className="btn btn-book mr-2">BOOK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
