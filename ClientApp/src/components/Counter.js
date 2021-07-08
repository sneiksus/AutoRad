import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0, badKey: false, pass: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keyChange = this.keyChange.bind(this);
  }

  keyChange(e){
    this.setState({pass: e.target.value});
    console.log(e.target.value);
  }

 handleSubmit(re){
  re.preventDefault();
  const formData = new FormData();
  formData.append("key", this.state.pass);

  fetch("/Main/Auth", {
    method: "POST", 
    headers: {
      'Accept': 'application/json',
     
    },
    body:formData
  }).then(res => {
    if(res.status==200){
      res.json().then(data => {
        sessionStorage.setItem('tokenKey', data.access_token);
        window.location.href = '/';
      });
    }
    else
    this.setState({badKey:true});
  })
}



  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div className="row justify-content-center">
       <div className="col-lg-4">
       <Form onSubmit={this.handleSubmit}  method='POST' className="vc  p-4  border border-secondary">
      <FormGroup>
        <Label for="key">Авторизація</Label>
        <Input name="key" id="key" onChange={this.keyChange} placeholder="Введіть свій ключ" />
        { this.state.badKey &&
        <i className="text-warning">Невірний ключ</i>
        }
      </FormGroup>
      <Button type="submit" className="bg-warning">Вхід</Button>
      </Form>
       </div>
       </div>
    );
  }
}
