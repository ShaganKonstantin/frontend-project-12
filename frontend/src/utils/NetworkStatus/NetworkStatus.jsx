import { useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const NetworkStatus = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    const handleNetworkChange = () => {
      if(!navigator.onLine) {
        toast.error(t('errors.networkError'), {
          toastId: 'network-error', // Произвольный ID
          closeOnClick: false,
          autoClose: false,
        });
      } else {
        // Закрываем тост с уже имеющимся ID
        toast.dismiss('network-error')
      }
    };

    handleNetworkChange();

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);

    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
      toast.dismiss('network-error');
    }
  }, [t]);

  return null;
}