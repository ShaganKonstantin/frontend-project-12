import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(5, "Логин должен содержать минимум 5 символов.")
        .required("Заполните поле."),
    password: Yup.string()
        .min(5, "Пароль должен содержать минимум 5 символов.")
        .required("Заполните поле.")
})