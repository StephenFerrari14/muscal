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
import ForgetPassword from './components/auth/ForgotPassword';

const EXCLUDED_PATHS = ['/login', '/signup', '/forgot']

console.log(window.location.pathname)

class App extends React.Component {
  state = {
    calendarRef: null,
    muscleGroupsRef: null,
    muscleData: [],
    muscleGroups: [],
    hasSignedIn: false,
    loading: true,
    lastPath: '/login'
  } 

  componentDidMount() {
    console.log(window.location.pathname)
    this.setState({lastPath: window.location.pathname}, () => {
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
          this.setState({ hasSignedIn: true }, () => {
            console.log(this.state.lastPath, window.location.pathname)
            if (this.state.lastPath != window.location.pathname) {
              window.location.pathname = this.state.lastPath;
            }
          });
          this.fetchMusclePicklist();
          this.fetchWeekCalendar(user.uid);
        } else if (!EXCLUDED_PATHS.includes(window.location.pathname)) {
          window.location.pathname = '/login'
        }
      })
    });
  }

  onAddSession = (newMuscle) => {
    const newWorkoutSession = this.state.calendarRef.push()
    newWorkoutSession.set({
      muscleGroupId: newMuscle,
      date: format(new Date(), 'yyyy-MM-dd')
    })
  }

  changeAuthPersistence = (persist) => {
    if (persist) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    } else {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
    }
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.setState({ hasSignedIn: false });
    }
    ).catch(err => {
      // post a message about an error
    });
  }

  handlePasswordReset = (emailAddress) => {
    return firebase.auth().sendPasswordResetEmail(emailAddress);
  }

  // Move to service file
  createNewUser = (username, password) => {
    return firebase.auth().createUserWithEmailAndPassword(username, password)
  }

  sendResetPassword = (emailAddress) => firebase.auth().sendPasswordResetEmail(emailAddress)

  fetchMusclePicklist = () => {
    const muscleGroupsRef = firebase.database().ref('/muscle-groups');
    this.setState({ muscleGroupsRef }, () => {
      this.state.muscleGroupsRef.on('value', (snapshot) => {
        const muscleGroups = snapshot.val();
        this.setState({ muscleGroups })
      });
    });
  }

  fetchWeekCalendar = (uid) => {
    var calendarRef = firebase.database().ref(`/calendar-data/${uid}/${format(startOfWeek(new Date()), 'yyyy-MM-dd')}`);
    this.setState({ calendarRef }, () => {
      this.state.calendarRef.on('value', (snapshot) => {
        // This means that we can just push and update the app state from here instead of updated state and push also
        const muscleData = snapshot.val() || {};
        const formatMuscleData = Object.keys(muscleData).map((key) => {
          return muscleData[key]
        });
        this.setState({ muscleData: formatMuscleData, loading: false })
      });
    });
  }

  // Guess I have to move it down so React Router works. If its below then I can use props.history
  authenticateUser = (username, password) => {
    return firebase.auth().signInWithEmailAndPassword(username, password).then((session) => {
      this.setState({ hasSignedIn: true });
      this.fetchMusclePicklist();
      this.fetchWeekCalendar(session.user.uid);
    }).catch(err => console.log(err)) // Post a message
  }

  render() {
    const PrivateRoute = ({ children, ...rest }) => {
      console.log(this.state.hasSignedIn)
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
              <Container maxWidth="lg">
                <MuscleApp
                  handleAddSession={this.onAddSession}
                  muscleData={this.state.muscleData}
                  muscleGroups={this.state.muscleGroups}
                  handleSignOut={this.signOut}
                  loading={this.state.loading}
                />
              </Container>
            </PrivateRoute>
            <Route path="/login">
              <SignIn
                authenticateUser={this.authenticateUser}
                handlePersistChange={this.changeAuthPersistence}
              ></SignIn>
            </Route>
            <Route path="/signup">
              <SignUp
                createNewUser={this.createNewUser}
              ></SignUp>
            </Route>
            <Route path="/forgot">
              <ForgetPassword
                handlePasswordReset={this.handlePasswordReset}
              ></ForgetPassword>
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
