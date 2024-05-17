import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import validator from '@rjsf/validator-ajv8';
import config from '../../config';
import * as Realm from "realm-web";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const app = new Realm.App({ id: `${config.API}` });

const schema = {
    title: 'Register',
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: { type: 'string', title: 'Email', format: 'email' },
        password: { type: 'string', title: 'Password', minLength: 6, format: 'password' },
    },
};

function App() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = formData;
        try {
            await app.emailPasswordAuth.registerUser({ email, password });
            console.log("Đăng ký thành công");
            window.location.reload(true);
        } catch (error) {
            console.log(error.error);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '65vh', backgroundColor: '#f8f9fa' }}>
            <div style={{ maxWidth: '500px', width: '80%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ padding: '40px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px', textTransform: 'uppercase' }}>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ marginBottom: '10px', display: 'block' }}>Your Email</label>
                            <input
                                style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                                id='email'
                                type='email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ marginBottom: '10px', display: 'block' }}>Your Password</label>
                            <input
                                style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                                id='password'
                                type='password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
    
}

export default App;
