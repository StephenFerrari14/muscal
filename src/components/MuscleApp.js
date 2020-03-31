import React, { Component } from "react";
import PropTypes from "prop-types";
import MuscleHeatmap from "../components/MuscleHeatmap";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import FixedPaginationTable from "../components/tables/FixedPaginationTable";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class MuscleApp extends Component {
  static propTypes = {
    handleAddSession: PropTypes.func,
    muscleData: PropTypes.arrayOf(PropTypes.object),
    muscleGroups: PropTypes.array,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    handleAddSession: () => {},
    muscleGroups: [],
    muscleData: [],
    loading: true,
  };

  state = {
    muscleData: [],
    newMuscle: 0,
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };
  handleClick = () => {
    this.props.handleAddSession(this.state.newMuscle);
  };
  render() {
    const columns = [
      {
        id: "muscleGroupId",
        label: "Muscle",
        format: (value) => this.props.muscleGroups[value] || "Unknown",
      },
      { id: "date", label: "Date" },
    ];
    return (
      <div>
        <div style={{ paddingTop: "10px" }}>
          <span>Exercise:</span>
          <Select
            labelId="newMuscle"
            id="newMuscle"
            name="newMuscle"
            value={this.props.muscleGroups[this.state.newMuscle]}
            onChange={this.handleChange}
            style={{ width: "150px", marginLeft: "7px" }}
          >
            {this.props.muscleGroups.map((muscleGroup, index) => {
              return (
                <MenuItem key={`exercise_menu_${index}`} value={index}>
                  {muscleGroup}
                </MenuItem>
              );
            })}
          </Select>
          <Button
            variant="contained"
            style={{ marginLeft: "7px" }}
            onClick={this.handleClick}
          >
            Add
          </Button>
          <div>
            {this.props.loading ? (
              <CircularProgress />
            ) : (
              <div>
                <MuscleHeatmap
                  data={this.props.muscleData}
                  muscleGroups={this.props.muscleGroups}
                ></MuscleHeatmap>
                <div style={{ marginTop: "7px" }}>
                  <FixedPaginationTable
                    rows={this.props.muscleData}
                    columns={columns}
                  ></FixedPaginationTable>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
