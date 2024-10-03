import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const navigate =useNavigate();
  return (
    <div>
    <div className="relative  float-right ">
      <button className="w-32 text-3xl hover:bg-color-primary mr-4 p-4 pr-5 pl-5 rounded-full" 
      onClick={()=>navigate('/login')}>
        Login
      </button>
      {/* <button className="w-32 text-3xl hover:bg-color-primary p-4 pr-5 pl-5 rounded-full">
        Signup
      </button> */}
    </div>
    </div>
  );
}

export default LoginSignup;
