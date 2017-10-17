import React from 'react';
import composeState from './state';

describe('state', () => {
	it('returns a state with the item', () => {
		const state = composeState()
			.compose("twin", "kg", 42, <mrow><msub><mi>T</mi><mi>W in</mi></msub></mrow>);
		expect(state.twin).toEqual({
			unit: "kg",
			input: false,
			calculated: false,
			value: 42,
			symbol: 
				<math xmlns="http://www.w3.org/1998/Math/MathML">
						<mrow>
							<msub><mi>T</mi><mi>W in</mi></msub>
						</mrow>
				</math>,
			formul: "",
		});
	});

	it('.compose() is chainable', () => {
		const state = composeState()
			.compose("twin", "kg", 42, <mrow><msub><mi>T</mi><mi>W in</mi></msub></mrow>)
			.compose("twout", "kg", 7, <mrow><msub><mi>T</mi><mi>W out</mi></msub></mrow>);
			expect(state.twin.value).toEqual(42);
			expect(state.twout.value).toEqual(7);
		});
});
