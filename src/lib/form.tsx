import {HTMLProps, ReactNode, createContext, useContext, useState} from "react";

type FormContextType = {
  data: any,
  errors: any,
  setField: (nam: string, v: any) => void
}

type FieldProps = {
  name: string,
  label?:string
}

export const FormContext = createContext<FormContextType>({data: {}, errors: {}})

export const useFormContext = () => useContext(FormContext)

type FormHandle = {
  contextValue: any
}

type FormProps = {
  children: ReactNode,
  handle: FormHandle
} & HTMLProps<HTMLFormElement>

export const useForm = (init: any): {handle: FormHandle, data: any, errors: any} => {
  const [state, setState] = useState({data: init, errors: {}})
  const setField = (name: string, value: any) => {
    console.log('in setField', name, value)
    //state.data[name] = value
    setState({
      ...state,
      data: {
        ...state.data,
        [name]: value
      }
    })
  }
  return {
    handle: {
      contextValue: {
        ...state,
        setField
      }
    },
    data: state.data,
    errors: state.errors
  }
}

export const Form = ({handle, children, ...props}: FormProps) => {
  return (
    <FormContext.Provider value={handle.contextValue}>
      <form {...props}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

export const useField = (name: string) => {
  const context = useFormContext()
  return [
    context.data[name],
    (value: any) => context.setField(name, value)
  ]
}
