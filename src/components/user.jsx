import React from 'react';
import Qualities from './qualities'
import Bookmark from './bookmark';

const Button = ({id, onDelete}) => {
  return (
    <button 
      className='btn btn-danger' 
      id={id}
      onClick={() => onDelete(id)}
        >Delete
    </button>
  )
}

const User = props => {
  const {
    _id, 
    name, 
    qualities, 
    profession, 
    completedMeetings, 
    rate, 
  } = props.user

  const {
    selectClick, 
    selected,
    onDelete,
    items
  } = props

  const isMarked = selected[_id]

  return (
    <tr id={_id}>
      <td>{name}</td>
      <td>{<Qualities arr={qualities}/>}</td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} / 5</td>
      <td onClick={() => selectClick(_id)}>
        <Bookmark 
          marked={isMarked}
        />
      </td>
      <td>
        <Button 
          id={_id} 
          onDelete={() => onDelete(_id, items - 1)}
        />
      </td>
    </tr>)}
 
export default User;