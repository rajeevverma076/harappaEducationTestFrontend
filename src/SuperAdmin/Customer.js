import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment'

class Customer extends Component {

    constructor() {
        super();
        this.state = {
            isLoading:false,
            orderDetail:[],
            showModal:false,
            shipping:'',
            accepted :"",
            rejected : "",
            dispatched :"",
            delivered:""
        };
    }

    async componentDidMount() {
        this.setState({isLoading: true})
        this.props.getOrder(async (result)=>{
            //console.log(result)
            this.setState({isLoading: false,},()=>{
           })
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.orderDetail !== prevState.orderDetail) {
           // console.log(nextProps.orderDetail.data)
           if(nextProps.orderDetail.data && nextProps.orderDetail.data.length > 0){
            // console.log(nextProps.orderDetail.data[0].shipping)
            return {orderDetail: nextProps.orderDetail.data,
                shipping: nextProps.orderDetail.data[0].shipping
             };
           }
           
        }
        else return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.orderDetail !== this.props.orderDetail) {
            if(this.props.orderDetail.data && this.props.orderDetail.data.length > 0){
                let shipping=this.props.orderDetail.data[0].shipping.tracking.status;
                // console.log("RECORDDDDDDDDDDDDDDDDDDDDDD")
                // console.log(shipping)
                if(shipping.accepted)
                this.setState({accepted:"active"});
                if(shipping.rejected)
                this.setState({rejected:"active"});
                if(shipping.dispatched)
                this.setState({dispatched:"active"});
                if(shipping.delivered)
                this.setState({delivered:"active"});
            }
        }
      }
     
    handleClose=()=>{
        this.setState({showModal: false})
    }
    openModel=()=>{
        this.setState({showModal: true})
    }
    
    getRender=(data)=>{
        if(data && data.length > 0){
            let rows = [];
            let total = 0;
            let product=data[0].products;
            for (var i = 0; i < product.length; i++) {
                total +=product[i].unit_cost;
                rows.push(<tr key={i}><td>
                    <figure className="itemside align-items-center">
                       <div className="aside"><img src={product[i].product_image}
                          className="img-thumbnail img-sm mr-3"/></div>
                       <figcaption className="info">
                          <a href="#" className="title text-dark"
                             data-abc="true">{product[i].title}</a>
                          <p className="text-muted small">Sku :- {product[i].sku}</p>
                       </figcaption>
                    </figure>
                 </td>
                 <td>
                    <select className="form-control">
                       <option>{product[i].quantity}</option>
                       {/* <option>2</option>
                       <option>3</option>
                       <option>4</option>
                       <option>5</option>
                       <option>6</option> */}
                    </select>
                 </td>
                 <td>
                    <div className="price-wrap"> <var className="price">₹ {product[i].unit_cost}</var> </div>
                 </td>
                 <td className="text-right d-none d-md-block"> <a href="" className="btn btn-light"
                    data-abc="true"> Remove</a> </td></tr>);
            }
            return <div className="row">
            <aside className="col-lg-9">
               <div className="card">
                  <div className="table-responsive">
                     <table className="table table-borderless table-shopping-cart">
                        <thead className="text-muted">
                           <tr className="small text-uppercase">
                              <th scope="col">Product</th>
                              <th scope="col" width="120">Quantity</th>
                              <th scope="col" width="120">Price</th>
                              <th scope="col" className="text-right d-none d-md-block" width="200"></th>
                           </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                     </table>
                  </div>
               </div>
            </aside>
            <aside className="col-lg-3">
               <div className="card">
                  <div className="card-body">
                     <dl className="dlist-align">
                        <dt>Total price:</dt>
                        <dd className="text-right ml-3"><strong>₹ {total}</strong></dd>
                     </dl>
                     <dl className="dlist-align">
                        <dt>Discount:</dt>
                        <dd className="text-right text-danger ml-3"><strong>- ₹ 10.00</strong></dd>
                     </dl>
                     <dl className="dlist-align">
                        <dt>Total:</dt>
                        <dd className="text-right text-dark b ml-3"><strong>₹ {total-10}</strong></dd>
                     </dl>
                     <hr/>
                     {/* <a href="#" className="btn btn-out btn-primary btn-square btn-main"> Checkout</a>  */}
                     <a href="#"  onClick={this.openModel} className="btn btn-out btn-primary bg-green btn-square btn-main mt-3"
                        data-toggle="modal"
                        data-target="#myModal">Track Your Order</a>
                  </div>
               </div>
            </aside>
           {/* Model for tracking */}
           <Modal show={this.state.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <span>Order Status :</span>
               <span className="ml-3">{this.state.shipping ? this.state.shipping.tracking.tracking_number:''}</span> </Modal.Title>
        </Modal.Header>
        <Modal.Body> <div className="modal-body">
            <div className="progress-track">
               <ul id="progressbar">
                  <li className={`step0 ${this.state.accepted}`} id="step1">Accepted</li>
                  <li className={`step0 ${this.state.rejected} text-center`} id="step2">Rejected</li>
                  <li className={`step0 ${this.state.dispatched} text-center`} id="step3"><span id="three">Dispatched</span></li>
                  <li className={`step0 ${this.state.delivered} text-center`} id="step4">Delivered</li>
               </ul>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="details d-table">
                     <div className="d-table-row">
                        <div className="d-table-cell"> Shipped with </div>
                        <div className="d-table-cell"> <strong>{this.state.shipping ? this.state.shipping.tracking.company:''}</strong> </div>
                     </div>
                     <div className="d-table-row">
                        <div className="d-table-cell"> Estimated Delivery </div>
                        <div className="d-table-cell"> <strong>{this.state.shipping ? moment(this.state.shipping.tracking.estimated_delivery).format('Do MMM YYYY'):''}</strong> </div>
                     </div>
                  </div>
               </div>
            </div>
         </div></Modal.Body>
      </Modal>
{/* Model End here */}
         </div>
        }
        else{
          return <div className="row">Record not found</div>
        }
    }
    render() {

        //console.log(this.props.orderDetail)
        if(this.props.isLoading){
            return <div className="spinner-border"></div>
        }
            return (
               <div>{this.getRender(this.state.orderDetail)}</div>
            )
    }
}

const mapStateToProps = ({ authUser }) => {
    const { orderDetail,isLoading } = authUser
    return { orderDetail,isLoading };
};

export default connect(mapStateToProps, actions)(Customer);

