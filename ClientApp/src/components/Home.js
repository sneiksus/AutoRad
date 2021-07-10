import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { Stat } from './Stat';
import $ from 'jquery'; 

export class Home extends Component {
  static displayName = Home.name;

  constructor(props){
    super(props)
    this.state = {isLogged:false, isResult: false, marks: [], models: [], selectedMark: 1, selectedModel: null, search: false};
    this.getModels = this.getModels.bind(this);
    this.modelChanged = this.modelChanged.bind(this);
    this.find =this.find.bind(this);
  }

  find(){
   this.setState({search: true})
  }

  modelChanged(e){
       this.setState({selectedModel:e.target.value})
  }

  getModels(e){
    this.setState({selectedMark:e.target.value})
    let self = this
    $.ajax({
      type: 'POST',    
      url:"/Main/GetModels",
      data:{'idModel': e.target.value},
      success: function(data){
        const res = JSON.parse(data);
        console.log(res)
        const ar=[];
        res.forEach((item,index)=> {
          console.log(item.name)
          ar.push(<option>{item.name}</option>)
        });
        self.setState({models:res});
        console.log(self.state.models)
      }
  });

    $.post( "/Main/GetModels", function( data ) {
     
    });
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
          let self = this
          $.post( "/Main/GetMarks", function( data ) {
            const res = JSON.parse(data);
            console.log(res)
            const ar=[];
            res.forEach((item,index)=> {
              console.log(item.name)
              ar.push(<option>{item.name}</option>)
            });
            self.setState({marks:res});
            console.log(self.state.marks)
          });
  }

  render () {
    if(this.state.search)
        return(<Stat mark={this.state.selectedMark} model={this.state.selectedModel} />)
    if(this.state.isResult){
    if (this.state.isLogged) {
    
    return (
      <div className="row justify-content-center">
      <div className="col-lg-4">
      <div className="vc  p-4  border border-secondary">
     <div  className="text-center">
       <Label for="key">Пошук авто</Label>
       <Input className="mt-4" name="mark" value={this.state.selectedMark} type="select" id="mark" onChange={this.getModels} placeholder="Марка" >{this.state.marks.map(x => <option value={x.value}>{x.name}</option>)}</Input>
       <Input className="mt-4" name="model" type="select" id="model" value={this.state.selectedModel}  onChange={this.modelChanged} placeholder="Модель" >{this.state.models.map(x => <option value={x.value}>{x.name}</option>)}</Input>
     </div>
     <Button type="submit" onClick={this.find} className="bg-warning mt-3">Шукати</Button>
     </div>
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
