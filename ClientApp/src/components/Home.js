import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props){
    super(props)
    this.state = {isLogged:false, isResult: false};
   
  }

  componentDidMount(){
    console.log('construct')
    const token = sessionStorage.getItem('tokenKey');
     fetch("/Main/GetLogin", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token  
                }
            }).then(res => {
              if(res.ok === true) {
                 this.setState({isLogged:true});
               
            }
            this.setState({isResult:true});
          });
  }

  render () {
    if(this.state.isResult){
    if (this.state.isLogged) {
    
    return (
      <div className="row justify-content-center">
      <div className="col-lg-4">
      <Form onSubmit={this.handleSubmit}  method='POST' className="vc  p-4  border border-secondary">
     <FormGroup  className="text-center">
       <Label for="key">Пошук авто</Label>
       <Input className="mt-3" name="mark" type="select" id="mark" onChange={this.keyChange} placeholder="Марка" > <option>Марка</option></Input>
       <Input className="mt-3" name="model" type="select" id="model" onChange={this.keyChange} placeholder="Модель" ><option>Модель</option></Input>
     </FormGroup>
     <Button type="submit" className="bg-warning mt-2">Шукати</Button>
     </Form>
      </div>
      </div>
    );
    }
    else
    return <Redirect to='/counter' />
  }
  else{
   return(<h1>Loading..</h1>);
  }
}
}
