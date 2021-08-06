import React, { Component } from "react";
import { connect } from "react-redux";
import { sortProducts, sortProductsByCatogary, wildCartSearch} from "../actions/productActions";

class Filter extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       search:''
    }
  }
  
  handleChange = (event) => {
    this.setState({
      search:event.target.value
    }, ()=>{
this.props.wildCartSearch(this.state.search)
    });
  };
  

  componentDidMount(){
   
  }

  render() {
    const {search} = this.state;
    return !this.props.filteredProducts ? (
      <div>Loading...</div>
    ) : (
      <>
       <div className="wildcard">
          <input placeholder="search..." type='text' value={search} name="search" onChange={this.handleChange} />
        </div>
      <div className="filter">
       
        <div className="filter-result">
          {this.props.filteredProducts.length} Products
        </div>
        <div className="filter-sort">
          Order{" "}
          <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProducts(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option value="latest">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="filter-sort">
        Category{" "}
          <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProductsByCatogary(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
             <option value="select" disabled selected> select...</option>
            <option value="dairy">Dairy</option>
            <option value="fruit">Fruit</option>
            <option value="vegetable">Vegetable</option>
            <option value="bakery">Bakery</option>
            <option value="vegan">Vegan</option>
            <option value="meat">Meat</option>
          </select>
        </div>

        
      </div>
      </>
    );
  }
}
export default connect(
  (state) => ({
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    sortProducts,
    sortProductsByCatogary,
    wildCartSearch
  }
)(Filter);
