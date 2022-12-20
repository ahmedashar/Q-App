// // 2. Home: Provide two buttons
// Are you a company? (Company)

import { signOut } from "firebase/auth";
import { authentication } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

// Are you finding/waiting for tokens? (Normal User)

export default function Home() {
  const navigate = useNavigate();
  const signOutUser = () => {
    signOut(authentication)
      .then(() => {
        alert("signOut successfull");
      })
      .catch((error) => {
        alert("Error in SignOut" + error);
      });
  };
  return (
    <div>
      <div>
        <h1>Are you a company?</h1>
        <button
          onClick={() => {
            navigate("/home/company");
          }}
        >
          Click here (company)
        </button>
      </div>
      <div>
        <h1>Are you finding/waiting for tokens?</h1>
        <button>Click here (Normal User)</button>
      </div>
      <div>
        <button onClick={signOutUser}>SignOut</button>
      </div>
    </div>
  );
}
