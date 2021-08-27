const Bookmark = props => {
  const {marked} = props
  //console.log(selected, id);
  return ( 
    <i className={`bi bi-bookmark${marked ? '-fill' : ''}`}></i>
   )
}
 
export default Bookmark;