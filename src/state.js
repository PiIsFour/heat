class State {
	compose (name, unit, value, input, longname, symbol) {
		this[name] = {
			unit,
			input,
			calculated: false,
			value,
			longname,
			symbol,
			formul: ''
		}
		return this
	}
}

function composeState () {
	return new State()
}

export default composeState
