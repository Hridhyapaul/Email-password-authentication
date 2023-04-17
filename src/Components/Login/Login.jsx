import { getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import app from '../Register/Firebase/firebase.config';

const auth = getAuth(app)

const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const emailRef = useRef();

    const handleLogin = (event) => {
        event.preventDefault();
        // setError('')
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)
        setError('')
        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please add at least one uppercase letter')
            return;
        }
        else if(!/(?=.*[0-9])/.test(password)){
            setError('Please add at least one number')
            return;
        }
        else if(!/(?=.*[#?!@$%^&*-])/.test(password)){
            setError('Please add at least one special character')
            return;
        }
        else if(password.length < 8){
            setError('Password must be 8 character long')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user
            setError('')
            event.target.reset();
            setSuccess('User login successfully')
        })
        .catch(error => {
            setError(error.message)
            setSuccess('')
        })
    }

    const handleEmailPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            alert('Please provide your email address to reset password')
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Please check your email')
        })
        .catch(error => {
            setError(error.message)
        })
    }

    return (
        <div className='w-50 mx-auto mt-5' >
            <h3 className='text-primary'>Please Login....</h3>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className='fw-semibold'>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        ref={emailRef}
                        className='mb-3'
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label className='fw-semibold'>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name='password'
                        className='mb-3'
                        required
                    />
                </Form.Group>

                <p className='my-2'>{error}</p>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <p className='mt-2'>Forget password? <Link to="" onClick={handleEmailPassword}>Reset your password</Link> </p>
                <p className='mt-2'>New to this website? please <Link to='/register'>Register</Link></p>
                <p className='mt-2 text-success'>{success}</p>
            </Form>
        </div>
    );
};

export default Login;