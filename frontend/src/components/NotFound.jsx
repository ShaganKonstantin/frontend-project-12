import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className='d-flex flex-column align-items-center justify-items-center'>
      <h1 className='mb-4'>404 (not found)</h1>
      <Link className='btn btn-primary' to='/'>
        {t('backToHome')}
      </Link>
    </div>
  )
}
