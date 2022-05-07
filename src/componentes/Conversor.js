import React, { Component } from 'react';
import './Conversor.css'

export default class Conversor extends Component {

  constructor(props){
      super(props)

      this.state = {
          moedaA_valor:'',
          moedaB_valor:0,
      }
      this.converter = this.converter.bind(this);
  } 
  
  converter(){

    let money = `${this.props.moedaA}${this.props.moedaB}`
    let de_para = `${this.props.moedaA}-${this.props.moedaB}`;
    let url = `https://economia.awesomeapi.com.br/last/${de_para}`

    fetch(url).then(res=>{
        return res.json()
    })
    .then(json=>{
        let cotacao = json[money].high;
        let moedaB_valor_h = (parseFloat(this.state.moedaA_valor) * cotacao).toFixed(2)
        this.setState({ moedaB_valor_h })

        cotacao = json[money].low;
        let moedaB_valor_l = (parseFloat(this.state.moedaA_valor) * cotacao).toFixed(2)
        this.setState({ moedaB_valor_l })
    })

  }

  render(){
      return (
          <div className='conversor'>
              <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
              <input type='text' onChange={(event)=>{this.setState({moedaA_valor:event.target.value})}}></input>
              <input type='button' value='Converter' onClick={this.converter}></input>
              <h2>Maior valor: {this.state.moedaB_valor_h}</h2>
              <h2>Menor valor: {this.state.moedaB_valor_l}</h2>

          </div>
      )
  }
}
