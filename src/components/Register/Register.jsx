import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('')
    // password show 
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value
        const accepted = e.target.terms.checked
        // console.log(name,email, password, accepted,'tmader sob jene geci')

        // reset error 
        setRegisterError('')
        setSuccess('')

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters');
            return
        }
        else if (!accepted) {
            setRegisterError('accept tums condition');
            return
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('your create successfully')

                // update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(() =>{
                    console.log('profile updated')
                })
                .catch()

                //send email verification
                sendEmailVerification(result.user)
                .then(() =>{
                    alert('please check your email and verification your email')
                })
            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message)
            })
    }

    return (
        <div>
            <div className="mx-auto md:w-2/4 bg-slate-400 p-5 rounded-lg">
                <h2 className="text-3xl font-semibold text-center mb-3">Please Register</h2>
                <div>
                    <form onSubmit={handleRegister} className="">
                        <input className="py-2 px-2" placeholder="Your Name" type="text" name="name" id="" required /> <br />
                        <input className="py-2 px-2" placeholder="Your Email" type="email" name="email" id="" required /> <br />

                        <div className="relative">
                            <input className="my-5 py-2 px-2 " placeholder="Your Password"
                                type={showPassword ? 'text' : "password"}
                                name="password" id="" required />
                            <span className="absolute top-8 right-[400px]  text-xl" onClick={() => setShowPassword(!showPassword)}>

                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }

                            </span>
                        </div>
                        <br />

                        <div className="pb-2 text-xl">
                            <input className="mr-2 text-8xl" type="checkbox" name="terms" id="terms" />
                            <label htmlFor="terms">Accept Terms And Conditions</label> <br />
                        </div>

                        <input className="btn btn-primary py-3 px-5 rounded-lg font-semibold " type="submit" value="Register" />
                    </form>

                    <p className="py-2">already have an account ? <Link to='/login'><span className="text-blue-600">Login</span></Link></p>
                    {
                        registerError && <p className="text-red-600 pt-5">{registerError} </p>
                    }
                    {
                        success && <p className="text-slate-50 pt-5">{success} </p>
                    }
                </div>

            </div>
        </div>
    );
};

export default Register;