
import { useState } from 'react';
import { AuthLayout } from '../Components/AuthLayout';
import { SignUpForm } from './SignUpForm';
import { SignInForm } from './SignInForm';

const Auth = ({ initialView }) => {
    const [view, setView] = useState(initialView || 'signup');

    const onLoginSuccess = () => {

    };

    return (
        <div className="min-h-screen">
            <AuthLayout>
                {view === 'signup' ? (
                    <SignUpForm onSwitch={() => setView('signin')} onLoginSuccess={onLoginSuccess} />
                ) : (
                    <SignInForm onSwitch={() => setView('signup')} onLoginSuccess={onLoginSuccess} />
                )}
            </AuthLayout>
        </div>
    );
};

export default Auth;
