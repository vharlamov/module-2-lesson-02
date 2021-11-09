import { Quality } from "."

const Qualities = ({ qualities }) => {
  const qlts = (
    <>
      {qualities.map((qual) => (
        <Quality key={qual._id} qual={qual} />
      ))}
    </>
  )
  return qlts
}

export default Qualities
