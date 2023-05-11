import React, { FC, useContext, useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { Context } from './index'
import { observer } from 'mobx-react-lite'
import { IUser } from './models/IUser'
import UserService from './service/UserService'

const App: FC = () => {
  const { store } = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  if (store.isLoading) {
    return <h3>Loading...</h3>
  }

  if (!store.isAuth) {
    return <LoginForm />
  }

  return (
    <div>
      <h1>
        {store.isAuth
          ? `User authorized ${store.user.email}`
          : 'Login or Register'}
      </h1>
      <button onClick={() => store.logout()}>Logout</button>
      <div>
        <button onClick={getUsers}>Get users</button>
      </div>
      <ul>
        {users.map(user => (
          <li>{user.email}</li>
        ))}
      </ul>
    </div>
  )
}

export default observer(App)
