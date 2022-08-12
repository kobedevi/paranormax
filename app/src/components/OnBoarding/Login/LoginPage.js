import { useState } from 'react';
import Button from '../../Design/Button';
import Container from '../../Design/Container';
import Input from '../../Design/Input';
import * as yup from "yup";
import AppError from '../../../core/error/AppError';
import { getValidationErrors } from '../../../core/utils/validation';
import ErrorAlert from '../../Shared/ErrorAlert';
import { useMutation } from '@apollo/client';
import GET_LOGIN from '../../GraphQL/users/GET_LOGIN';
import { Link } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import "bootstrap-icons/font/bootstrap-icons.css";

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage = ({ setUser }) => {

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [error, setError] = useState();


    const [getLogin] = useMutation(GET_LOGIN);

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
            getLogin({
                variables: { email:data.email, password:data.password },
                onCompleted:({authenticate}) => {
                    console.log(authenticate)
                    setUser(authenticate)
                }
            })
            .catch(() => {
                setError(new AppError('Wrong combination'));
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
                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-lock"></i></div>
                        <h1 className="fw-bolder">Login</h1>
                    </div>
                    <div className='row gx-5 justify-content-center'>
                        <div className="col-lg-8 col-xl-6">
                            <form onSubmit={handleSubmit} noValidate={true}>
                                <ErrorAlert error={error}></ErrorAlert>
                                <Input label="Email" type="email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
                                <Input label="Password" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
                                <div className='d-grid'>
                                    <Button color="primary" className="btn btn-primary btn-lg" type="submit">Log in</Button>
                                </div>
                                <p className="sign-up py-2">
                                    Don&apos;t have an Account? <Link to={Routes.Register}>Register</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default LoginPage;