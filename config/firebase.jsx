import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCYxRs1s_BdYyOSiWhqKofjkNPNryNRyiQ",
  authDomain: "palpiteiros-app.firebaseapp.com",
  projectId: "palpiteiros-app",
  storageBucket: "palpiteiros-app.appspot.com",
  messagingSenderId: "1078435891337",
  appId: "1:1078435891337:web:69014837f3eef5fe78de58",
  measurementId: "G-EXJ38211ZM"
};

const firebase = initializeApp(firebaseConfig);

export default firebase;