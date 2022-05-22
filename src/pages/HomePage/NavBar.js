import React from "react"
import "./NavBar.scss"


const NavBar = () => {


    return (

        <div className="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label className="menu__btn" for="menu__toggle">
                <span></span>
            </label>

            <ul className="menu__box">
                <li><a className="menu__item" >Dịch vụ</a></li>
                <li><a className="menu__item" >Cơ sở Gym</a></li>
                <li><a className="menu__item" >Gói dịch vụ</a></li>
                <li><a className="menu__item" >PT</a></li>
                <li><a className="menu__item" >Đăng nhập</a></li>

            </ul>
        </div>

    )
}
export default NavBar
