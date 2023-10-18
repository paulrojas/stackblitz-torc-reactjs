"use client"

import { FormEvent, useState } from 'react';
import styles from './styles.module.css';

type SelectElement = {
  label: string;
  value: string | number;
};

export type FieldElementType = 'TEXT' | 'NUMBER' | 'SELECT';

export type FieldElement = {
  name: string;
  type: FieldElementType;
  data?: Array<SelectElement>;
  label?: string;
  required?: boolean | undefined;
};

interface IProps {
  name: string;
  fields: Array<FieldElement>;
  onSubmit: (formData: { [key: string]: string }) => void; // Callback function
}

export const DynamicForm = (props: IProps) => {
  const { name, fields, onSubmit } = props;
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const createElement = (element: FieldElement) => {
    const { name, type, data, label, required } = element;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    if (element.type === 'TEXT' || element.type === 'NUMBER') {
      return (
        <>
          {label && <label htmlFor={name}>{label}</label>}
          <input
            className={styles.element}
            name={name}
            type={type}
            onChange={handleChange}
            value={formData[name] || ''}
            required={required}
          />
        </>
      );
    } else if (element.type === 'SELECT') {
      return (
        <>
          {label && <label htmlFor={name}>{label}</label>}
          <select
            className={styles.element}
            name={name}
            onChange={handleChange}
            value={formData[name] || ''}
            required={required}>
            <option key='' value=''>Select an option</option>
            {data?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>
      );
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Execute the callback function with the form data
    onSubmit(formData);
  };

  return (
    <form name={name} onSubmit={handleFormSubmit} className="min-w-fit">
      {fields.map((element) => createElement(element))}
      <button className={[styles['btn'], styles['btn-blue']].join(' ')} type="submit">Submit</button>
    </form>
  );
};
