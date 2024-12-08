import styles from "./Login.module.css";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { useNavigate } from "react-router-dom";
import { supabase } from "../Supabase/Supabase";

function Login() {
  //   const [username, setUsername] = useState("");
  // const navigate = useNavigate();
  
    console.log(supabase.auth)
    supabase.auth.onAuthStateChange(async (event) => {
      console.log(event);
      if (event === "SIGNED_IN") {
        // navigate("/success", { replace: false });
      } 
    });
    
  return (
    <div className={styles.box} >
      <h2>Login</h2>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        // theme="dark"
        providers={["google"]}
      />
    </div>
  );
}

export default Login;
