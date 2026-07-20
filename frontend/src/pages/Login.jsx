import { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { FaEnvelope,FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Auth.css";

export default function Login(){

const navigate=useNavigate();

const[email,setEmail]=useState("");
const[password,setPassword]=useState("");

const login=async()=>{

try{

const res=await axios.post(
"http://127.0.0.1:8000/auth/login",
{email,password}
);

localStorage.setItem(
"user",
JSON.stringify(res.data)
);

navigate("/dashboard");

}
catch(err){

alert(
err.response?.data?.detail ||
"Login Failed"
);

}

};

return(

<div className="auth-page">

<motion.div
className="auth-container"
initial={{opacity:0,y:50}}
animate={{opacity:1,y:0}}
transition={{duration:.7}}
>

<div className="left-panel">

<h1>🤖 Smart ATS</h1>

<p>
AI Powered Resume Analyzer &
Interview Preparation Platform.
</p>

<div className="feature">✅ ATS Score Analysis</div>
<div className="feature">✅ Resume Feedback</div>
<div className="feature">✅ Skill Gap Detection</div>
<div className="feature">✅ Interview Questions</div>

</div>

<div className="right-panel">

<h2>Welcome Back 👋</h2>

<div className="input-box">
<FaEnvelope/>
<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>
</div>

<div className="input-box">
<FaLock/>
<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>
</div>

<button
className="auth-btn"
onClick={login}
>

Login

</button>

<div className="switch-text">

Don't have an account?

<Link to="/register">

 Register

</Link>

</div>

</div>

</motion.div>

</div>

);

}