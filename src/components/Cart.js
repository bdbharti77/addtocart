import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";

import { removeFromCart } from "../actions/cartActions";

class Cart extends Component {

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  

  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}

       
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src="https://images-eu.ssl-images-amazon.com/images/I/51dsU-oLu1L._SX300_SY300_QL70_FMwebp_.jpg" alt={item.name}></img>
                    </div>
                    <div>
                      <div>{item.name}
                      <button
                          className="button"
                          onClick={() => this.props.removeFromCart(item)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="right">
                    <p> Unit Price {formatCurrency(item.price)} x {item.count}{" "}</p>  

                    <p>Sum of {formatCurrency(item.total)}</p> 
                      
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </div>
               
                </div>
              </div>
            
            </div>
          )}
        </div>
      </div>
    );
  }
}



export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart}
)(Cart);
