import { FormEventHandler } from 'react'
import { DynamicForm, FieldElement } from './components/DynamicForm';

export default function Home() {
  const fields: Array<FieldElement> = [
    { type: 'text' },
    { type: 'number' },
    { type: 'select', labels: [], values: [] },
  ];

  const onSubmitForm:FormEventHandler<HTMLFormElement> = () => {
    console.log('Form Submitted')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <DynamicForm name="formTest1" fields={fields} onSubmit={onSubmitForm} />
      </div>
    </main>
  );
}
