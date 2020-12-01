import { useState } from 'react';

export default function useForm(initialValues = {}) {
  const [values, setValues] = useState<typeof initialValues>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return [values, handleChange];
}
