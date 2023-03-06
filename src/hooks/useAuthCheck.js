import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLoggedIn } from '../features/auth/authSlice'

export default function useAuthCheck() {
  const dispatch = useDispatch()
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    debugger
    const localAuth = localStorage?.getItem('auth')

    if (localAuth) {
      const auth = JSON.parse(localAuth)
      if (auth?.user) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          }),
        )
      }
    }
    setAuthChecked(true)
  }, [dispatch, setAuthChecked])

  return authChecked
}
