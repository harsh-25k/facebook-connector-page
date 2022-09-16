import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import SignUpLogo from "../../../../assets/img/signup-image.png";
import "../styles/RegisterStyles.css";
import { BsArrowRightShort } from "react-icons/bs";
import Header from "../../../../shared/widgets/jsx/Header";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { API_CLIENT } from "../../../../shared/services/api-client";

const Register= ({theme, setTheme}) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(true);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [checkboxCheck, setCheckboxCheck] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleForm = (e) => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    setIsSubmit(true);
  }

  useEffect(() => {

    const fetchData = async () => {
      if( Object.keys(formErrors).length === 0 && isSubmit ){
        const result = await API_CLIENT.post(`${process.env.REACT_APP_BACKEND_PORT}signup`, user);
        if(result.data.message === "true"){
          navigate("/login");
        }else {
          setFormErrors({final: result.data.message});
        }
      } 
    }
    fetchData()

  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!values.name){
      errors.name = "Name required";
    }else if(values.name.length < 2){
      errors.name = "Minimum 2 characters required";
    }else if(values.name.length > 18){
      errors.name = "Maximum 18 characters required";
    }

    if(!values.email){
      errors.email = "Email required";
    }else if(!regex.test(values.email)){
      errors.email = "Incorrect Email Format";
    }

    if(!values.password){
      errors.password = "Password required";
    }else if(values.password.length < 6){
      errors.password = "Min 6 characters required";
    }else if(values.password.length > 12){
      errors.password = "Max 12 characters allowed";
    }

    if(!values.confirmpassword){
      errors.confirmpassword = "Confirm Password required";
    }else if(values.confirmpassword !== values.password){
      errors.confirmpassword = "Confirm password didn't match password";
    }

    if(!values.mobile){
      errors.mobile = "Mobile number required"
    }else if(values.mobile.length !== 10){
      errors.mobile = "Mobile number is Invalid";
    }

    if(!checkboxCheck){
      errors.checkbox = "Accept Terms & Conditions to Continue";
    }

    return errors;
  }

  return (
    <div>
      <Header flag="show" />

      <div className="main_signup">
        <div className="left-part_signup">
          <div className="top_signup">
            <h2>It's quick and easy</h2>
            <p>Sign Up to become a part of our community</p>
          </div>

          <div className="signup-banner_signup">
            <img src={SignUpLogo} alt="Sign Up" />
          </div>
        </div>

        <div className="right-part_signup">
          <div className="form-container_signup">
            <div className="top_signup">
              <h2>Create Account</h2>
              <Link to="/login">Sign In</Link>
            </div>

            <div className="line_signup"></div>

            <div className="main-msg_signup">
              <p>{formErrors.final}</p>
            </div>

            <div className="mid-part_signup">
              <form onSubmit={submitForm}>
                <div className="form-main-box_signup">
                <div className="form-box_signup box1_signup">
                  <label>Name</label>
                  <input type="text" name="name" placeholder="Your Name" value={user.name} onChange={handleForm} />
                  <p className="errors-msg_signup">{formErrors.name}</p>
                </div>

                <div className="form-box_signup box2_signup">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="Your Email Address" value={user.email} onChange={handleForm} />
                  <p className="errors-msg_signup">{formErrors.email}</p>
                </div>

                <div className="form-box_signup box3_signup">
                  <label>Password</label>
                  <input type={showPassword ? "password" : "text"} name="password" placeholder="Enter Password" value={user.password} onChange={handleForm} />
                  {
                  showPassword ? (<AiOutlineEye title="Show password" className="hide_password_signup" onClick={()=>setShowPassword(!showPassword)} />) 
                  : 
                  (<AiOutlineEyeInvisible title="Hide password" className="hide_password_signup" onClick={()=>setShowPassword(!showPassword)} />)
                  }
                  <p className="errors-msg_signup">{formErrors.password}</p>
                </div>

                <div className="form-box_signup box4_signup">
                  <label>Confirm Password</label>
                  <input type="password" name="confirmpassword" placeholder="Confirm Password" value={user.confirmpassword} onChange={handleForm} />
                  <p className="errors-msg_signup">{formErrors.confirmpassword}</p>
                </div>

                <div className="form-box_signup box5_signup">
                  <label style={{paddingBottom: "5px"}}>Mobile Number</label>
                  <input type="text" name="mobile" placeholder="Your Mobile Number" value={user.mobile} onChange={handleForm} />
                  <p className="errors-msg_signup">{formErrors.mobile}</p>
                </div>

                <div className="box6_signup">
                  <div>
                  <input type="checkbox" id="cb1" onClick={() => setCheckboxCheck(!checkboxCheck)} />
                  <label for="cb1"></label>
                  <p><span>I agree to</span> <a href="youtube.com">Terms and Conditions</a></p>
                  </div>
                  <p className="errors-msg_signup">{formErrors.checkbox}</p>
                </div>
                </div>

                <button type="submit" onClick={submitForm} className="create-btn_signup">
                  Create New Account
                  <BsArrowRightShort size={27} className="create-btn-logo_signup" />
                </button> 
              </form>

              <div className="line_signup"></div>

              <div className="bottom-part_signup">
                <p>Have an account ? </p>
                <Link to="/login">&nbsp;Login Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register
