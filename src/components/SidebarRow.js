import React from 'react'
import {Avatar} from "@material-ui/core";
import "./SidebarRow.css"
import userImage from "../images/wal-1.jpg";

const SidebarRow = ({src,Icon,title}) => {
    return (
        <div className="sidebarRow">
            {src && <Avatar src={src} className="sidebar__avatar"/>}
            {Icon && <Icon />}

            <p>{title}</p>
        </div>
    )
}

export default SidebarRow
