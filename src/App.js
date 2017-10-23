import React, { Component } from 'react';
import './App.css';

import MeasureGroup from './MeasureGroup';
import composeState from './state';
import makeCalculator from './calculator';

class App extends Component {
  constructor(props){
    super(props);
    const state = composeState()
    .compose("P", "kW", 55, <mrow><mi>P</mi></mrow>)
    .compose("twin", "°C", 20, <mrow><msub><mi>T</mi><mi>W in</mi></msub></mrow>)
    .compose("twout", "°C", 30, <mrow><msub><mi>T</mi><mi>W out</mi></msub></mrow>)
    .compose("cw", "kJ/kgK", 4.18, <mrow><msub><mi>c</mi><mi>W</mi></msub></mrow>)
    .compose("Mw", "kg/s", 1, <mrow><msub><mi>M</mi><mi>W</mi></msub></mrow>)
    .compose("toin", "°C", 60, <mrow><msub><mi>T</mi><mi>O in</mi></msub></mrow>)
    .compose("toout", "°C", 40, <mrow><msub><mi>T</mi><mi>O out</mi></msub></mrow>)
    .compose("co", "kJ/kgK", 2, <mrow><msub><mi>c</mi><mi>O</mi></msub></mrow>)
    .compose("Mo", "kg/s", 1, <mrow><msub><mi>M</mi><mi>O</mi></msub></mrow>)
    .compose("A", "m²", 1, <mrow><mi>A</mi></mrow>)
    .compose("k", "kW/m²K", 1, <mrow><mi>k</mi></mrow>)
    .compose("tlog", "K", 1, <mrow><msub><mi>T</mi><mi>log</mi></msub></mrow>)
    .compose("alpha", "", 1, <mrow><mi>alpha</mi></mrow>)
    .compose("pw", "kg/l", 1, <mrow><msub><mi>p</mi><mi>W</mi></msub></mrow>)
    .compose("po", "kg/l", 1, <mrow><msub><mi>p</mi><mi>O</mi></msub></mrow>)
    .compose("Qw", "l/min", 60, <mrow><msub><mi>Q</mi><mi>W</mi></msub></mrow>)
    .compose("Qo", "l/min", 60, <mrow><msub><mi>Q</mi><mi>O</mi></msub></mrow>)
    state.all = {
      valueChanged: (name, value) => {
        const state = {...this.state};
        state[name].value = value;
        this.calc.run(state);
        this.setState(state);
      },
      inputToggled: (name, input) => {
        const state = {...this.state};
        state[name].input = input;
        this.calc.run(state);
        this.setState(state);
      },
    };
    this.state = state;
		this.calc = makeCalculator()
    .add("P", ["twout", "twin", "cw", "Mw"], i => (i.twout-i.twin)*i.cw*i.Mw, <mrow><mi>P</mi><mo>=</mo><mo>(</mo><msub><mi>T</mi><mi>W out</mi></msub><mo>-</mo><msub><mi>T</mi><mi>W in</mi></msub><mo>)</mo><mo>*</mo><msub><mi>c</mi><mi>W</mi></msub><mo>*</mo><msub><mi>M</mi><mi>O</mi></msub></mrow>)
    .add("P", ["toout", "toin", "co", "Mo"], i => (i.toin-i.toout)*i.co*i.Mo, <mrow><mi>P</mi><mo>=</mo><mo>(</mo><msub><mi>T</mi><mi>O out</mi></msub><mo>-</mo><msub><mi>T</mi><mi>O in</mi></msub><mo>)</mo><mo>*</mo><msub><mi>c</mi><mi>O</mi></msub><mo>*</mo><msub><mi>M</mi><mi>O</mi></msub></mrow>)
    .add("Mw", ["twout", "twin", "cw", "P"], i => i.P/(i.twout-i.twin)/i.cw, <mrow><msub><mi>M</mi><mi>W</mi></msub><mo>=</mo><mfrac><mi>P</mi><mrow><mo>(</mo><msub><mi>T</mi><mi>W out</mi></msub><mo>-</mo><msub><mi>T</mi><mi>W in</mi></msub><mo>)</mo><mo>*</mo><msub><mi>c</mi><mi>W</mi></msub></mrow></mfrac></mrow>)
    .add("Mo", ["toout", "toin", "co", "P"], i => i.P/(i.toin-i.toout)/i.co, <mrow><msub><mi>M</mi><mi>O</mi></msub><mo>=</mo><mfrac><mi>P</mi><mrow><mo>(</mo><msub><mi>T</mi><mi>O out</mi></msub><mo>-</mo><msub><mi>T</mi><mi>O in</mi></msub><mo>)</mo><mo>*</mo><msub><mi>c</mi><mi>O</mi></msub></mrow></mfrac></mrow>)
    .add("cw", ["twout", "twin", "Mw", "P"], i => i.P/(i.twout-i.twin)/i.Mw, <mrow><msub><mi>c</mi><mi>W</mi></msub><mo>=</mo><mfrac><mi>P</mi><mrow><mo>(</mo><msub><mi>T</mi><mi>W out</mi></msub><mo>-</mo><msub><mi>T</mi><mi>W in</mi></msub><mo>)</mo><mo>*</mo><msub><mi>M</mi><mi>W</mi></msub></mrow></mfrac></mrow>)
    .add("co", ["toout", "toin", "Mo", "P"], i => i.P/(i.toin-i.toout)/i.Mo, <mrow><msub><mi>c</mi><mi>O</mi></msub><mo>=</mo><mfrac><mi>P</mi><mrow><mo>(</mo><msub><mi>T</mi><mi>O out</mi></msub><mo>-</mo><msub><mi>T</mi><mi>O in</mi></msub><mo>)</mo><mo>*</mo><msub><mi>M</mi><mi>O</mi></msub></mrow></mfrac></mrow>)
    .add("twout", ["twin", "cw", "Mw", "P"], i => i.twin+(i.P/i.cw/i.Mw), <mrow><msub><mi>T</mi><mi>W out</mi></msub><mo>=</mo><msub><mi>T</mi><mi>W in</mi></msub><mo>+</mo><mfrac><mi>P</mi><mrow><msub><mi>c</mi><mi>W</mi></msub><mo>*</mo><msub><mi>M</mi><mi>W</mi></msub></mrow></mfrac></mrow>)
    .add("twin", ["twout", "cw", "Mw", "P"], i => i.twout-(i.P/i.cw/i.Mw), <mrow><msub><mi>T</mi><mi>W in</mi></msub><mo>=</mo><msub><mi>T</mi><mi>W out</mi></msub><mo>-</mo><mfrac><mi>P</mi><mrow><msub><mi>c</mi><mi>W</mi></msub><mo>*</mo><msub><mi>M</mi><mi>W</mi></msub></mrow></mfrac></mrow>)
    .add("toin", ["toout", "co", "Mo", "P"], i => i.toout+(i.P/i.co/i.Mo), <mrow><msub><mi>T</mi><mi>O in</mi></msub><mo>=</mo><msub><mi>T</mi><mi>O out</mi></msub><mo>+</mo><mfrac><mi>P</mi><mrow><msub><mi>c</mi><mi>O</mi></msub><mo>*</mo><msub><mi>M</mi><mi>O</mi></msub></mrow></mfrac></mrow>)
    .add("toout", ["toin", "co", "Mo", "P"], i => i.toin-(i.P/i.co/i.Mo), <mrow><msub><mi>T</mi><mi>O out</mi></msub><mo>=</mo><msub><mi>T</mi><mi>O in</mi></msub><mo>-</mo><mfrac><mi>P</mi><mrow><msub><mi>c</mi><mi>O</mi></msub><mo>*</mo><msub><mi>M</mi><mi>O</mi></msub></mrow></mfrac></mrow>)
    .add("tlog", ["twin", "twout", "toin", "toout"], i => {
      if(Math.abs(i.toin-i.twout-i.toout+i.twin) < 0.1){
        return i.toin-i.twout;
      }
      return (i.toin-i.twout-i.toout+i.twin)/Math.log((i.toin-i.twout)/(i.toout-i.twin))
    }, <mrow><msub><mi>T</mi><mi>log</mi></msub><mo>=</mo><mfrac><mrow><msub><mi>T</mi><mi>O in</mi></msub><mo>-</mo><msub><mi>T</mi><mi>W out</mi></msub><mo>-</mo><msub><mi>T</mi><mi>O out</mi></msub><mo>+</mo><msub><mi>T</mi><mi>W in</mi></msub></mrow><mrow><mo>log</mo><mo>(</mo><mfrac><mrow><msub><mi>T</mi><mi>O in</mi></msub><mo>-</mo><msub><mi>T</mi><mi>W out</mi></msub></mrow><mrow><msub><mi>T</mi><mi>O out</mi></msub><mo>-</mo><msub><mi>T</mi><mi>W in</mi></msub></mrow></mfrac><mo>)</mo></mrow></mfrac></mrow>)
    .add("P", ["A", "k", "tlog"], i => i.A*i.k*i.tlog, <mrow><mi>P</mi><mo>=</mo><mi>A</mi><mo>*</mo><mi>k</mi><mo>*</mo><msub><mi>T</mi><mi>log</mi></msub></mrow>)
    .add("A", ["P", "k", "tlog"], i => i.P/i.k/i.tlog, <mrow><mi>A</mi><mo>=</mo><mfrac><mi>P</mi><mrow><mi>k</mi><mo>*</mo><msub><mi>T</mi><mi>log</mi></msub></mrow></mfrac></mrow>)
    .add("k", ["P", "A", "tlog"], i => i.P/i.A/i.tlog, <mrow><mi>k</mi><mo>=</mo><mfrac><mi>P</mi><mrow><mi>A</mi><mo>*</mo><msub><mi>T</mi><mi>log</mi></msub></mrow></mfrac></mrow>)
    .add("alpha", ["A", "k", "co", "cw", "Mo", "Mw"], i => Math.exp(i.A*i.k*((1/i.co/i.Mo)-(1/i.cw/i.Mw))), <mrow><mi>alpha</mi><mo>=</mo><mo>exp</mo><mo>(</mo><mi>A</mi><mo>*</mo><mi>k</mi><mo>*</mo><mo>(</mo><mfrac><mn>1</mn><mrow><msub><mi>c</mi><mi>O</mi></msub><mo>*</mo><msub><mi>M</mi><mi>O</mi></msub></mrow></mfrac><mo>-</mo><mfrac><mn>1</mn><mrow><msub><mi>c</mi><mi>W</mi></msub><mo>*</mo><msub><mi>M</mi><mi>W</mi></msub></mrow></mfrac><mo>)</mo><mo>)</mo></mrow>)
    .add("P", ["alpha", "toin", "twin", "co", "cw", "Mo", "Mw"], i => (i.alpha-1)*(i.toin-i.twin)/((i.alpha/i.co/i.Mo)-(1/i.cw/i.Mw)), <mrow><mi>P</mi><mo>=</mo><mfrac><mrow><mo>(</mo><mi>alpha</mi><mo>-</mo><mn>1</mn><mo>)</mo><mo>(</mo><msub><mi>T</mi><mi>O in</mi></msub><mo>-</mo><msub><mi>T</mi><mi>W in</mi></msub><mo>)</mo></mrow><mrow><mo>(</mo><mfrac><mi>alpha</mi><mrow><msub><mi>c</mi><mi>O</mi></msub><mo>*</mo><msub><mi>M</mi><mi>O</mi></msub></mrow></mfrac><mo>-</mo><mfrac><mn>1</mn><mrow><msub><mi>c</mi><mi>W</mi></msub><mo>*</mo><msub><mi>M</mi><mi>W</mi></msub></mrow></mfrac><mo>)</mo></mrow></mfrac></mrow>)
    .add("Mw", ["pw", "Qw"], i => i.pw*i.Qw/60, <mrow><msub><mi>M</mi><mi>W</mi></msub><mo>=</mo><msub><mi>p</mi><mi>W</mi></msub><mo>*</mo><msub><mi>Q</mi><mi>W</mi></msub></mrow>)
    .add("Mo", ["po", "Qo"], i => i.po*i.Qo/60, <mrow><msub><mi>M</mi><mi>O</mi></msub><mo>=</mo><msub><mi>p</mi><mi>O</mi></msub><mo>*</mo><msub><mi>Q</mi><mi>O</mi></msub></mrow>)
    .add("pw", ["Mw", "Qw"], i => i.Mw/i.Qw*60, <mrow><msub><mi>p</mi><mi>W</mi></msub><mo>=</mo><mfrac><msub><mi>M</mi><mi>W</mi></msub><msub><mi>Q</mi><mi>W</mi></msub></mfrac></mrow>)
    .add("po", ["Mo", "Qo"], i => i.Mo/i.Qo*60, <mrow><msub><mi>p</mi><mi>O</mi></msub><mo>=</mo><mfrac><msub><mi>M</mi><mi>O</mi></msub><msub><mi>Q</mi><mi>O</mi></msub></mfrac></mrow>)
    .add("Qw", ["Mw", "pw"], i => i.Mw/i.pw*60, <mrow><msub><mi>Q</mi><mi>W</mi></msub><mo>=</mo><mfrac><msub><mi>M</mi><mi>W</mi></msub><msub><mi>p</mi><mi>W</mi></msub></mfrac></mrow>)
    .add("Qo", ["Mo", "po"], i => i.Mo/i.po*60, <mrow><msub><mi>Q</mi><mi>O</mi></msub><mo>=</mo><mfrac><msub><mi>M</mi><mi>O</mi></msub><msub><mi>p</mi><mi>O</mi></msub></mfrac></mrow>)
  }
  render() {
    const opt = [
      {name: "Leistung", childs: ["P"], style: {gridColumn: "2 / span 1"}},
      {name: "Öl", childs: ["toin", "toout", "Mo", "Qo"], style: {gridColumn: "1 / span 1", gridRowEnd: "span 2"}},
      {name: "Wasser", childs: ["twin", "twout", "Mw", "Qw"], style: {gridColumn: "3 / span 1", gridRowEnd: "span 2"}},
      {name: "Kühler", childs: ["A", "k"], style: {gridColumn: "2 / span 1"}},
      {name: "Öl Konstanten", childs: ["co", "po"], style: {gridColumn: "1 / span 1"}},
      {name: "Wasser Konstanten", childs: ["cw", "pw"], style: {gridColumn: "3 / span 1"}},
      {name: "Automatische Größen", childs: ["tlog", "alpha"], style: {gridColumn: "2 / span 1"}},
    ];
    return (
      <div className="App">
        {opt.map(o => <MeasureGroup key={o.name} state={this.state} opt={o}/>)}
      </div>
    );
  }
}

export default App;
