import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Define the Firebase configuration type
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Your web app's Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: 'AIzaSyCnmW5Lm8bh6dawvxRH3OZNJycl1wbbuus',
  authDomain: 'graphiql-app-dace5.firebaseapp.com',
  projectId: 'graphiql-app-dace5',
  storageBucket: 'graphiql-app-dace5.appspot.com',
  messagingSenderId: '421070176755',
  appId: '1:421070176755:web:086ba765a942d571ac1286',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
