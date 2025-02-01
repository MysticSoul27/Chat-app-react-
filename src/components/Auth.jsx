import React from 'react'
import { auth, provider } from '../firebseConfig.js'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie'
import img1 from '../assets/chatimg.png'
import { Col, Row } from 'react-bootstrap'

const cookies = new Cookies()


const Auth = ({ setIsAuth }) => {

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            console.log(result);
            cookies.set("auth-token", result.user.refreshToken)
            setIsAuth(true)
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div style={{ width: '100%', height: '100vh' }} >
            <h1 className='my-3 fw-bold'>Welcome To Web-Chat</h1>
            <p className='my-4'>Stay connected with real-time messaging.</p>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <Row  className='bg-primary p-2 shadow-lg rounded-2'>
                    <Col className='d-flex flex-column justify-content-center align-items-center'>
                        <div>
                            <h3 className='p-1 fw-bold'><i className="fa-solid fa-headset me-1"></i>Web-Chat</h3>
                            <div className='p-1'><img width={'600px'} className='img-fluid rounded-3' src={img1} alt="" /></div>
                        </div>
                        <p className='p-2'>Sign In With Your Google Account</p>
                        <button className='btn border border-0 shadow my-2' onClick={signInWithGoogle} style={{backgroundColor: 'green'}}>Sign in</button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Auth