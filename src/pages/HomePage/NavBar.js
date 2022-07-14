import React from "react"
import "./NavBar.scss"
import { NavLink } from "react-router-dom"


const NavBar = () => {


    return (

        <div className="hamburger-menu">



            <div className="menu__box">
                <NavLink to={`/service-gym`} className="menu__item" >Dịch vụ</NavLink>
                <NavLink to={`/gym-center`} className="menu__item" >Cơ sở Gym</NavLink>
                <NavLink to={`/`} className="menu__item" >Gói dịch vụ</NavLink>
                <NavLink to={`/Personal-Training`} className="menu__item" >PT</NavLink>
                <NavLink to={`/login`} className="menu__item" >Đăng nhập</NavLink>

            </div>
        </div>

    )
}
export default NavBar
