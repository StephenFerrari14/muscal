import React, { Component } from 'react';
import PropTypes from 'prop-types'
import HistoryTable from '../components/tables/HistoryTable'
import MuscleHeatmap from '../components/MuscleHeatmap'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const classes = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '10px',
  },
  title: {
    flexGrow: 1,
  },
};

/**
 * Install react-table
 * Component for Calendar
 */

export default class MuscleApp extends Component {

  static propTypes = {
    handleAddSession: PropTypes.func,
    muscleData: PropTypes.arrayOf(PropTypes.object),
    muscleGroups: PropTypes.array
  }

  static defaultProps = {
    handleAddSession: () => { },
    muscleGroups: []
  }

  state = {
    muscleData: [],
    newMuscle: 0
  }
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(event)

    this.setState({
      [name]: value
    });
  }
  handleClick = () => {
    this.props.handleAddSession(this.state.newMuscle)
  }
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Muscal
            </Typography>
            <Button color="inherit" onClick={this.props.handleSignOut}>Sign Out</Button>
            <Button color="inherit">Contact Us</Button>
          </Toolbar>
        </AppBar>
        <div>
          <span>
            Muscle:
        </span>
          <Select
            labelId="newMuscle"
            id="newMuscle"
            name="newMuscle"
            value={this.props.muscleGroups[this.state.newMuscle]}
            onChange={this.handleChange}
            style={{ width: '150px' }}
          >
            {this.props.muscleGroups.map((muscleGroup, index) => {
              return (
                <MenuItem value={index}>{muscleGroup}</MenuItem>
              )
            })}
          </Select>
          <Button variant="contained" onClick={this.handleClick}>Add</Button>
          <MuscleHeatmap
            data={this.props.muscleData}
            muscleGroups={this.props.muscleGroups}
          ></MuscleHeatmap>
          <HistoryTable
            rows={this.props.muscleData}
            muscleGroups={this.props.muscleGroups}
          ></HistoryTable>
        </div>
      </div>
    )
  }
}