import React, { useState } from 'react'
import api from '../api'
import 'bootstrap/dist/css/bootstrap.css'

const Head = () => {
  return (
    <thead>
      <tr>
        <th>Имя</th>
        <th>Качества</th>
        <th>Профессия</th>
        <th>Встречался, раз</th>
        <th>Оценка</th>
        <th></th>
      </tr>
    </thead>
  )
}

const Button = props => {
  return (
    <button 
      className='btn btn-danger' 
      id={props.id}
      onClick={() => props.delete(props.id)}
        >Delete
    </button>
  )
}

const qualities = arr => {
  const qlts = arr.map(q => (
    <span 
      key={q._id} 
      className={`badge bg-${q.color} me-2`}
      >
        {q.name}
    </span>))
  return qlts
}

const Row = props => {
  const user = props.user

  return (
    <tr id={user._id}>
      <td>{user.name}</td>
      <td>{qualities(user.qualities)}</td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} / 5</td>
      <td>
        <Button 
          id={user._id} 
          delete={props.delete}
        />
      </td>
    </tr>)
}

const Rows = props => {
  return (
    <tbody>
      {props.users.map(user => <Row 
        user={user} 
        key={user._id} 
        delete={props.delete}
        />
      )}
    </tbody>
  )
}

const checkNums = num => {
  const str = String(num)
  const length = str.length

  if (str[0] === '0') return 'Сегодня никто с тобой не тусует'
  if (str[0] === '1' && length === 1) return `Сегодня с тобой тусует 1 человек`
  if (str[length - 2] === '1' && length > 1) return `Сегодня с тобой тусуют ${num} человек`
  if (['2', '3', '4'].includes(str[length - 1])) return `Сегодня с тобой тусуют ${num} человека`
  return `Сегодня с тобой тусуют ${num} человек`

}

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = id => {
    setUsers(users.filter(user => user._id !== id))
  }
  
  return (
    <>
      <button type="button" className={
        `btn btn-${String(users.length)[0] === '0' 
          ? 'danger' 
          : 'primary'}`
      }>
        {checkNums(users.length)}
      </button>
      <table className='table'>
        <Head />
        <Rows users={users} delete={handleDelete}/>
      </table>
    </>
  )
}

export default Users