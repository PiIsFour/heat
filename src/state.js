import React from 'react'

class State {
	compose (name, unit, value, input, longname, symbol) {
		this[name] = {
			unit,
			input,
			calculated: false,
			value,
			longname,
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
