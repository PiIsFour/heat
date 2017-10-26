import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './Formula.css'

import loadScript from 'load-script'

const SCRIPT = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_HTMLorMML'

class Formula extends Component {
	constructor (props) {
		super(props)
		this.state = {
			loaded: false
		}
	}

	componentDidMount () {
		// this.preview.innerHTML = this.props.math
		if (this.state.loaded) {
			window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
		} else {
			loadScript(SCRIPT, (err) => {
				if (err) {
					console.log(err)
				} else {
					this.setState({
						loaded: true
					})
					window.MathJax.Hub.Config({
						showMathMenu: true,
						tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
					})
					window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
				}
			})
		}
	}

	componentDidUpdate () {
		window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
	}

	render () {
		if (!this.props.children) {
			return ''
		}
		return <span><math xmlns="http://www.w3.org/1998/Math/MathML">{this.props.children}</math></span>
	}
}

Formula.propTypes = {
	children: PropTypes.node
}

export default Formula
