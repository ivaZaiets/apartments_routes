import { useContext } from 'react';
import { Context } from '../ApartmentsContext';

export const useCustomContext = () => {
  const initialValues = useContext(Context);

  if (!initialValues) {
    throw new Error('something went wrong');
  }

  return initialValues;
};
