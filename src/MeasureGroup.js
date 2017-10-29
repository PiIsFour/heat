import React, {Component} from 'react'
import './MeasureGroup.css'

import Measure from './Measure'

class MeasureGroup extends Component {
	render () {
		const {state, opt} = this.props
		return <div className="MeasureGroup" style={opt.style}><div className="name">{opt.name}</div>
			{
				opt.childs
					.map(n => ({...state[n], ...state.all, name: n, inactive: opt.inactive}))
					.map(state => (<Measure key={state.name} state={state}/>))
			}
		</div>
	}
}

export default MeasureGroup
