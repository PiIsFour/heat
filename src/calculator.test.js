import React from 'react'
import makeCalculator from './calculator'
import composeState from './state'

describe('calculator', () => {
	it('calls the calculator funktion', () => {
		const mock = jest.fn()
		const state = composeState()
			.compose('twin', '°C', 20, true, <msub><mi>T</mi><mi>W in</mi></msub>)
			.compose('twout', '°C', 20, false, <msub><mi>T</mi><mi>W out</mi></msub>)
		const calc = makeCalculator()
			.add('twout', ['twin'], mock)
		calc.run(state)
		expect(mock).toBeCalled()
	})

	it('updates dependent values', () => {
		const state = composeState()
			.compose('twin', '°C', 20, true, <msub><mi>T</mi><mi>W in</mi></msub>)
			.compose('twout', '°C', 5, false, <msub><mi>T</mi><mi>W out</mi></msub>)
		const calc = makeCalculator()
			.add('twout', ['twin'], i => i.twin)
		calc.run(state)
		expect(state.twout.value).toEqual(state.twin.value)
		expect(state.twout.calculated).toEqual(true)
	})
})
