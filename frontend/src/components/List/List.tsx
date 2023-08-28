import React, { useState, createElement, useEffect } from "react";
import MuiList from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { MenuListItem } from "../../app/interfaces";
import { useNavigate, useLocation } from "react-router-dom";
import blueGrey from "@mui/material/colors/blueGrey";

interface ListProps {
  name: string;
  list: Array<MenuListItem>;
  style?: object;
}

const List: React.FC<ListProps> = ({ name, list, style }: ListProps) => {
  const [activeItem, setActiveItem] = useState<string>("all");
  const navigate = useNavigate();
  let location = useLocation();

  const handleMenuClick = (key: string) => {
    setActiveItem(key)
    navigate(`/tasks/${key}`, { replace: true });
  };

  useEffect(() => {
    const pathSegments = location.pathname.split("/"); 
    const lastPathSegment = pathSegments[pathSegments.length - 1]; 
    setActiveItem(lastPathSegment); 
  }, [setActiveItem, location]);

  return (
    <MuiList style={style}>
      {list.map(({ title, key, icon }) => (
        <ListItem key={key} disablePadding selected={activeItem === key}>
          {name === "sidebar" ? (
            <Tooltip title={title} placement="right">
              <ListItemButton
                disableRipple
                sx={{ display: "block", "&:hover": { background: "none" } }}
              >
                <ListItemIcon sx={{ color: blueGrey[50] }}>
                  {createElement(icon)}
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          ) : (
            <ListItemButton onClick={() => handleMenuClick(key)}>
              <ListItemIcon sx={{ minWidth: "auto", mr: 2 }}>
                {createElement(icon, { fontSize: "small" } as object)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontSize: 13 }}>
                    {title}
                  </Typography>
                  
                }
              />
                {/* <Link to={`tasks/${key}`}>{title}</Link> */}

            </ListItemButton>
          )}
        </ListItem>
      ))}
    </MuiList>
  );
};

export default List;
