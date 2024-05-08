import {Select as MSelect} from '@mantine/core';
import {useField} from './form';

type SelecProps = FieldProps & {

}

export const Select = ({name, label, options}: FieldProps) => {
  const [value, onChange] = useField(name)
  return <>
    <MSelect
      label={label}
      placeholder={label}
      data={options}
      value={value}
      onChange={onChange}
    />
  </>
}
