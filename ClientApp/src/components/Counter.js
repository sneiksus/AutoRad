import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0, badKey: true };
    this.incrementCounter = this.incrementCounter.bind(this);
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
       <Form className="vc  p-4  border border-secondary">
      <FormGroup>
        <Label for="key">Авторизація</Label>
        <Input name="key" id="key" placeholder="Введіть свій ключ" />
        { this.state.badKey &&
        <i className="text-warning">Невірний ключ</i>
        }
      </FormGroup>
      <Button className="bg-warning">Вхід</Button>
      </Form>
       </div>
       </div>
    );
  }
}
