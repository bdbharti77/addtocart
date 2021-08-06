import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      indexData:0,
    qtyitem:{},
    products:[]
    };
  }
  async componentDidMount() {
   await this.props.fetchProducts();
    this.setState({
      products:this.props.products
    })
  }


  openModal = (item, i) => {
    this.setState({ item, indexData:i });
  };
  closeModal = () => {
    this.setState({ item: null });
  };
  handleChange = (event, i) => {
    let {products}= this.state;
    products[i][event.target.name]=event.target.value
    this.setState({
      products
    });
  };
  

  render() {
    const { item, indexData, products} = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {this.props.products.map((item, i) => (
                <li key={item.id}>
                  <div className="product">
                    <a
                      href={"#" + item.id}
                      onClick={() => this.openModal(item, i)}
                    >
                      <img src="https://images-eu.ssl-images-amazon.com/images/I/51dsU-oLu1L._SX300_SY300_QL70_FMwebp_.jpg" alt={item.name}></img>
                      <p>Catogary : <span>{item.type}</span></p>
                      <p>{item.name}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrency(item.price)}</div>
                      <input type='number' className="qty" onChange={(e)=>this.handleChange(e, i)} name="qty" value={products.length>0 && products[i].qty} ></input>
                      <button
                        onClick={() => this.props.addToCart(products[i])}
                        className="button primary"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>
        {item && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
              <img src="https://images-eu.ssl-images-amazon.com/images/I/51dsU-oLu1L._SX300_SY300_QL70_FMwebp_.jpg" alt={item.name}></img>
                      
                <div className="product-details-description">
                  <p>                      <input type='number' className="qty" onChange={(e)=>this.handleChange(e, indexData)} name="qty" value={products.length>0 && products[indexData].qty} ></input>
</p>
                <p>Catogary : <span>{item.type}</span></p>
                  <p>
                    <strong>{item.name}</strong>
                  </p>
             
                  <div className="product-price">
                    <div>{formatCurrency(item.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(products[indexData]);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({ products: state.products.filteredItems }),
  {
    fetchProducts,
    addToCart,
  }
)(Products);
