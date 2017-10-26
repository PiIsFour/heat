import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import MeasureGroup from './MeasureGroup'
import Measure from './Measure'
import composeState from './state'

describe('MeasureGroup', () => {
	const state = composeState().compose('twin', 'kg', 42, false, 'Temperatur', <msub><mi>T</mi><mi>W in</mi></msub>)
	state.all = {
		valueChanged: jest.fn(),
		inputToggled: jest.fn()
	}
	const opt = {
		name: 'testname',
		childs: ['twin']
	}
	const component = shallow(
		<MeasureGroup state={state} opt={opt}/>
	)

	it('renders and matches our snapshot', () => {
		const component = renderer.create(
			<MeasureGroup state={state} opt={opt}/>
		)
		const tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('contain same nuber of childs as given', () => {
		expect(component.find(Measure)).toHaveLength(opt.childs.length)
	})
})
