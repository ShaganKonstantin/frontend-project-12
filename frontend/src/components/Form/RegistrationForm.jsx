import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../Hooks/useAuth.jsx"
import axios from 'axios'
import { RegistrationSchema } from './validation.js'

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegistrationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post('/api/v1/signup', values);
        const { token, username } = response.data;
        login(token, username);
        navigate('/', { replace: true })
      } catch (error) {
        if (error.response?.status === 409) {
          setErrors({ username: 'Пользователь с таким именем существует.' })
        } else {
          setErrors({ auth: 'Ошибка регистрации.' })
        }
      } finally {
        setSubmitting(false)
      }
    }
  })

  return (
    <div className='h-100 bg-light'>
      <div className='h-100'>
        <div className='d-flex flex-column h-100'>
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white d-flex">
            <div className="container d-flex">
              <a className="navbar-brand" href="/">Hexlet Chat</a>
            </div>
          </nav>
          <div className='container-fluid h-100'>
            <div className='row justify-content-center align-content-center h-100'>
              <div className='col-12 col-md-8 col-xxl-6'>
                <div className='card shadow-sm'>
                  <div className='card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5'>
                    <div>
                      <img src="https://frontend-chat-ru.hexlet.app/assets/avatar_1-D7Cot-zE.jpg" alt="Регистрация" className='rounded-circle'/>
                    </div>
                    <form onSubmit={formik.handleSubmit} className='w-50'>
                      <h1 className='text-center mb-4'>Регистрация</h1>
                      <div className="form-floating mb-3">
                        <input 
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          type="text"
                          name="username"
                          autoComplete="username"
                          placeholder="От 3 до 20 символов"
                          id="username"
                          className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                          required
                        />
                        <label className='form-label' htmlFor="username">Имя пользователя</label>
                        {formik.touched.username && formik.errors.username  && (
                          <div className="invalid-tooltip">
                            {formik.errors.username === 'Обязательное поле' 
                              ? formik.errors.username 
                              : 'Пользователь с таким именем существует.'}
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
                          placeholder="Не менее 6 символов"
                          id="password"
                          className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                          required
                        />
                        <label htmlFor="password" className='form-label'>Пароль</label>
                        {formik.touched.password && formik.errors.password && (
                          <div className="invalid-tooltip">Не менее 6 символовь</div>
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
                          placeholder="Пароли должны совпадать"
                          id="confirmPassword"
                          className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                          required
                        />
                        <label htmlFor="confirmPassword" className='form-label'>Подтвердите пароль</label>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                          <div className="invalid-tooltip">Пароли должны совпадать</div>
                        )}
                      </div>
                      <button type='submit' className='w-100 btn btn-outline-primary' disabled={formik.isSubmitting}>Зарегистрироваться</button>
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