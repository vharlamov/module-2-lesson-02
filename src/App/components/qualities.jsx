const Qualities = ({ qualities }) => {
  const qlts = qualities.map((q) => (
    <span key={q._id} className={`badge bg-${q.color} me-2`}>
      {q.name}
    </span>
  ))
  return qlts
}

export default Qualities
