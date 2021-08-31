
import React from 'react'

const PageButtons = props => {
  const {onclick, quantity} = props

  const createButtons = () => {
    const buttons = []

    for(let i=0; i<quantity; i++) {
      const value = i + 1
      
      buttons.push(
        <li 
          key={i}
          className="page-item"
          style={{cursor: 'pointer'}}
          onClick={() => onclick(value)}
        >
          <span className="page-link" >
            {value}
          </span>
        </li>
      )
    }
    return buttons
  }

  return ( 
    <ul className="pagination">
      {createButtons()}
    </ul> 
  )
}
 
export default PageButtons;