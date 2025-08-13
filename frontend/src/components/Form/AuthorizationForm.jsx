import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../Hooks/useAuth.jsx";
import axios from 'axios';
import { SignupSchema } from './validation.js';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';

export const AuthorizationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const rollbar = useRollbar();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post('/api/v1/login', values)
        const { token, username } = response.data;
        
        // Вызываем login с токеном
        login(token, username)
        
        // Перенаправляем на предыдущую страницу или на главную
        const { from } = location.state || { from: { pathname: '/' } }
        navigate(from.pathname, { replace: true })
        
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        rollbar.error('Ошибка авторизации', error, {
            username: formik.values.username,
            endpoint: '/api/v1/login'
        });
        setErrors({ auth: t('errors.invalidCredentials') })
      } finally {
        setSubmitting(false)
      }
    }
  })

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
                                            <img src="https://frontend-chat-ru.hexlet.app/assets/avatar-DIE1AEpS.jpg" alt="Войти" className="rounded-circle" />
                                        </div>
                                        <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                                            <h1 className="text-center mb-4">{t('loginTitle')}</h1>
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
                                                  className={`form-control ${formik.touched.username && formik.errors.username || formik.errors.auth ? 'is-invalid' : ''}`}
                                                  required
                                                />
                                                <label htmlFor="username">{t('loginNamePlaceholder')}</label>
                                                {formik.touched.username && formik.errors.username && (
                                                    <div className="invalid-tooltip">{formik.errors.username}</div>
                                                )}
                                            </div>
                                            <div className="form-floating mb-4" style={{ position: 'relative' }}>
                                                <input 
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={formik.values.password}
                                                  type="password" 
                                                  name="password"
                                                  autoComplete="current-password"
                                                  placeholder="Пароль"
                                                  id="password"
                                                  className={`form-control ${formik.touched.password && formik.errors.password || formik.errors.auth ? 'is-invalid' : ''}`}
                                                  required
                                                />
                                                <label htmlFor="password">{t('loginPasswordPlaceholder')}</label>
                                                {formik.touched.password && formik.errors.password && (
                                                    <div className="invalid-tooltip">{formik.errors.password}</div>
                                                )}
                                                {formik.errors.auth && (
                                                <>
                                                    <div className="invalid-tooltip"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '100%',
                                                                left: 0
                                                            }}
                                                        >{formik.errors.auth}
                                                    </div>
                                                    <div 
                                                        style={{ display: 'none' }} 
                                                        aria-hidden="true"
                                                        >
                                                        {formik.errors.auth}
                                                    </div>
                                                </>
                                                )}
                                            </div>
                                            <button className="w-100 mb-3 btn btn-outline-primary" type="submit">{formik.isSubmitting ? t('isLoggingButton') : t('loginButton')}</button>
                                        </form>
                                    </div>
                                    <div className="card-footer p-4">
                                        <div className="text-center">
                                            <span>{t('hasAccount')}</span>
                                            <a href="/signup">{t('registration')}</a>
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