import React, { Component } from 'react';
import './App.css';
import './index.css';

export class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      digitValue: '0',
      waitingForOperand: false,
      operator: null
    };
  }

  digitChange(digit) {
  	if(this.state.waitingForOperand === true) {
  		this.setState({
     	digitValue: String(digit),
     	waitingForOperand: false
    	});
  	}
  	else 
  	{
	    this.setState({
	      digitValue: this.state.digitValue === '0' ? String(digit) : this.state.digitValue + digit
	    });
  	}
  	
  } 

  addDot (){
  	if(this.state.waitingForOperand === true) {
  		this.setState({
      	digitValue: '.',
      	waitingForOperand: false
    });
  	} else if(this.state.digitValue.indexOf('.') === -1) {
  		this.setState({
      	digitValue: this.state.digitValue + '.',
      	waitingForOperand: false
    });
  	}
  }

  clearInput() {
  	this.setState({
      	digitValue: '0'
  });

}

	addChar() {
		this.setState({
      	digitValue: this.state.digitValue.charAt(0) === '-' ? this.state.digitValue.substr(1) : '-' + this.state.digitValue
  });
	}

	addPercent() {
		const value = parseFloat(this.state.digitValue);
		this.setState({
      	digitValue: String(value/100)
 		 });
	}

	performOperation(myOperator) {
		const secondValue = parseFloat(this.state.digitValue);

		const operations = {
			'/': (firstValue, secondValue) => firstValue / secondValue,
			'*': (firstValue, secondValue) => firstValue * secondValue,
			'-': (firstValue, secondValue) => firstValue - secondValue,
			'+': (firstValue, secondValue) => firstValue + secondValue,
			'=': (firstValue, secondValue) => secondValue
		}



		
		if(this.state.value == null) {
			this.setState({
	      	value: secondValue
	 		 });
		} else if(this.state.operator){
			const currentValue = this.state.value || 0
			const computedValue = operations[this.state.operator](currentValue, secondValue)

			this.setState({
				value: computedValue,
		      	digitValue: String(computedValue)
 			 })
		}

		this.setState({
      	waitingForOperand: true,
      	operator: myOperator
 		 });
	}

  render() {
   
    return (
      <div className="calculator">
      
        <div class="calculator-display">{this.state.digitValue}</div>
        <div className="calculator-keypad">
          <div className="input-keys">
          <div className="operator-keys">
            <button class="calculator-key " onClick={() => this.performOperation('/')}><p>÷</p></button>
            <button class="calculator-key " onClick={() => this.performOperation('*')}><p>*</p></button>
            <button class="calculator-key " onClick={() => this.performOperation('-')}><p>-</p></button>
            <button class="calculator-key " onClick={() => this.performOperation('+')}><p>+</p></button>
            <button class="calculator-key "onClick={() => this.performOperation('=')}><p>=</p></button>
          </div>
            <div className="function-keys">
              <button class="calculator-key" onClick={() => this.clearInput()}><p>C</p></button>
              <button class="calculator-key" onClick={() => this.addChar()}><p>±</p></button>
              <button class="calculator-key" onClick={() => this.addPercent()}><p>%</p></button>
            </div>
             <div className="digit-keys">
              <button class="calculator-key"  value={this.state.digitValue} onClick={() => this.digitChange(1)}><p>1</p></button>
              <button class="calculator-key"  value={this.state.digitValue} onClick={() => this.digitChange(2)}><p>2</p></button>
              <button class="calculator-key"  value={this.state.digitValue} onClick={() => this.digitChange(3)}><p>3</p></button>
             </div>
             <div className="digit-keys"> 
              <button class="calculator-key"  value={this.state.digitValue} onClick={() => this.digitChange(4)}><p>4</p></button>
              <button class="calculator-key"  value={this.state.digitValue} onClick={() => this.digitChange(5)}><p>5</p></button>
              <button class="calculator-key"  value={this.state.digitValue} onClick={() => this.digitChange(6)}><p>6</p></button>
             </div>
             <div className="digit-keys">
              <button class="calculator-key"  value={this.state.digitValue} onClick={() => this.digitChange(7)}><p>7</p></button>
              <button class="calculator-key"  value={this.state.digitValue} onClick={() => this.digitChange(8)}><p>8</p></button>
              <button class="calculator-key"  value={this.state.digitValue} onClick={() => this.digitChange(9)}><p>9</p></button>
            </div>
            <div className="digit-keys">
              <button class="calculator-key key-0"  value={this.state.digitValue} onClick={() => this.digitChange(0)}><p>0</p></button>
              <button class="calculator-key" value={this.state.digitValue} onClick={() => this.addDot()}><p>,</p></button>
             </div>
          </div>
        </div>
      </div>
    )
  }
}
