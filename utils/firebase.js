import { initializeApp } from 'firebase/app';
import config from '../config/firebase.js';

const firebase = initializeApp(config);

export default firebase;
