import React from 'react'
import makeCalculator from './calculator'
import composeState from './state'

describe('calculator', () => {
	it('calls the calculator funktion', () => {
		const mock = jest.fn()
		const mockfomula = jest.fn()
		const state = composeState()
			.compose('twin', '°C', 20, true, <msub><mi>T</mi><mi>W in</mi></msub>)
			.compose('twout', '°C', 20, false, <msub><mi>T</mi><mi>W out</mi></msub>)
		const calc = makeCalculator()
			.add('twout', ['twin'], mock, mockfomula)
		calc.run(state)
		expect(mock).toBeCalled()
		expect(mockfomula).toBeCalled()
	})

	it('updates dependent values', () => {
		const state = composeState()
			.compose('twin', '°C', 20, true, <msub><mi>T</mi><mi>W in</mi></msub>)
			.compose('twout', '°C', 5, false, <msub><mi>T</mi><mi>W out</mi></msub>)
		const calc = makeCalculator()
			.add('twout', ['twin'], i => i.twin, (me, i) => <row>{me}<mo>=</mo>{i.twin}</row>)
		calc.run(state)
		expect(state.twout.value).toEqual(state.twin.value)
		expect(state.twout.calculated).toEqual(true)
	})
})
