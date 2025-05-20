import * as Yup from 'yup';

const regx = {
    username: /^[a-zA-Zа-яА-ЯёЁ\s\-]{2,20}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/
}

export const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .matches(regx.username, "Имя пользователя должно содержать от 2 до 20 символов на кириллице или латинице.")
        .required("Заполните поле."),
    password: Yup.string()
        .max(32, "Длина пароля не должна превышать 32 символа.")
        .matches(regx.password, "Пароль должен содержать хотя бы одну строчную букву, одну заглавную букву, одну цифру и иметь длину не менее 8 символов.")
        .required("Заполните поле.")
})