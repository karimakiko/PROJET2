import React from 'react'
import "./navbar.scss";
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
export const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='wrapper'>
       <div className='search'>
       <input type="text"   placeholder='chercher..'/>
       <SearchIcon className='icon'/>
       </div>
       <div className="items">
       <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
        <div className="item">
        <LanguageIcon className='icon'/>
        Francais
        </div>
       </div>
      </div>
    </div>
  )
}
export default Navbar;