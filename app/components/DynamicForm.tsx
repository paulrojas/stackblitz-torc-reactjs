import { FormEventHandler } from 'react'

type SelectElement = {
  label: string
  value: string|number
}

export type FieldElement = {
  name: string;
  type: string;
  data?: Array<SelectElement>;
};

interface IProps {
  name: string;
  fields: Array<FieldElement>;
  onSubmit: FormEventHandler<HTMLFormElement>
}

export const DynamicForm = (props: IProps) => {
  const { name, fields, onSubmit} = props;
  const createElement = (element: FieldElement) => {
    const {name, type, data, values } = element;

    if (element.type === 'text') {
      return <input name={name} type={type} />
    } else if(element.type === 'number') {
      return <input name={name} type={type} />
    } else if(element.type === 'select') {
      return (
        <select name={name}>
          {data.map(option => <option value={option.value}>{option.label}</option>) }
        </select>
      )
    }
  }

  return (
    <>
      <form name={name} onSubmit={(e) => { onSubmit() }}>
        { fields.map( element => createElement(element))}
      </form>
    </>
  );
};
