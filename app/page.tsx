"use client"

import { useRef } from 'react';
import { FieldElement } from './components/DynamicForm';
import { DynamicForm } from './components/DynamicForm';

export default function Home() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const fields: Array<FieldElement> = [
    { name: 'name', type: 'TEXT' , label: 'Name', required: true },
    { name: 'age', type: 'NUMBER', label: 'Age', required: true },
    {
      name: 'role',
      type: 'SELECT',
      label: 'Role',
      required: true,
      data: [
        { label: 'Admin', value: 'A' },
        { label: 'User', value: 'U' },
        { label: 'Contractor', value: 'C' },
        { label: 'Partner', value: 'P' },
      ],
    },
  ];

  // Define a callback function to be executed on form submission
  const handleFormSubmit = (formData: Record<string, string | number>) => {
    // Do something with the form data in response to the submission
    console.log('Form data submitted:', formData);
    if (spanRef.current) {
      spanRef.current.innerHTML = JSON.stringify(formData)
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {/* Pass the fields and the callback function to the DynamicForm component */}
        <DynamicForm name="formTest1" fields={fields} onSubmit={handleFormSubmit} />
        <span ref={spanRef}></span>
      </div>
    </main>
  );
}
