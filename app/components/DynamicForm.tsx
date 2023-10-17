"use client"

import { FormEvent, useState } from 'react';

type SelectElement = {
  label: string;
  value: string | number;
};

export type FieldElement = {
  name: string;
  type: string;
  data?: Array<SelectElement>;
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
    const { name, type, data } = element;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    if (element.type === 'text' || element.type === 'number') {
      return (
        <input
          name={name}
          type={type}
          onChange={handleChange}
          value={formData[name] || ''}
        />
      );
    } else if (element.type === 'select') {
      return (
        <select name={name} onChange={handleChange} value={formData[name] || ''}>
          {data?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Execute the callback function with the form data
    onSubmit(formData);
  };

  return (
    <form name={name} onSubmit={handleFormSubmit}>
      {fields.map((element) => createElement(element))}
      <button type="submit">Submit</button>
    </form>
  );
};
