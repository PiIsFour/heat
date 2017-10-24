import React from 'react'

class State {
	compose (name, unit, value, active, symbol) {
		this[name] = {
			unit: unit,
			input: active,
			calculated: false,
			value: value,
			symbol:
				<math xmlns="http://www.w3.org/1998/Math/MathML">
					{symbol}
				</math>,
			formul: ''
		}
		return this
	}
}

function composeState () {
	return new State()
}

export default composeState
