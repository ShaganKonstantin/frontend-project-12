import React, { useEffect } from "react";
import { SignupSchema } from './validation.js';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../Hooks/index.jsx";
import axios from 'axios';

export const AuthorizationForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('AuthorizationToken');
        if(token) {
            const { from } = location.state || {from: {pathname: '/'}}
            navigate(from)
        }
    }, [location.state, navigate])
    
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: SignupSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await axios.post('/api/v1/login', values);
                const { token } = response.data;
                // localStorage.setItem('AuthorizationToken', JSON.stringify(token)); 
                localStorage.setItem('AuthorizationToken', token); 
                login(token);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setErrors({ auth: 'Неверные имя пользователя или пароль' })
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="h-100">
            <div className="h-100" id="chat">
                <div className="d-flex flex-column h-100">
                    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white d-flex">
                        <div className="container d-flex">
                            <a className="navbar-brand" href="/">Hexlet Chat</a>
                        </div>
                    </nav>
                    <div className="container-fluid h-100">
                        <div className="row justify-content-center align-content-center h-100 d-flex">
                            <div className="col-12 col-md-8 col-xxl-6">
                                <div className="card shadow-sm d-flex">
                                    <div className="card-body row p-5 d-flex">
                                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center d-flex">
                                            <img src="/loginImage.jpg" alt="Войти" className="rounded-circle" />
                                        </div>
                                        <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                                            <h1 className="text-center mb-4">Войти</h1>
                                            <div className="form-floating mb-3">
                                                <input 
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={formik.values.username}
                                                  type="text"
                                                  name="username"
                                                  autoComplete="username"
                                                  placeholder="Ваш ник"
                                                  id="username"
                                                  className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                                                  required
                                                />
                                                <label htmlFor="username">Ваш ник</label>
                                                {formik.touched.username && formik.errors.username && (
                                                    <div className="invalid-feedback">{formik.errors.username}</div>
                                                )}
                                            </div>
                                            <div className="form-floating mb-4">
                                                <input 
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={formik.values.password}
                                                  type="password" 
                                                  name="password"
                                                  autoComplete="current-password"
                                                  placeholder="Пароль"
                                                  id="password"
                                                  className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                                  required
                                                />
                                                <label htmlFor="username">Пароль</label>
                                                {formik.touched.password && formik.errors.password && (
                                                    <div className="invalid-feedback">{formik.errors.password}</div>
                                                )}
                                            </div>
                                            <button className="w-100 mb-3 btn btn-outline-primary" type="submit">{formik.isSubmitting ? 'Вход...' : 'Войти'}</button>
                                        </form>
                                    </div>
                                    <div className="card-footer p-4">
                                        <div className="text-center">
                                            <span>Нет аккаунта?</span>
                                            <a href="#">Регистрация</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}