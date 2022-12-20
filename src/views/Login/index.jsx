import { facebookSignIn } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
// calling action (redux store)
import { useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();

  const signInWithFacebook = async () => {
    try {
      await facebookSignIn();
      alert("SignUp Successfull");
      navigate("/home");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <h1>Welcome to Q app</h1>
      <button className="SignIn_Btn" onClick={signInWithFacebook}>
        Sign In With Facebook
      </button>
    </div>
  );
}
