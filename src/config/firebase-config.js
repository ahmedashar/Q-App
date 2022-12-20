import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB_MYspaDUKDr4PngRSta5YiYClHJeoc5E",
  authDomain: "qapp-aa3a5.firebaseapp.com",
  projectId: "qapp-aa3a5",
  storageBucket: "qapp-aa3a5.appspot.com",
  messagingSenderId: "507965006894",
  appId: "1:507965006894:web:c259c559a827055f036bbf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const database = getFirestore(app);
const storage = getStorage(app);

// function call from Login Component
const facebookSignIn = async () => {
  const provider = new FacebookAuthProvider();
  const result = await signInWithPopup(authentication, provider);

  //adding user data in firestore at the time of fbLogin
  await addUserToDB(result.user);
};

const addUserToDB = async (userInfo) => {
  const { uid, displayName, email } = userInfo;
  try {
    await setDoc(doc(database, "users", uid), {
      uid,
      displayName,
      email,
    });

    console.log("userInfo store in Firestore by: " + displayName);
  } catch (e) {
    console.log("error in DataStore: " + e.message);
  }
};
// upload img
async function uploadImage(adImg) {
  const storageRef = ref(storage, `images/${adImg.name}`);
  const snapshot = await uploadBytes(storageRef, adImg);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

// for add new company to db
function addCompanyToDb(cName, since, openTime, closeTime, imgUrl) {
  const userId = authentication.currentUser.uid;
  return addDoc(collection(database, "companies"), {
    cName,
    since,
    openTime,
    closeTime,
    imgUrl,
    userId,
  });
}

// get company data from db
async function getCompaniesFromDb() {
  const querySnapshot = await getDocs(collection(database, "ads"));
  const ads = [];

  querySnapshot.forEach((doc) => {
    ads.push({ id: doc.id, ...doc.data() });
  });
  return ads;
}

// .then((re) => {
//   console.log(re);
//   console.log("After Login: " + re.user.uid);
//   addUserToDB(re.user);
// })
// .catch((err) => {
//   console.log(err.message);
// });

// check user login or not
// const checkUserLoginFirebase = () => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//     } else {
//       // User is signed out
//       // ...
//     }
//   });
// };

export { facebookSignIn, authentication, uploadImage, addCompanyToDb };
