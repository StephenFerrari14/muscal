import React, { Component } from "react";

const HEAT_INTENSITIES = {
  1: "#f27d79",
  2: "#f23e38",
  3: "#f51818",
  4: "#e20909",
  5: "#db200b",
  6: "#c7120c",
  7: "#a8160c",
};

export default class MuscleHeatmap extends Component {
  render() {
    const heatmap = this.props.data.reduce((acc, data) => {
      if (acc[data.muscleGroupId]) {
        acc[data.muscleGroupId]++;
      } else {
        acc[data.muscleGroupId] = 1;
      }
      return acc;
    }, {});
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginTop: "18px",
        }}
      >
        {Object.keys(heatmap).map((key) => {
          const intensityStyle = {
            width: "50px",
            height: "50px",
            background: HEAT_INTENSITIES[heatmap[key]] || 1,
            padding: "5px",
            color: "white",
          };
          return (
            <div key={key} style={intensityStyle}>
              {this.props.muscleGroups[key] || "Unknown"}
            </div>
          );
        })}
      </div>
    );
  }
}
