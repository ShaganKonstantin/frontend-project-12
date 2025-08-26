import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Hooks/useAuth.jsx'
import axios from 'axios'
import { RegistrationSchema } from './validation.js'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import registrationImage from '../../assets/registrationImage.jpg'

export const RegistrationForm = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { t } = useTranslation()

  const isNetworkError = error => !error.response && (error.message === 'Network error' || error.code === 'ERR_NETWORK')

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegistrationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post('/api/v1/signup', values)
        const { token, username } = response.data
        login(token, username)
        navigate('/', { replace: true })
      }
      catch (error) {
        if (error.response?.status === 409) {
          setErrors({ username: t('errors.userExists') })
        }
        else if (isNetworkError(error)) {
          toast.error(t('errors.networkError'))
          setErrors({ auth: t('errors.networkError') })
        }
        else {
          setErrors({ auth: t('errors.registrationError') })
        }
      }
      finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <div className="h-100 bg-light">
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white d-flex">
            <div className="container d-flex">
              <a className="navbar-brand" href="/">Hexlet Chat</a>
            </div>
          </nav>
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                    <div>
                      <img src={registrationImage} alt="Регистрация" className="rounded-circle" />
                    </div>
                    <form onSubmit={formik.handleSubmit} className="w-50" autoComplete="off">
                      <h1 className="text-center mb-4">{t('registrationTitle')}</h1>
                      <div className="form-floating mb-3">
                        <input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          type="text"
                          name="username"
                          autoComplete="off"
                          placeholder={t('nameLength')}
                          id="username"
                          className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                          required
                        />
                        <label className="form-label" htmlFor="username">{t('registrationUsernamePlaceholder')}</label>
                        {formik.touched.username && formik.errors.username && (
                          <div className="invalid-tooltip">
                            {formik.errors.username}
                          </div>
                        )}
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          type="password"
                          name="password"
                          autoComplete="new-password"
                          placeholder={t('errors.sixCharsMin')}
                          id="password"
                          className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                          required
                        />
                        <label htmlFor="password" className="form-label">{t('registrationPasswordPlaceholder')}</label>
                        {formik.touched.password && formik.errors.password && (
                          <div className="invalid-tooltip">{t('errors.sixCharsMin')}</div>
                        )}
                      </div>
                      <div className="form-floating mb-4">
                        <input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.confirmPassword}
                          type="password"
                          name="confirmPassword"
                          autoComplete="new-password"
                          placeholder={t('errors.passwordMatch')}
                          id="confirmPassword"
                          className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                          required
                        />
                        <label htmlFor="confirmPassword" className="form-label">{t('errors.passwordConfirmation')}</label>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                          <div className="invalid-tooltip">{t('errors.passwordMatch')}</div>
                        )}
                      </div>
                      <button type="submit" className="w-100 btn btn-outline-primary" disabled={formik.isSubmitting}>{t('registrationButton')}</button>
                    </form>
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
