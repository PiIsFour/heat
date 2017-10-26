import React from 'react'
import renderer from 'react-test-renderer'

import Formula from './Formula'

describe('Formula', () => {
	it('renders and matches our snapshot', () => {
		const component = renderer.create(
			<Formula><mn>1</mn></Formula>
		)
		const tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})
})
