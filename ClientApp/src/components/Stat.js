import React, { Component } from 'react';

export class Stat extends Component {
  static displayName = Stat.name;

  render () {
    return (
      <div className="container">
          <div className="row justify-content-center">
              <div className="col-lg-6 mt-4">
                   <h1>Знайдено <i className="text-warning "> 23 </i> оголошень</h1>
              </div>
          </div>
          <div className="row justify-content-center">
              <div className="col-lg-3 mt-5 border border-secondary p-3 shadow rounded">
                   <h2 className="text-warning text-center"> 23 </h2>
                   <p className="text-center mt-3 font-weight-bold">Макс. ціна</p>
              </div>
              <div className="col-lg-3 mt-5 border border-secondary p-3 shadow offset-lg-1 rounded">
              <h2 className="text-warning text-center"> 2 </h2>
                   <p className="text-center mt-3 font-weight-bold">Мын. ціна</p>
              </div>
              <div className="col-lg-3 mt-5 border border-secondary p-3 shadow offset-lg-1 rounded">
              <h2 className="text-warning text-center"> 14 </h2>
                   <p className="text-center mt-3 font-weight-bold">Сер. ціна</p>
              </div>
          </div>
      </div>
    );
  }
}
