import {TextInput} from "@mantine/core"
import {useField} from "./form"
import React from "react"

export const TextField = ({name, label}: FieldProps) => {
  const [value, onChange] = useField(name)
  return (
    <div>
      <TextInput value={value} onChange={e => onChange(e.target.value)} label={label} />

    </div>
  )
}
