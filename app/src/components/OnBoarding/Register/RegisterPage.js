import { useState } from 'react';
import Button from '../../Design/Button';
import Container from '../../Design/Container';
import Input from '../../Design/Input';
import * as yup from "yup";
import AppError from '../../../core/error/AppError';
import { getValidationErrors } from '../../../core/utils/validation';
import ErrorAlert from '../../Shared/ErrorAlert';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import REGISTER_USER from '../../GraphQL/users/REGISTER';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
});

const RegisterPage = ({ setUser }) => {

    const [data, setData] = useState({
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [error, setError] = useState();


    const [registerUser] = useMutation(REGISTER_USER);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        schema.validate(data,{abortEarly: false})
        .then(() => {
            registerUser({
                variables: { 
                    email: data.email, 
                    password: data.password, 
                    firstName: data.firstName,
                    lastName: data.lastName,
                    username: data.username
                },
                onCompleted:({register}) => {
                    setUser(register)
                }
            })
            .catch((e) => {
                setError(new AppError(`Something went wrong: ${e.message}`));
            });
        }).catch((e) => {
            setErrors(getValidationErrors(e));
        })
    };

    return(
        <section className="py-5">
            <Container>
                <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                    <div className="text-center mb-5">
                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-pencil-square"></i></div>
                        <h1 className="fw-bolder">Register</h1>
                    </div>
                    <div className='row gx-5 justify-content-center'>
                        <div class="col-lg-8 col-xl-6">
                            <form onSubmit={handleSubmit} noValidate={true}>
                                <ErrorAlert error={error}></ErrorAlert>
                                <Input label="Username" type="text" name="username" value={data.username} onChange={handleChange} error={errors.username} />
                                <Input label="First Name" type="text" name="firstName" value={data.firstName} onChange={handleChange} error={errors.firstName} />
                                <Input label="Last Name" type="text" name="lastName" value={data.lastName} onChange={handleChange} error={errors.lastName} />
                                <Input label="Email" type="email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
                                <Input label="Password" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
                                <div className='d-grid'>
                                    <Button color="primary" className="btn btn-primary btn-lg disabled" type="submit">Register</Button>
                                </div>
                                <p className="sign-up py-2">
                                    Already have an account? <Link to={Routes.Login}>Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default RegisterPage;