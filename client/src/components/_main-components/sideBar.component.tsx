// import './titleBar.scss';
import * as React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import './sideBar.style.scss';
import { useLocation } from 'react-router-dom'
import Collapse from '@mui/material/Collapse';


export default function SideBar() {
  const userFactions: Array<string> = ['test', 'test2', 'test3'];
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  function GetRoute(): string {
    const location = useLocation();
    return location.pathname;
  }

  function showDropDown(text: string): boolean {
    const dropDownRoutes = ['My Collection'];
    return (dropDownRoutes.indexOf(text) > -1)
  }

  function renderListNames() {
    return (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {userFactions.map((text, index) => (
            <ListItem key={text} disablePadding className="nestedNav">
              <ListItemButton>
                <ListItemIcon>
                  {/* {getRoute() === '/' ? renderListNames() : null} */}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    );
  }

  return (
    <div className="sideBar">
      <List>
        {['Messages', 'My Collection', 'List Workshop', 'Market'].map((text, index) => (
          <React.Fragment>
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary={text} />
                {showDropDown(text) ? (open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />) : null}
              </ListItemButton>
            </ListItem>
            {GetRoute() === '/' && text === 'My Collection' ? renderListNames() : null}
          </React.Fragment>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}