import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import Measure from './Measure'

describe('Measure', () => {
	const state = {
		name: 't w in',
		unit: 'kg',
		input: false,
		value: 42,
		symbol:
			<math xmlns="http://www.w3.org/1998/Math/MathML">
				<mrow>
					<msub><mi>T</mi><mi>W in</mi></msub>
				</mrow>
			</math>,
		valueChanged: jest.fn(),
		inputToggled: jest.fn()
	}
	const component = shallow(
		<Measure state={state}/>
	)

	it('renders and matches our snapshot', () => {
		const component = renderer.create(
			<Measure state={state}/>
		)
		const tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('contains the form elements', () => {
		expect(component.find('input.input')).toHaveLength(1)
		expect(component.find('input.value')).toHaveLength(1)
	})

	it('contains the unit', () => {
		expect(component.text()).toContain(state.unit)
	})

	it('updates the form when keys are pressed', () => {
		const updateKey = '12'
		component.instance().handleValueUpdate({ target: { value: updateKey } })
		expect(state.valueChanged).toBeCalled()
	})

	it('updates the form when input is toggled', () => {
		component.instance().handleInputUpdate()
		expect(state.inputToggled).toBeCalled()
	})
})
