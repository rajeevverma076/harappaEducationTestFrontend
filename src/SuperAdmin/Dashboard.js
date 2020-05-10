import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            isLoading:false,
            orderDetail:[],
        };
    }

    async componentDidMount() {
        this.setState({isLoading: true})
        this.props.getRequestOrder(async (result)=>{
            //console.log(result)
            this.setState({isLoading: false,},()=>{
           })
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.orderDetail !== prevState.orderDetail) {
           // console.log(nextProps.orderDetail.data)
           if(nextProps.orderDetail.data && nextProps.orderDetail.data.length > 0){
            console.log(nextProps.orderDetail.data);
            return {orderDetail: nextProps.orderDetail.data,
                shipping: nextProps.orderDetail.data[0].shipping};
           }
        }
        else return null;
    }

    getRender=(data)=>{
        if(data && data.length > 0){
            let rows = [];
            let total = 0;
            let product=data[0].products;
            for (var i = 0; i < product.length; i++) {
                total +=product[i].unit_cost;
                        rows.push(<tr><td>
                        <figure className="media">
                            <div className="img-wrap"><img src={product[i].product_image} className="img-thumbnail img-sm mr-3" /></div>
                            <figcaption className="info">
                                <a href="#" className="title text-dark"
                                    data-abc="true">{product[i].title}</a>
                                <p className="text-muted small">Sku :- {product[i].sku}</p>
                            </figcaption>
                        </figure>
                        </td>
                        <td>
                        {product[i].quantity}
                        </td>
                        <td>
                        <div className="price-wrap">
                            <var className="price">₹ {product[i].unit_cost}</var>
                            <small className="text-muted">(₹ {product[i].unit_cost} each)</small>
                        </div>
                        </td>
                        <td className="text-right">
                        <a href="" className="btn btn-success" > Accept</a>
                        <a href="" className="btn btn-light" > Reject</a>
                        </td>
                        </tr>);
            }
            return <div className="row">
            <aside className="col-lg-12">
                    <div className="card">
                        <table className="table table-hover shopping-cart-wrap">
                            <thead className="text-muted">
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col" width="150">Quantity</th>
                                    <th scope="col" width="200">Price</th>
                                    <th scope="col" width="250" className="text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                </aside>
         </div>
        }
        else{
          return <div className="row">Record not found</div>
        }
    }

    render() {
        console.log(this.props.orderDetail)
        if(this.props.isLoading){
            return <div className="spinner-border"></div>
        }
            return (
               <div>{this.getRender(this.state.orderDetail)}</div>
            )
    }
}

// const mapStateToProps = ({ authUser }) => {
//     const { orderDetail,isLoading } = authUser
//     return { orderDetail,isLoading };
// };

// export default connect(mapStateToProps, actions)(Dashboard);

const mapStateToProps = ({ authUser }) => {
    const { orderDetail,isLoading } = authUser
    return { orderDetail,isLoading };
};

export default connect(mapStateToProps, actions)(Dashboard);