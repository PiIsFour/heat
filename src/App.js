import React, { Component } from 'react'
import GithubCorner from 'react-github-corner'
import './App.css'

import MeasureGroup from './MeasureGroup'
import composeState from './state'
import makeCalculator from './calculator'

class App extends Component {
	constructor (props) {
		super(props)
		const state = composeState()
			.compose('P', 'kW', 55, false, 'Leistung', <mi>P</mi>)
			.compose('twin', '°C', 20, false, 'Eingangstemperatur', <msub><mi>T</mi><mi>W in</mi></msub>)
			.compose('twout', '°C', 30, false, 'Ausgangstemperatur', <msub><mi>T</mi><mi>W out</mi></msub>)
			.compose('cw', 'kJ/kgK', 4.18, true, 'Wärmekapazität', <msub><mi>c</mi><mi>W</mi></msub>)
			.compose('Mw', 'kg/s', 1, false, 'Massestrom', <msub><mi>M</mi><mi>W</mi></msub>)
			.compose('toin', '°C', 60, false, 'Eingangstemperatur', <msub><mi>T</mi><mi>O in</mi></msub>)
			.compose('toout', '°C', 40, false, 'Ausgangstemperatur', <msub><mi>T</mi><mi>O out</mi></msub>)
			.compose('co', 'kJ/kgK', 2, true, 'Wärmekapazität', <msub><mi>c</mi><mi>O</mi></msub>)
			.compose('Mo', 'kg/s', 1, false, 'Massestrom', <msub><mi>M</mi><mi>O</mi></msub>)
			.compose('A', 'm²', 1, false, 'Fläche', <mi>A</mi>)
			.compose('k', 'kW/m²K', 1, false, 'Wärmeübergangskoeffizient', <mi>k</mi>)
			.compose('tlog', 'K', 1, false, 'Durchschnittstemperatur', <msub><mi>T</mi><mi>log</mi></msub>)
			.compose('alpha', '', 1, false, 'Alpha', <mi>α</mi>)
			.compose('pw', 'kg/l', 1, true, 'Dichte', <msub><mi>ρ</mi><mi>W</mi></msub>)
			.compose('po', 'kg/l', 1, true, 'Dichte', <msub><mi>ρ</mi><mi>O</mi></msub>)
			.compose('Qw', 'l/min', 60, false, 'Volumenstrom', <msub><mi>Q</mi><mi>W</mi></msub>)
			.compose('Qo', 'l/min', 60, false, 'Volumenstrom', <msub><mi>Q</mi><mi>O</mi></msub>)
		state.all = {
			valueChanged: (name, value) => {
				const state = {...this.state}
				state[name].value = value
				this.calc.run(state)
				this.setState(state)
			},
			inputToggled: (name, input) => {
				const state = {...this.state}
				state[name].input = input
				state[name].value = Number(state[name].value).toFixed(2)
				this.calc.run(state)
				this.setState(state)
			},
			update: false
		}
		this.state = state
		this.calc = makeCalculator()
			.add('P', ['twout', 'twin', 'cw', 'Mw'], i => (i.twout - i.twin) * i.cw * i.Mw,
				(me, i) => <mrow>{me}<mo>=</mo><mo>(</mo>{i.twout}<mo>-</mo>{i.twin}<mo>)</mo><mo>*</mo>{i.cw}<mo>*</mo>{i.Mw}</mrow>)
			.add('P', ['toout', 'toin', 'co', 'Mo'], i => (i.toin - i.toout) * i.co * i.Mo,
				(me, i) => <mrow>{me}<mo>=</mo><mo>(</mo>{i.toout}<mo>-</mo>{i.toin}<mo>)</mo><mo>*</mo>{i.co}<mo>*</mo>{i.Mo}</mrow>)
			.add('Mw', ['twout', 'twin', 'cw', 'P'], i => i.P / (i.twout - i.twin) / i.cw,
				(me, i) => <mrow>{me}<mo>=</mo><mfrac>{i.P}<mrow><mo>(</mo>{i.twout}<mo>-</mo>{i.twin}<mo>)</mo><mo>*</mo>{i.cw}</mrow></mfrac></mrow>)
			.add('Mo', ['toout', 'toin', 'co', 'P'], i => i.P / (i.toin - i.toout) / i.co,
				(me, i) => <mrow>{me}<mo>=</mo><mfrac>{i.P}<mrow><mo>(</mo>{i.toout}<mo>-</mo>{i.toin}<mo>)</mo><mo>*</mo>{i.co}</mrow></mfrac></mrow>)
			.add('cw', ['twout', 'twin', 'Mw', 'P'], i => i.P / (i.twout - i.twin) / i.Mw,
				(me, i) => <mrow>{me}<mo>=</mo><mfrac>{i.P}<mrow><mo>(</mo>{i.twout}<mo>-</mo>{i.twin}<mo>)</mo><mo>*</mo>{i.Mw}</mrow></mfrac></mrow>)
			.add('co', ['toout', 'toin', 'Mo', 'P'], i => i.P / (i.toin - i.toout) / i.Mo,
				(me, i) => <mrow>{me}<mo>=</mo><mfrac>{i.P}<mrow><mo>(</mo>{i.toout}<mo>-</mo>{i.toin}<mo>)</mo><mo>*</mo>{i.Mo}</mrow></mfrac></mrow>)
			.add('twout', ['twin', 'cw', 'Mw', 'P'], i => i.twin + (i.P / i.cw / i.Mw),
				(me, i) => <mrow>{me}<mo>=</mo>{i.twin}<mo>+</mo><mfrac>{i.P}<mrow>{i.cw}<mo>*</mo>{i.Mw}</mrow></mfrac></mrow>)
			.add('twin', ['twout', 'cw', 'Mw', 'P'], i => i.twout - (i.P / i.cw / i.Mw),
				(me, i) => <mrow>{me}<mo>=</mo>{i.twout}<mo>-</mo><mfrac>{i.P}<mrow>{i.cw}<mo>*</mo>{i.Mw}</mrow></mfrac></mrow>)
			.add('toin', ['toout', 'co', 'Mo', 'P'], i => i.toout + (i.P / i.co / i.Mo),
				(me, i) => <mrow>{me}<mo>=</mo>{i.toout}<mo>+</mo><mfrac>{i.P}<mrow>{i.co}<mo>*</mo>{i.Mo}</mrow></mfrac></mrow>)
			.add('toout', ['toin', 'co', 'Mo', 'P'], i => i.toin - (i.P / i.co / i.Mo),
				(me, i) => <mrow>{me}<mo>=</mo>{i.toin}<mo>-</mo><mfrac>{i.P}<mrow>{i.co}<mo>*</mo>{i.Mo}</mrow></mfrac></mrow>)
			.add('tlog', ['twin', 'twout', 'toin', 'toout'], i => {
				if (Math.abs(i.toin - i.twout - i.toout + i.twin) < 0.1) {
					return i.toin - i.twout
				}
				return (i.toin - i.twout - i.toout + i.twin) / Math.log((i.toin - i.twout) / (i.toout - i.twin))
			}, (me, i) => <mrow>{me}<mo>=</mo><mfrac><mrow>{i.toin}<mo>-</mo>{i.twout}<mo>-</mo>{i.toout}<mo>+</mo>{i.twin}</mrow><mrow><mo>ln</mo><mo>(</mo><mfrac><mrow>{i.toin}<mo>-</mo>{i.twout}</mrow><mrow>{i.toout}<mo>-</mo>{i.twin}</mrow></mfrac><mo>)</mo></mrow></mfrac></mrow>)
			.add('P', ['A', 'k', 'tlog'], i => i.A * i.k * i.tlog, (me, i) => <mrow>{me}<mo>=</mo>{i.A}<mo>*</mo>{i.k}<mo>*</mo>{i.tlog}</mrow>)
			.add('A', ['P', 'k', 'tlog'], i => i.P / i.k / i.tlog, (me, i) => <mrow>{me}<mo>=</mo><mfrac>{i.P}<mrow>{i.k}<mo>*</mo>{i.tlog}</mrow></mfrac></mrow>)
			.add('k', ['P', 'A', 'tlog'], i => i.P / i.A / i.tlog, (me, i) => <mrow>{me}<mo>=</mo><mfrac>{i.P}<mrow>{i.A}<mo>*</mo>{i.tlog}</mrow></mfrac></mrow>)
			.add('alpha', ['A', 'k', 'co', 'cw', 'Mo', 'Mw'], i => Math.exp(i.A * i.k * ((1 / i.co / i.Mo) - (1 / i.cw / i.Mw))),
				(me, i) => <mrow>{me}<mo>=</mo><mo>exp</mo><mo>(</mo>{i.A}<mo>*</mo>{i.k}<mo>*</mo><mo>(</mo><mfrac><mn>1</mn><mrow>{i.co}<mo>*</mo>{i.Mo}</mrow></mfrac><mo>-</mo><mfrac><mn>1</mn><mrow>{i.cw}<mo>*</mo>{i.Mw}</mrow></mfrac><mo>)</mo><mo>)</mo></mrow>)
			.add('P', ['alpha', 'toin', 'twin', 'co', 'cw', 'Mo', 'Mw'], i => (i.alpha - 1) * (i.toin - i.twin) / ((i.alpha / i.co / i.Mo) - (1 / i.cw / i.Mw)),
				(me, i) => <mrow>{me}<mo>=</mo><mfrac><mrow><mo>(</mo>{i.alpha}<mo>-</mo><mn>1</mn><mo>)</mo><mo>(</mo>{i.toin}<mo>-</mo>{i.twin}<mo>)</mo></mrow><mrow><mo>(</mo><mfrac>{i.alpha}<mrow>{i.co}<mo>*</mo>{i.Mo}</mrow></mfrac><mo>-</mo><mfrac><mn>1</mn><mrow>{i.cw}<mo>*</mo>{i.Mw}</mrow></mfrac><mo>)</mo></mrow></mfrac></mrow>)
			.add('Mw', ['pw', 'Qw'], i => i.pw * i.Qw / 60, (me, i) => <mrow>{me}<mo>=</mo>{i.pw}<mo>*</mo>{i.Qw}</mrow>)
			.add('Mo', ['po', 'Qo'], i => i.po * i.Qo / 60, (me, i) => <mrow>{me}<mo>=</mo>{i.po}<mo>*</mo>{i.Qo}</mrow>)
			.add('pw', ['Mw', 'Qw'], i => i.Mw / i.Qw * 60, (me, i) => <mrow>{me}<mo>=</mo><mfrac>{i.Mw}{i.Qw}</mfrac></mrow>)
			.add('po', ['Mo', 'Qo'], i => i.Mo / i.Qo * 60, (me, i) => <mrow>{me}<mo>=</mo><mfrac>{i.Mo}{i.Qo}</mfrac></mrow>)
			.add('Qw', ['Mw', 'pw'], i => i.Mw / i.pw * 60, (me, i) => <mrow>{me}<mo>=</mo><mfrac>{i.Mw}{i.pw}</mfrac></mrow>)
			.add('Qo', ['Mo', 'po'], i => i.Mo / i.po * 60, (me, i) => <mrow>{me}<mo>=</mo><mfrac>{i.Mo}{i.po}</mfrac></mrow>)
			.add('tlog', ['A', 'k', 'P'], i => i.P / i.A / i.k, (me, i) => <mrow>{me}<mo>=</mo><mfrac>{i.P}<mrow>{i.A}<mo>*</mo>{i.k}</mrow></mfrac></mrow>)
			.add('twout', ['tlog', 'twin', 'toin', 'toout'], i => {
				const func = twout => {
					if (Math.abs(i.toin - twout - i.toout + i.twin) < 0.1) {
						return i.toin - twout
					}
					return (i.toin - twout - i.toout + i.twin) / Math.log((i.toin - twout) / (i.toout - i.twin))
				}
				let tmin = i.twin
				let tmax = i.toin
				let iterations = 0
				while (iterations < 200) {
					let t = (tmin + tmax) / 2
					if (func(t) < i.tlog) {
						tmax = t
					} else {
						tmin = t
					}
					iterations++
				}
				return (tmin + tmax) / 2
			}, (me, i) => <mrow><mn>Numärische Näherung</mn></mrow>)
			.add('toout', ['tlog', 'twin', 'toin', 'twout'], i => {
				const func = toout => {
					if (Math.abs(i.toin - i.twout - toout + i.twin) < 0.1) {
						return i.toin - i.twout
					}
					return (i.toin - i.twout - toout + i.twin) / Math.log((i.toin - i.twout) / (toout - i.twin))
				}
				let tmin = i.twin
				let tmax = i.toin
				let iterations = 0
				while (iterations < 200) {
					let t = (tmin + tmax) / 2
					if (func(t) < i.tlog) {
						tmin = t
					} else {
						tmax = t
					}
					iterations++
				}
				return (tmin + tmax) / 2
			}, (me, i) => <mrow><mn>Numärische Näherung</mn></mrow>)
	}
	render () {
		const opt = [
			{name: 'Leistung', childs: ['P'], style: {gridColumn: '2 / span 1'}},
			{name: 'Öl', childs: ['toin', 'toout', 'Mo', 'Qo'], style: {gridColumn: '1 / span 1', gridRowEnd: 'span 2'}},
			{name: 'Wasser', childs: ['twin', 'twout', 'Mw', 'Qw'], style: {gridColumn: '3 / span 1', gridRowEnd: 'span 2'}},
			{name: 'Kühler', childs: ['A', 'k'], style: {gridColumn: '2 / span 1'}},
			{name: 'Öl Konstanten', childs: ['co', 'po'], style: {gridColumn: '1 / span 1'}},
			{name: 'Wasser Konstanten', childs: ['cw', 'pw'], style: {gridColumn: '3 / span 1'}},
			{name: 'Automatische Größen', childs: ['tlog', 'alpha'], style: {gridColumn: '2 / span 1'}, inactive: true}
		]
		return (
			<div className="App">
				{this.state.all.update ? <div className="notice">Neue Version verfügbar. Seite bitte neu laden.</div> : ''}
				{opt.map(o => <MeasureGroup key={o.name} state={this.state} opt={o}/>)}
				<GithubCorner href="https://github.com/PiIsFour/heat" bannerColor="#64CEAA" octoColor="#fff" size={80} direction="right" />
			</div>
		)
	}
}

export default App
