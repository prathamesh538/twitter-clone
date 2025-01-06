import React from 'react'
import './Sidebaroption.css'
const Sidebaroption = ({active,text,Icon}) => {
  return (
    <div className={'sidebaroptions ${active && "sidebarOptions--active"}'}>
        <Icon/>
        <h2>{text}</h2>
    </div>
  )
}

export default Sidebaroption