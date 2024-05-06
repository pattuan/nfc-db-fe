import React from "react";
import * as Realm from "realm-web";
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import config from '../../config'

const app = new Realm.App({ id: `${config.API}`});
const user = app.currentUser;

const schema = {
    title: 'Register',
    type: 'object',
    required: ['email', 'password'],
    properties: {

        email: { type: 'string', title: 'Email', format: 'email' },
        password: { type: 'string', title: 'Password', minLength: 6, format: 'password' },
    },
};

const Login = {
    title: 'Login',
    type: 'object',
    required: ['email', 'password'],
    properties: {

        email: { type: 'string', title: 'Email', format: 'email' },
        password: { type: 'string', title: 'Password', minLength: 6, format: 'password' },
    },
};


const Home = () => {
    const Register = async (form) => {
        const { email, password } = form?.formData
        try {
            await app.emailPasswordAuth.registerUser({ email, password });
            console.log("Đăng ký thành công")
            window.location.reload(true)
        } catch (error) {
            console.log(error.error)
        }
    }
    const Loginn = async (form) => {
        const { email, password } = form?.formData
        try {
            const credentials = Realm.Credentials.emailPassword(email, password);
            // Authenticate the user
            await app.logIn(credentials);
            console.log("Đăng nhập thành công:");
            window.location.reload(true)
        } catch (error) {
            console.log(error.error)
        }
    }
    const Logout = async () => {
        try {
            // Authenticate the user
            await user.logOut();
            console.log("Đăng xuất thành công:");
            window.location.reload(true)
        } catch (error) {
            console.log(error.error)
        }
    }

    const Getvalue = async () => {
        const functionName = "get";
        try {
            const result = await user.callFunction(functionName);
            console.log(result);
        }catch (error) {
            console.log(error.error)
        }
    }
    return (
        <div>
            {user ? (
                <div>
                    Home
                    <button onClick={Logout}>Logout</button>
                    <button onClick={Getvalue}>Logout</button>
                </div>
            ) : (
                <div>
                    <Form
                        schema={schema}
                        validator={validator}

                        onSubmit={Register}

                    />
                    <Form
                        schema={Login}
                        validator={validator}

                        onSubmit={Loginn}

                    />
                </div>
            )}

        </div>
    );
}
export default Home;
