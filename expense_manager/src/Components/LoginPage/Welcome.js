import React from 'react';
import { Container } from 'semantic-ui-react';
import "./Welcome.css";
import SignButton from './SignButton';
import Google from '../../Resources/Images/google_logo.png';
import Apple from '../../Resources/Images/apple_logo.png';


function Welcome() {

    return (
        <div className='main-container'>
            <Container className='leftPanel'>

            </Container>
            <Container className='rightPanel'>
                <div className = 'mainCall'>
                    Want to analyse your expenses?
                </div>
                <div className='subcall1'>
                    Join Us Today.
                </div>
                <SignButton message = 'Sign up with Google' withIcon = {1} signin={0} icon={Google}/>
                <SignButton message = 'Sign up with Apple' withIcon = {1} signin={0} icon={Apple}/>
                <div className='or-separator'>
                    <div className='or1'></div>
                        or
                    <div className='or2'></div>
                </div>
                <SignButton message = 'Sign up with Phone or Email' withIcon = {0} signin={0} />
                <div className='terms-and-condition'>
                    By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                </div>

                <div className='account-sign-in'>
                    Already have an account?
                </div>
                <SignButton message ='Sign in' withIcon = {0} signin = {1}/> 
            </Container>
        </div>
    )
}

export default Welcome
