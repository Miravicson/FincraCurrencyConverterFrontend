import { UseFormProps } from 'react-hook-form';

export const useFormDefaultProps: Pick<UseFormProps, 'mode' | 'criteriaMode'> =
  {
    mode: 'onChange',
    criteriaMode: 'firstError',
  };
