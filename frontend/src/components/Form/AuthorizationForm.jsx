import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SignupSchema } from './validation.js'


export const AuthorizationForm = () => (
    <div className="row justify-content-center align-content-center h-100 d-flex">
        <div className="col-12 col-md-8 col-xxl-6">
            <div className="card-body row p-5 d-flex">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center d-flex">
                    <img src="/loginImage.jpg" alt="Войти" className="rounded-circle" />
                </div>
                <div className="form col-12 col-md-6 mt-3 mt-md-0">
                    <h2 className="text-center mb-4">Войти</h2>
                    <Formik
                        initialValues={{
                            username: "",
                            password: "",
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => {
                            alert(`Форма отправлена:\nИмя: ${values.username}, пароль: ${values.password}`);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-floating mb-3">
                                    <Field 
                                        className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`} 
                                        autoComplete="username" 
                                        name="username" 
                                        type="text" 
                                        id="username" 
                                        placeholder="Ваш ник"
                                    />
                                    <label htmlFor="username" className="form-label">Ваш ник</label>
                                    <ErrorMessage component="div" name="username" className="invalid-feedback"/>
                                </div>
                                <div className="form-floating mb-4">
                                    <Field 
                                        className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} 
                                        autoComplete="password" 
                                        name="password" 
                                        type="password" 
                                        id="password" 
                                        placeholder="Пароль"
                                    />
                                    <label htmlFor="password" className="form-label">Пароль</label>
                                    <ErrorMessage component="div" name="password" className="invalid-feedback"/>
                                    <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
                                </div>
                                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    </div>

)