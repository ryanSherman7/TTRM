import './titleBar.style.scss';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export class TitleBar extends React.Component<{ title: string, closeSideBar: React.MouseEventHandler }, {}>  {
  render() {
    return <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="titleBar">
        <Toolbar>
          <IconButton
            onClick={this.props.closeSideBar}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <strong>{this.props.title}</strong>
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>;
  }
}
