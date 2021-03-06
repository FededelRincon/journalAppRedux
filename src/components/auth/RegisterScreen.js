import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui)


    const [ formValues, handleInputChange ] = useForm ({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formValues;


    const handleRegister = (e) => {
        e.preventDefault();

        if ( isFormValid() ) {
            dispatch( startRegisterWithEmailPasswordName( email, password, name ) )
        }
        
    }

    const isFormValid = () => {
        if(validator.isEmpty(name)){
            dispatch( setError( 'Name is required' ));
            return false;
        } else if(!validator.isEmail(email)) {
            dispatch( setError( 'Email is not valid' ));
            return false
        } else if(password !== password2 || password.length < 6) {
            dispatch( setError( 'Invalid password' ));
            return false
        }

        dispatch( removeError() );
        return true;
    }


    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    msgError &&
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                }

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="no" //tambien funciona
                    className="auth__input"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    className="auth__input"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    autoComplete="off"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    autoComplete="off"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    // disabled={ true }
                >
                    Register
                </button>

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered ?
                </Link> 

            </form>
        </>
    )
}
