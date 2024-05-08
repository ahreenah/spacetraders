import {useNavigate} from "react-router-dom";

export default function useAuthRequired() {
  const nav = useNavigate()
  if (!localStorage.token) {
    nav('/auth/register')
  }
}

