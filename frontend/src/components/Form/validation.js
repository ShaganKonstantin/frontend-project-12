import * as Yup from 'yup';
import i18n from '../../utils/i18n/i18n.jsx';

export const SignupSchema = Yup.object().shape({
    username: Yup.string()
        // .min(5, i18n.t('errors.loginUsernameMin'))
        .required(i18n.t('errors.fillField')),
    password: Yup.string()
        // .min(5, i18n.t('errors.loginPasswordMin'))
        .required(i18n.t('errors.fillField'))
})

export const RegistrationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, i18n.t('nameLength'))
        .max(20, i18n.t('nameLength'))
        .required(i18n.t('errors.fillField')),
    password: Yup.string()
        .min(6, i18n.t('errors.registrationPasswordMin'))
        .max(20, i18n.t('errors.registrationPasswordMax'))
        .required(i18n.t('errors.fillField')),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], i18n.t('errors.passwordMatch'))
        .required(i18n.t('errors.passwordConfirmation'))
})

