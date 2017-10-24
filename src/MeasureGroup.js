import React, {Component} from 'react'
import './MeasureGroup.css'

import Measure from './Measure'

class MeasureGroup extends Component {
	render () {
		const {state, opt} = this.props
		return <div className="MeasureGroup" style={opt.style}>{opt.name}
			{
				opt.childs
					.map(n => ({...state[n], ...state.all, name: n}))
					.map(state => (<Measure key={state.name} state={state}/>))
			}
		</div>
	}
}

export default MeasureGroup
