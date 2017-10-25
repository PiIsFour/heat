import React from 'react'
import composeState from './state'

describe('state', () => {
	it('returns a state with the item', () => {
		const state = composeState()
			.compose('twin', 'kg', 42, true, 'Eingangstemperatur', <msub><mi>T</mi><mi>W in</mi></msub>)
		expect(state.twin).toEqual({
			unit: 'kg',
			input: true,
			calculated: false,
			value: 42,
			longname: 'Eingangstemperatur',
			symbol: <msub><mi>T</mi><mi>W in</mi></msub>,
			formul: ''
		})
	})

	it('.compose() is chainable', () => {
		const state = composeState()
			.compose('twin', 'kg', 42, false, <mrow><msub><mi>T</mi><mi>W in</mi></msub></mrow>)
			.compose('twout', 'kg', 7, false, <mrow><msub><mi>T</mi><mi>W out</mi></msub></mrow>)
		expect(state.twin.value).toEqual(42)
		expect(state.twout.value).toEqual(7)
	})
})
