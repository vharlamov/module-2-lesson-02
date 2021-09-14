import PropTypes from "prop-types"
import Qualities from "./qualities"
import Bookmark from "./bookmark"

const Button = ({ id, onclick }) => {
  return (
    <button className="btn btn-danger" id={id} onClick={onclick}>
      Delete
    </button>
  )
}

const User = (props) => {
  const { selectClick, selected, onDelete, items, user } = props

  const { _id, name, qualities, profession, completedMeetings, rate } = user

  const isMarked = selected[_id]

  return (
    <tr id={_id}>
      <td>{name}</td>
      <td>{<Qualities arr={qualities} />}</td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} / 5</td>
      <td onClick={() => selectClick(_id)}>
        <Bookmark marked={isMarked} />
      </td>
      <td>
        <Button id={_id} onclick={() => onDelete(_id, items - 1)} />
      </td>
    </tr>
  )
}

User.propTypes = {
  selectClick: PropTypes.func.isRequired,
  selected: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  items: PropTypes.number,
  user: PropTypes.object.isRequired,
  _id: PropTypes.string
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  onclick: PropTypes.func.isRequired
}

export default User
