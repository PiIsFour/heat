import React from 'react';

class calculator{
	constructor(){
		this.formulas = [];
	}
	add(output, inputs, fn, formul){
		this.formulas.push({
			output: output,
			inputs: inputs,
			fn: fn,
			formul: <math xmlns="http://www.w3.org/1998/Math/MathML">{formul}</math>,
		});
		return this;
	}
	run(state){
		const measurements = Object.keys(state).filter(x => x !== "all");
		measurements.forEach(m => {
			state[m].calculated = false;
			state[m].formul = "";
		});
		let changed;
		const checkAndApply = f => {
			if(state[f.output].input || state[f.output].calculated){
				return;
			}
			if(!f.inputs.map(i => state[i].input || state[i].calculated).reduce((sum, avaidable) => sum && avaidable, true)){
				return;
			}
			changed = true;
			state[f.output].value = f.fn(f.inputs.reduce((sum, i) => ({...sum, [i]: state[i].value}), {}));
			state[f.output].calculated = true;
			state[f.output].formul = f.formul;
		}
		do{
			changed = false;
			this.formulas.forEach(checkAndApply);
		}while(changed);
	}
}

function makeCalculator(){
	return new calculator();
}

export default makeCalculator;
