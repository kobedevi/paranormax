import { useState } from 'react';
import Button from '../../Design/Button';
import Container from '../../Design/Container';
import Input from '../../Design/Input';
import Styles from './LoginPage.module.scss';
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
        <div className="middle">
            <Container>
                Register
                <div className="text-center">
                    <h1 className="title mb-5">TITLE</h1>
                    <form className={Styles['form-signin']} onSubmit={handleSubmit} noValidate={true}>
                        <h2 className="h3 mb-3 font-weight-normal">Please Register</h2>
                        <ErrorAlert error={error}></ErrorAlert>
                        <Input label="Username" type="text" name="username" value={data.username} onChange={handleChange} error={errors.username} />
                        <Input label="First Name" type="text" name="firstName" value={data.firstName} onChange={handleChange} error={errors.firstName} />
                        <Input label="Last Name" type="text" name="lastName" value={data.lastName} onChange={handleChange} error={errors.lastName} />
                        <Input label="Email" type="email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
                        <Input label="Password" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
                        <div className='specialButton'>
                            <div className='btnContainer'>
                                <Button color="primary" type="submit">Register</Button>
                            </div>
                        </div>
                        <p className="sign-up">
                            Already have an Account?
                            <Link className="nav-link" to={Routes.Login}>Login</Link>
                        </p>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default RegisterPage;