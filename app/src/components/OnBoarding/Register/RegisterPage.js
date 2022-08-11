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
import GET_LOGIN from '../../GraphQL/users/GetLogin';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const RegisterPage = ({ setUser, loginUser }) => {

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
        <div className="middle">
            <Container>
                Register
                <div className="text-center">
                    <h1 className="title mb-5">TITLE</h1>
                    <form className={Styles['form-signin']} onSubmit={handleSubmit} noValidate={true}>
                        <h2 className="h3 mb-3 font-weight-normal">Please Register</h2>
                        <ErrorAlert error={error}></ErrorAlert>
                        <Input label="Email" type="email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
                        <Input label="Password" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
                        <div className='specialButton'>
                            <div className='btnContainer'>
                                <Button color="primary" type="submit">Register</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default RegisterPage;