import {React, useState, useContext, useEffect} from 'react';
import Login from '../Login';
import { UserContext } from '../../../context/UserProvider';

const Auth = props => {

    const [toggle, setToggle] = useState(true);
    const [inputs, setInputs] = useState({ username: "", password: "" })
    const { signup, login } = useContext(UserContext);

    useEffect(() => {
        props.setPageHeader("")
    }, []);

    const handleSignup = e => {
        e.preventDefault();
        signup(inputs);
    }

    const handleLogin = e => {
        e.preventDefault();
        login(inputs);
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    } 

    return (
        <>
            {!toggle ? 
                <Login 
                inputs={inputs}
                handleChange={handleChange}
                handleSubmit={handleSignup}
                toggle={toggle}
                setToggle={setToggle}
                btnText="Sign Up"
                />
                :
                <Login 
                inputs={inputs}
                handleChange={handleChange}
                handleSubmit={handleLogin}
                toggle={toggle}
                setToggle={setToggle}
                btnText="Log In"
                />
            }
        </>
    )


}

export default Auth;