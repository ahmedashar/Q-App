import { facebookSignIn } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

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
    <button className="SignIn_Btn" onClick={signInWithFacebook}>
      Sign In With Facebook
    </button>
  );
}
