import React from 'react';
import Container from '@material-ui/core/Container';
import MuscleApp from './components/MuscleApp';
import './App.css';
import firebase from './components/Firebase/firebase'
import { format, startOfWeek } from 'date-fns'
import SignIn from './components/auth/SignIn';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import SignUp from './components/auth/SignUp';

class App extends React.Component {
  state = {
    calendarRef: null,
    muscleGroupsRef: null,
    muscleData: [],
    muscleGroups: [],
    hasSignedIn: false
  }

  onAddSession = (newMuscle) => {
    const newWorkoutSession = this.state.calendarRef.push()
    newWorkoutSession.set({
      muscleGroupId: newMuscle,
      date: format(new Date(), 'yyyy-MM-dd')
    })
  }

  signOut = () => {
    this.setState({ hasSignedIn: false })
  }

  // Move to service file
  createNewUser = (username, password) => {
    return firebase.auth().createUserWithEmailAndPassword(username, password)
  }

  sendResetPassword = (emailAddress) => auth.sendPasswordResetEmail(emailAddress)

  // Guess I have to move it down so React Router works. If its below then I can use props.history
  authenticateUser = (username, password) => {
    return firebase.auth().signInWithEmailAndPassword(username, password).then((session) => {
      this.setState({ hasSignedIn: true });
      var calendarRef = firebase.database().ref(`/calendar-data/${session.user.uid}/${format(startOfWeek(new Date()), 'yyyy-MM-dd')}`);
      const muscleGroupsRef = firebase.database().ref('/muscle-groups');
      this.setState({ muscleGroupsRef }, () => {
        this.state.muscleGroupsRef.on('value', (snapshot) => {
          const muscleGroups = snapshot.val();
          this.setState({ muscleGroups })
        });
      });

      this.setState({ calendarRef }, () => {
        this.state.calendarRef.on('value', (snapshot) => {
          // This means that we can just push and update the app state from here instead of updated state and push also
          const muscleData = snapshot.val() || {};
          const formatMuscleData = Object.keys(muscleData).map((key) => {
            return muscleData[key]
          });
          this.setState({ muscleData: formatMuscleData })
        });
      });
    }).catch(err => console.log(err)) // Post a message
  }

  render() {
    const PrivateRoute = ({ children, ...rest }) => {
      return (
        <Route
          {...rest}
          render={({ location }) =>
            this.state.hasSignedIn ? (
              children
            ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: location }
                  }}
                />
              )
          }
        />
      );
    }
    return (
      <div className="App">
        <Router forceRefresh={false}>
          <Switch>
            <PrivateRoute path="/calendar">
              <Container maxWidth="sm">
                <MuscleApp
                  handleAddSession={this.onAddSession}
                  muscleData={this.state.muscleData}
                  muscleGroups={this.state.muscleGroups}
                  handleSignOut={this.signOut}
                />
              </Container>
            </PrivateRoute>
            <Route path="/login">
              <SignIn
                authenticateUser={this.authenticateUser}
              ></SignIn>
            </Route>
            <Route path="/signup">
              <SignUp
                createNewUser={this.createNewUser}
              ></SignUp>
            </Route>
          </Switch>
        </Router>
        {/* {this.state.hasSignedIn ? (
        <Container maxWidth="sm">
          <MuscleApp 
            handleAddSession={this.onAddSession}
            muscleData={this.state.muscleData}
            muscleGroups={this.state.muscleGroups}
          />
        </Container>
        ) : (
          <SignIn
            authenticateUser={this.authenticateUser}
          ></SignIn>
        )} */}
      </div>
    );
  }
}

export default App;
