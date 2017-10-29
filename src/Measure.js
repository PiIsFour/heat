import React, {Component} from 'react'
import './Measure.css'

import Formula from './Formula'

class Measure extends Component {
	constructor (props) {
		super(props)
		this.handleValueUpdate = this.handleValueUpdate.bind(this)
		this.handleInputUpdate = this.handleInputUpdate.bind(this)
	}
	handleValueUpdate (event) {
		const {valueChanged, name} = this.props.state
		valueChanged(name, event.target.value)
	}
	handleInputUpdate (event) {
		const {inputToggled, name, input} = this.props.state
		inputToggled(name, !input)
	}
	render () {
		const {unit, input, calculated, symbol, value, longname, formul, inactive} = this.props.state
		const style = {}
		if (!input && !calculated) {
			style.backgroundColor = 'gray'
		}
		return <div className="Measure" style={style}>
			<div>{longname}</div>
			<div>
				<input className="input" type="checkbox" checked={input} disabled={calculated || inactive} onChange={this.handleInputUpdate}/>
				<Formula>{symbol}</Formula>
				<input className="value" type="text" readOnly={!input} disabled={!input && !calculated} value={calculated ? value.toFixed(2) : value} onChange={this.handleValueUpdate}/>
				<span className="unit">{unit}</span>
			</div>
			<div><Formula>{formul}</Formula></div>
		</div>
	}
}

export default Measure
