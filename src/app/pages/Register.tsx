import {FormEventHandler, useEffect, useRef, useState} from "react";
import {TextField} from "../../lib/TextField"
import {Form, useForm} from "../../lib/form"
import {useRegisterMutation} from "../api";
import {Select} from "../../lib/select";
import {factions} from "../../consts";
import {useNavigate} from "react-router-dom";

export default function Register() {
  const {handle, data, errors} = useForm({})
  const [register, registerResult] = useRegisterMutation()
  const nav = useNavigate()

  useEffect(() => {
    if ('token' in localStorage) {
      nav('/')
    }
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      let res = await register(data).unwrap()
      if (res?.data?.token) {
        localStorage.setItem('token', res.data.token)
        nav('/')
      }
    }
    catch (e) {
      console.log('error')
    }
  }

  return (
    <Form handle={handle} onSubmit={handleSubmit}>
      <TextField name='email' label='email' />
      <Select name='faction' options={factions} label='faction' />
      <TextField name='symbol' label='symbol' />
      <div>
        <div>
          {JSON.stringify(registerResult?.error?.data?.error?.message)}
        </div>
        <div>
          {JSON.stringify(registerResult?.error?.data?.error?.data)}
        </div>
      </div>
      <input type='submit' />
    </Form>
  )
}
