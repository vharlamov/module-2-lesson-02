import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { CommentList, CommentForm } from ".."
import api from "../../../../api"
import { validator } from "../../../../utils/validator"

const Comments = ({ users, user }) => {
  const [comment, setComment] = useState({ text: "", targetUser: null })
  const [userComments, setUserComments] = useState([])
  const [targetUser, setTargetUser] = useState("")
  const [errors, setErrors] = useState({})

  const validatorConfig = {
    targetUser: {
      isSelect: {
        message: "Необходимо выбрать собеседника"
      }
    },

    text: {
      required: {
        message: "Поле должно быть заполнено"
      }
    }
  }

  const validate = () => {
    const errors = validator(comment, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const sort = (arr) => arr.sort((a, b) => +b.created_at - +a.created_at)

  const onChange = (data) => {
    if (data.name) {
      setComment((prev) => ({ ...prev, [data.name]: data.value }))
      setTargetUser(data.value)
    } else {
      setComment((prev) => ({ ...prev, ...data }))
    }
  }

  const handleSubmit = () => {
    const newComment = {
      userId: user._id,
      pageId: comment.targetUser,
      content: comment.text
    }

    setUserComments((prev) => sort([...prev, newComment]))

    api.comments
      .add(newComment)
      .then(() =>
        setUserComments(sort(JSON.parse(localStorage.getItem("comments"))))
      )

    setTargetUser(comment.targetUser)
    setComment({ text: "", targetUser: comment.targetUser })
  }

  const handleDelete = (id) => {
    api.comments.remove(id)
    setUserComments((prev) => prev.filter((comm) => comm._id !== id))
  }

  useEffect(() => {
    const allComments = JSON.parse(localStorage.getItem("comments"))
    setUserComments(sort(allComments))
  }, [])

  useEffect(() => {
    validate()
  }, [comment])

  useEffect(() => {
    setComment((prev) => ({ ...prev, text: "" }))
  }, [comment.targetUser])

  return (
    <>
      <CommentForm
        users={users}
        onChange={onChange}
        onSubmit={handleSubmit}
        value={comment.text}
        errors={errors}
        selectedUser={targetUser}
      />
      <CommentList
        users={users}
        user={user}
        targetUser={targetUser}
        comments={userComments}
        onDelete={handleDelete}
      />
    </>
  )
}

Comments.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array,
  comments: PropTypes.array
}
export default Comments
