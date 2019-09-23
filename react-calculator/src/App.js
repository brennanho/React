import React from 'react';
import styled from 'styled-components';
import './App.css';
import { thisTypeAnnotation } from '@babel/types';

const Calc = styled.div`
	width: 300px;
`;

const CalcTopScreen = styled.div`
	background: #3A4655;
	width: 100%;
	height: 150px;
`;

const CalcOperation = styled.div`
	text-align: right;
	color: #727B86;
	font-size: 30px;
	padding-bottom: 10px;
	padding-right: 20px;
	border-bottom: dotted 1px;
	min-height: 40px;
`;

const CalcResult = styled.div`
	margin-top: 20px;
	font-size: 45px;
	text-align: center;
	color: #fff;
`;

const CalcBody = styled.div`
	width: 350px;
	margin: auto;
	min-height: 400px;
	border: solid 1px #3A4655;
	box-shadow: 0 8px 50px -7px black;
`;

const CalcRow = styled.div`
	width: 100%;
	background: #3C4857;
`;

const Button = styled.button`
	width: 25%;
	background: #425062;
	color: #fff;
	padding: 25px;
	display: inline-block;
	font-size: 30px;
	text-align: center;
	vertical-align: middle;
	border-right: solid 2px #3C4857;
	border-bottom: solid 2px #3C4857;
	transition: all 0.2s ease-in-out;
	:hover {
		background: #E0B612;
  		transform: rotate(5deg);
	}
`;

const EdgeButtons = styled(Button)`
	color: #AEB3BA;
  	background: #404D5E;
`;

class Calculator extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputs: [],
			input: '',
			answer: '0',
		};

		this.handleClickNum = this.handleClickNum.bind(this);
		this.handleClickCalc = this.handleClickCalc.bind(this);
		this.handleClickEval = this.handleClickEval.bind(this);
		this.evaluate = this.evaluate.bind(this);
	}

	evaluate(list){
		console.log(list);
		if (list.length == 0)
			return 0;
		let result = parseFloat(list[0]);
		for (let i = 2; i < list.length; i = i + 2) {
			let val = parseFloat(list[i]);
			let opp = list[i-1];
	
			if (opp === '+')
				result += val;
			else if (opp === '-')
				result -= val;
			else if (opp === '/')
				result /= val;
			else if (opp === 'x')
				result *= val;
		}
		console.log(result);
		return result.toFixed(2);
	} 

	handleClickNum(event) {
		console.log(this.state.input);
		this.setState({
			input: this.state.input.concat(event.target.value)
		});
	}

	handleClickCalc(event) {
		this.setState({
			inputs: this.state.inputs.concat(this.state.input).concat(event.target.value),
			input: ''
		})
	}
	
	handleClickEval(event) {
		this.setState({
			inputs: [],
			input: '',
			answer: this.evaluate(this.state.inputs.concat(this.state.input))
		})
	}

	render() {
		return (
			<Calc>
				<CalcBody>
					<CalcTopScreen>
						<CalcOperation>
							{this.state.inputs} 
							{this.state.input} 
						</CalcOperation>
						<CalcResult> {this.state.answer} </CalcResult>
					</CalcTopScreen>
					<CalcRow> 
						<EdgeButtons value={'C'} onClick={this.handleClickCalc}> C</EdgeButtons>
						<EdgeButtons value={'≠'} onClick={this.handleClickCalc}> ≠</EdgeButtons>
						<EdgeButtons value={'%'} onClick={this.handleClickCalc}> %</EdgeButtons>
						<EdgeButtons value={'/'} onClick={this.handleClickCalc}> /</EdgeButtons>
					</CalcRow>
					<CalcRow> 
						<Button value={'7'} onClick={this.handleClickNum}> 7</Button>
						<Button value={'8'} onClick={this.handleClickNum}> 8</Button>
						<Button value={'9'} onClick={this.handleClickNum}> 9</Button>
						<EdgeButtons value={'x'} onClick={this.handleClickCalc}> X</EdgeButtons>
					</CalcRow>
					<CalcRow>
						<Button value={'4'} onClick={this.handleClickNum}> 4</Button>
						<Button value={'5'} onClick={this.handleClickNum}> 5</Button>
						<Button value={'6'} onClick={this.handleClickNum}> 6</Button>
						<EdgeButtons value={'-'} onClick={this.handleClickCalc}> -</EdgeButtons>
					</CalcRow>
					<CalcRow>
						<Button value={'1'} onClick={this.handleClickNum}> 1</Button>
						<Button value={'2'} onClick={this.handleClickNum}> 2</Button>
						<Button value={'3'} onClick={this.handleClickNum}> 3</Button>
						<EdgeButtons value={'+'} onClick={this.handleClickCalc}> +</EdgeButtons>
					</CalcRow> 
					<CalcRow>
						<Button value={'.'} onClick={this.handleClickNum}> .</Button>
						<Button value={'0'} onClick={this.handleClickNum}> 0</Button>
						<Button value={'?'} onClick={this.handleClickCalc}> ?</Button>
						<EdgeButtons value={'='} onClick={this.handleClickEval}> =</EdgeButtons>
					</CalcRow>
				</CalcBody>
			</Calc>
		)
	};
}
export {Calculator}