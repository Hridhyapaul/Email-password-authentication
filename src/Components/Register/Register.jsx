import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from './Firebase/firebase.config';
import {Link} from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const auth = getAuth(app);


const Register = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        setError('')
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value
        console.log(email, password, name)
        // validation
        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please add at least one (A-Z) uppercase')
            return
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('Please add at least two numbers')
            return
        }
        else if(password.length < 6){
            setError('Please add at least 6 characters')
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(result=> {
            const loggedUser = result.user
            console.log(loggedUser)
            setError('')
            event.target.reset();
            setSuccess('User has been created successfully')
            sendVerificationEmail(result.user)
            updateUserName(result.user, name)
        })
        .catch(error => {
            setError(error.message)
            console.log(error.message)
            setSuccess('')
        })
    }

    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
        .then(result=> {
            console.log(result)
            alert('Please verify your email address')
        })
    }

    const updateUserName = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
        .then(() => {
            console.log('user name updated')
        })
        .catch(error => {
            setError(error.message)
        })
    }

    return (
        <div className='w-50 mx-auto mt-5'>
            <h3 className='text-primary'>Please Register....</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='fw-semibold'>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Your name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='fw-semibold'>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='fw-semibold'>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <p>{error}</p>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Accept our terms & conditions" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p className='mt-2'>Already have an account? Please <Link to='/login'>login</Link></p>
            <p className='text-success mt-3 '>{success}</p>
        </div>
    );
};

export default Register;