import React, { Component } from 'react';
import $ from 'jquery'; 

export class Stat extends Component {
  static displayName = Stat.name;

  constructor(props){
     super(props)
     console.log(props.mark)
     console.log(props.model)
     this.state = {avgPrice:0, minPrice: 0, maxPrice: 0, cars: 0};
   }
 
   componentDidMount(){
     let self = this
     $.ajax({
       type: 'GET',    
       url:"/Main/GetPrices",
       data:{'idMark': this.props.mark,
       'idModel': this.props.model},
       success: function(data){
         const res = JSON.parse(data);
         console.log(res)
         self.setState({cars: res.prices.length});
         self.setState({avgPrice:Math.floor(res.arithmeticMean)});
         self.setState({minPrice: Math.min.apply(null, res.prices)})
         self.setState({maxPrice: Math.max.apply(null, res.prices)})
     //     res.forEach((item,index)=> {
     //       console.log(item.name)
     //       ar.push(<option>{item.name}</option>)
     //     });
     //     self.setState({models:res});
     //     console.log(self.state.models)
        }
   });
}

  render () {
    return (
      <div className="container">
          <div className="row justify-content-center">
              <div className="col-lg-6 mt-4">
                   <h1>Знайдено <i className="text-warning "> {this.state.cars-1} </i> оголошень</h1>
              </div>
          </div>
          <div className="row justify-content-center">
              <div className="col-lg-3 mt-5 border border-secondary p-3 shadow rounded">
                   <h2 className="text-warning text-center"> {this.state.maxPrice} $</h2>
                   <p className="text-center mt-3 font-weight-bold">Макс. ціна</p>
              </div>
              <div className="col-lg-3 mt-5 border border-secondary p-3 shadow offset-lg-1 rounded">
              <h2 className="text-warning text-center"> {this.state.avgPrice} $</h2>
                   <p className="text-center mt-3 font-weight-bold">Сер. ціна</p>
              </div>
              <div className="col-lg-3 mt-5 border border-secondary p-3 shadow offset-lg-1 rounded">
              <h2 className="text-warning text-center"> {this.state.minPrice} $</h2>
                   <p className="text-center mt-3 font-weight-bold">Мiн. ціна</p>
              </div>
          </div>
      </div>
    );
  }
}
