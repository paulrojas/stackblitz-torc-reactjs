"use client"

import { FieldElement } from './components/DynamicForm';
import { DynamicForm } from './components/DynamicForm';

export default function Home() {
  const fields: Array<FieldElement> = [
    { name: 'name', type: 'text' },
    { name: 'age', type: 'number' },
    {
      name: 'role',
      type: 'select',
      data: [
        { label: 'Admin', value: 'A' },
        { label: 'User', value: 'U' },
        { label: 'Contractor', value: 'C' },
        { label: 'Partner', value: 'P' },
      ],
    },
  ];

  // Define a callback function to be executed on form submission
  const handleFormSubmit = (formData) => {
    // Do something with the form data in response to the submission
    console.log('Form data submitted:', formData);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {/* Pass the fields and the callback function to the DynamicForm component */}
        <DynamicForm name="formTest1" fields={fields} onSubmit={handleFormSubmit} />
      </div>
    </main>
  );
}
