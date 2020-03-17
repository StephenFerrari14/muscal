import firebase from 'firebase';
// This file needs to be added manually
import config from '../../configs/firebase_config';

firebase.initializeApp(config);
export default firebase;