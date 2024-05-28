import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [LoginError, setLoginError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRep = useRef(null)

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        // reset 
        setLoginError('');
        setSuccess('')

// send validation email
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                
                if(result.user.emailVerified){
                    setSuccess('your create successfully')
                }
                else{
                    alert('please your verified email address')
                }
                // 
                
            })
            .catch(error => {
                console.log(error)
                setLoginError(error.message)
            }
            )
    }

    const handleForgetPassword = () =>{
        const  email = emailRep.current.value;
        if(!email){
            console.log('send forget mail')
            return;
        }
        
        sendPasswordResetEmail(auth, email)
        .then( () =>{
            alert('please check your Email')
        })
        .catch(error =>{
            console.log(error)
        })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" 
                                name="email" 
                                ref={emailRep}
                                placeholder="email" 
                                className="input input-bordered" 
                                required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>

                        <p className="pb-2">New to this website please ? <Link to='/register'><span className="text-blue-600">Register</span></Link></p>
                        {
                            LoginError && <p className="text-red-600 pt-5">{LoginError} </p>
                        }
                        {
                            success && <p className="text-green-600 py-5">{success} </p>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;