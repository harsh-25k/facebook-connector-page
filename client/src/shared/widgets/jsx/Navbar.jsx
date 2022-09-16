import React from 'react';
import "../styles/NavbarStyles.css";
import { BsCollectionPlay, BsMessenger, BsPeopleFill, BsSearch, BsShopWindow } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { HiHome, HiOutlineFlag } from 'react-icons/hi';
import { TbGridDots } from 'react-icons/tb';
import Logo from "../../../assets/img/facebook-logo.png";

const Navbar = () => {
  return (
    <div>
      <div className='main_container_navbar'>
        <div className='first_section_navbar'>
            <div className='logo_container_navbar'>
                <img src={Logo} alt="facebook" />
            </div>
            <div className='search_container_navbar'>
                <BsSearch className="search_icon_navbar" />
                <input type="text" placeholder='Search Facebook' />
            </div>
        </div>

        <div className='second_section_navbar'>
            <div className='second_section_icons_container_navbar active_icons_container_navbar'>
                <HiHome className='second_section_icon_navbar active_icon_navbar' />
            </div>
            <div className='second_section_icons_container_navbar'>
                <BsPeopleFill className='second_section_icon_navbar' />
            </div>
            <div className='second_section_icons_container_navbar'>
                <HiOutlineFlag className='second_section_icon_navbar' />
            </div>
            <div className='second_section_icons_container_navbar'>
                <BsCollectionPlay className='second_section_icon_navbar' />
            </div>
            <div className='second_section_icons_container_navbar'>
                <BsShopWindow className='second_section_icon_navbar' />
            </div>
        </div>

        <div className='third_section_navbar'>
            <div className='third_section_icons_container_navbar'>
                <TbGridDots className="third_section_icon_navbar" />
            </div>
            <div className='third_section_icons_container_navbar'>
                <BsMessenger className="third_section_icon_navbar" />
            </div>
            <div className='third_section_icons_container_navbar'>
                <FaBell className="third_section_icon_navbar" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
