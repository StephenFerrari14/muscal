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
  Redirect
} from "react-router-dom";
import SignUp from './components/auth/SignUp';
import ForgetPassword from './components/auth/ForgotPassword';
import ContactUs from './components/ContactUs';
import Header from './components/Header';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const EXCLUDED_PATHS = ['/login', '/signup', '/forgot']

class App extends React.Component {
  state = {
    calendarRef: null,
    muscleGroupsRef: null,
    muscleData: [],
    muscleGroups: [],
    hasSignedIn: true,
    loading: true,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ hasSignedIn: true });
        this.fetchMusclePicklist();
        this.fetchWeekCalendar(user.uid);
      } else if (!EXCLUDED_PATHS.includes(window.location.pathname)) { // Check if I still need this
        this.setState({ hasSignedIn: false })
      }
    })
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
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    }
  }

  signOut = async () => {
    try {
      await firebase.auth().signOut();
      this.setState({ hasSignedIn: false, muscleData: [] });
    }
    catch (err) { }
  }

  handlePasswordReset = (emailAddress) => {
    return firebase.auth().sendPasswordResetEmail(emailAddress);
  }

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
        const muscleData = snapshot.val() || {};
        const formatMuscleData = Object.keys(muscleData).map((key) => {
          return muscleData[key]
        });
        this.setState({ muscleData: formatMuscleData, loading: false })
      });
    });
  }

  authenticateUser = (username, password) => {
    return firebase.auth().signInWithEmailAndPassword(username, password).then((session) => {
      this.setState({ hasSignedIn: true });
      this.fetchMusclePicklist();
      this.fetchWeekCalendar(session.user.uid);
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
        <Router forceRefresh={false} history={history}>
          <Header
            hasSignedIn={this.state.hasSignedIn}
            handleSignOut={this.signOut}
          />
          <Switch>
            <PrivateRoute path="/calendar">
              <Container maxWidth="lg">
                <MuscleApp
                  handleAddSession={this.onAddSession}
                  muscleData={this.state.muscleData}
                  muscleGroups={this.state.muscleGroups}
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
            <Route path="/contact">
              <ContactUs></ContactUs>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
