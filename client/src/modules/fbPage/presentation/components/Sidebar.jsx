import React, {useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/SidebarStyles.css";
import Logo from "../../../../assets/img/facebook-logo.png";
import ProfileImg from "../../../../assets/img/profile-image.png"
// import Logo2 from "../../../img/logo-white.png";
// import UserImage from "../../../img/user3.png";
// import HeaderStudent from "./HeaderStudent";
import { HiUserAdd } from "react-icons/hi";
import { IoMdThumbsUp } from "react-icons/io"
import {useParams} from 'react-router-dom'
import { GiAchievement } from "react-icons/gi";
import {  NavLink } from "react-router-dom";
import { CgMenuRight, CgTimer } from "react-icons/cg";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { IoFlagSharp } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io"
import PagesContainer from "./PagesContainer";
import Header from "../../../../shared/widgets/jsx/Header"


const Sidebar = ({allPagesInfo}) => {

  const [isOpenSidebar, setIsOpenSidebar] = useState(window.innerWidth > 940 ? true : false);
    
  const {id} = useParams()


  const routes = [
    {
      path: `/student/${id}/internships`,
      name: "Meta Business Suite",
      icon: <CgTimer size={isOpenSidebar ? "20" : "24"} />,
    },
    {
      path: `/student/${id}/workexperience`,
      name: "Discover",
      icon: <RiCompassDiscoverLine size={isOpenSidebar ? "20" : "24"} />,
    },
    {
      path: `/student/${id}/projects`,
      name: "Liked Pages",
      icon: <IoMdThumbsUp size={isOpenSidebar ? "20" : "24"} />,
    },
    {
      path: `/student/${id}/achievements`,
      name: "Invites",
      icon: <HiUserAdd size={isOpenSidebar ? "20" : "24"} />,
    },
  ];

  const toggleSidebar = () => setIsOpenSidebar(!isOpenSidebar);

  const midSectionAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
    },
    show: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
  };

  const scoreAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
    },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
  };

  const menuTextAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.4,
      },
    },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  const closeSidebar = () => {
    if(isOpenSidebar && window.innerWidth < 940){
      setIsOpenSidebar(!isOpenSidebar)
    }
  }

  return (
    <div className="main_container_sidebar">
      <motion.div
        animate={{
          width: window.innerWidth > 940 ? (isOpenSidebar ? "300px" : "60px") : (isOpenSidebar ? "300px" : "0px"),
          position: window.innerWidth >940 ? "fixed" : "fixed",
          transition: { duration: 0.3, type: "spring,", damping: 11 },
        }}
        className="sidebar_container_sidebar"
      >
        <div className="top_section_sidebar">
          {isOpenSidebar && <img src={Logo} alt="logo" />}
          <div
            className="hamburger_menu_sidebar"
            style={{ marginLeft: isOpenSidebar ? "20px" : "-10px" }}
          >
            <CgMenuRight size={38} onClick={toggleSidebar} />
          </div>
        </div>

        <AnimatePresence>
          {isOpenSidebar && (
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={midSectionAnimation}
              className="mid_section_sidebar"
            >
              <h2>Pages and Profiles</h2>
              <div className="settings_icon_container_sidebar">
                <FiSettings className="settings_icon_sidebar" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isOpenSidebar && (
          <motion.div initial="hidden"
          animate="show"
          exit="hidden"
          variants={scoreAnimation} className="page_section_sidebar">
          <div className="page_top_section_sidebar">
            <div className="page_top_left_section_sidebar">
              <div className="flag_icon_container_sidebar">
                <IoFlagSharp className="flag_icon_sidebar" />
              </div>
              <p>Your Pages and profiles</p>
            </div>
            <IoIosArrowUp className="up_arrow_icon_sidebar" />
          </div>

          <div className="page_middle_section_sidebar">
            {
               (allPagesInfo === undefined)?"":(
                allPagesInfo.map((page)=>(
                  <div className="page_middle_box_sidebar" key={page.id}>
                  <div className="page_icon_container_sidebar">
                    <img src={page.picture.data.url} alt="logo" />
                  </div>
                  <p>{page.name}</p>
                 </div>
                )))
            }
            
          </div>

          <div className="page_bottom_section_sidebar">
            <button className="btn_create_page_sidebar">+ Create new Page</button>
            <div className="line_sidebar"></div>
          </div>
        </motion.div>
        )}

        <section className="routes_container_sidebar">
          {routes.map((routes) => (
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "routes_link_sidebar active_sidebar"
                  : "routes_link_sidebar"
              }
              to={routes.path}
              key={routes.name}
              style={{ padding: isOpenSidebar ? "13px 20px" : "20px 15px" }}
              onClick={closeSidebar}
            >
              <div className="side_menu_icon_sidebar">{routes.icon}</div>
              <AnimatePresence>
                {isOpenSidebar && (
                  <motion.div
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={menuTextAnimation}
                    className="side_menu_text_sidebar"
                  >
                    {routes.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </section>
      </motion.div>

      <motion.main
        className="children_container_sidebar"
        animate={{
          paddingLeft: window.innerWidth > 940 ? (isOpenSidebar ? "300px" : "60px") : "0px",
          transition: { duration: 0.3, type: "spring,", damping: 11 },
        }}
        style = {{position:"absolute"}}
      >
        {/* <HeaderStudent
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
          theme={theme}
          setTheme={setTheme}
          userid={id}
          userinfo={userinfo}
        /> */}
        <Header flag="noshow" />
        <PagesContainer allPagesInfo={allPagesInfo}/>
      </motion.main>
    </div>
  );
};

export default Sidebar;
