import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(5, "Логин должен содержать минимум 5 символов.")
        .required("Заполните поле."),
    password: Yup.string()
        .min(5, "Пароль должен содержать минимум 5 символов.")
        .required("Заполните поле.")
})

export const RegistrationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Имя пользователя должно содержать минимум 3 символа")
        .max(20, "Имя пользователя должно содержать максимум 20 символов")
        .required("Заполните поле"),
    password: Yup.string()
        .min(6, "Пароль должен содержать минимум 6 символов.")
        .max(20, "Пароль должен содержать максимум 20 символов.")
        .required("Заполните поле."),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Пароли должны совпадать.")
        .required("Подтвердите пароль.")
})

