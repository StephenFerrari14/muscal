import React, { Component, Fragment } from "react";

// Try changing to just one color
const heatIntensity = {
  1: 'blue',
  2: 'green',
  3: 'darkgreen',
  4: 'orange',
  5: 'orangered',
  6: 'red',
  7: 'darkred'
}

// Take each input 
export default class MuscleHeatmap extends Component {
  render() {
    const heatmap = this.props.data.reduce((acc, data) => {
      if (acc[data.muscleGroupId]) {
        acc[data.muscleGroupId]++
      } else {
        acc[data.muscleGroupId] = 1
      }
      return acc;
    }, {});
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: '18px'
      }}>
        {Object.keys(heatmap).map((key) => {
          const intensityStyle = {
            width: '50px',
            height: '50px',
            background: heatIntensity[heatmap[key]] || 1,
            padding: '5px',
            color: 'white'
          }
          return (
            <div key={key} style={intensityStyle}>
              {this.props.muscleGroups[key] || 'Unknown'}
            </div>
          )
        })}
      </div>
    );
  }
}