const Qualities = (props) => {
  const arr = props.arr
  const qlts = arr.map((q) => (
    <span key={q._id} className={`badge bg-${q.color} me-2`}>
      {q.name}
    </span>
  ))
  return qlts
}

export default Qualities
