import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

export default class App extends Component {
    state = { availableShipments: [1,2,3], shipmentInfo : {}, shipmentID:0, showInfo:false };
    
    handleServerResponse = (products, basket) => {
    console.log(products, basket);
    const items = products.map((e) => {
      const basketIndex = basket.findIndex((b) => b.id == e.id);
      const quantity = basketIndex !== -1 ? basket[basketIndex].quantity : 0;
      return { ...e, quantity };
    });
    console.log(items);
    return items;
  };
  onShipmentIDChange = (e) =>{
      this.setState({
          shipmentID : e.target.value
      })
  }

  getShipmentInfo = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:9000/shipment/${this.state.shipmentID}`).then((res) => {
        console.log(res)
        this.setState({
        shipmentInfo:res.data,
        showInfo:true
        })
    })
  }
  
  componentDidMount() {
    axios.get('http://localhost:9000/shipments').then((res) => {
        console.log(res)
        this.setState({
            availableShipments:res.data.map(el => el.id)
        })
    })
  }

  render() {
      console.log(this.state.availableShipments)
      const {availableShipments, shipmentInfo, showInfo} = this.state
    return (
      <div className='main'>
        <span className='ids'>{`Available ids: ${availableShipments} `}</span>
        <form className='form' onSubmit={this.getShipmentInfo}>
          <div className='row'>
            <div className="col">
              <input type="number" className="form-control" placeholder="Enter shipment id" onChange={this.onShipmentIDChange}></input>
              <button className="btn btn-primary" type="submit">Get info</button>
            </div>
          </div>
        </form>
        { showInfo ? (shipmentInfo.id == -1 ? <span>No info</span> : <span>{`Date:${shipmentInfo.date}; Price:${shipmentInfo.price}; Reciever: ${shipmentInfo.reciever}`}</span>) : ""}
      </div>
    );
  }
}
