import { RefObject } from 'react';
import { Toast } from 'primereact/toast';
import { createToastUtils, ToastUtils } from '@/utils/toastUtils';

export const useToast = (toastRef: RefObject<Toast | null>): ToastUtils => {
  return createToastUtils(toastRef);
}; 