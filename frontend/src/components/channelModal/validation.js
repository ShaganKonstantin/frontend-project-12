import * as Yup from 'yup';
import i18n from '../../utils/i18n/i18n.jsx';

export const channelModalSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, i18n.t('errors.modalLength'))
    .max(20, i18n.t('errors.modalLength'))
    .required(i18n.t('errors.enterChName'))
})