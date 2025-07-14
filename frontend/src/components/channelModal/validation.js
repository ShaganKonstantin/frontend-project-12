import * as Yup from 'yup';

export const channelModalSchema = Yup.object().shape({
  channelName: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'Максимум 20 символов')
    .required('Введите имя канала.')
})