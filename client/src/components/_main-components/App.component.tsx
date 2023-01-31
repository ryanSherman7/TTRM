import React from 'react';
import { TitleBar } from './titleBar.component';
import './App.style.scss';
import SideBar from './sideBar.component';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Collections } from '../collections/collections.component';

export default function App() {
  const [showSideBar, setShowSideBar] = React.useState(false)
  const hideSideBar = () => {
    setShowSideBar(!showSideBar)
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <div className="header">
          <TitleBar title='TTRM' closeSideBar={hideSideBar} />
        </div>
        <div className="mainView">
          <BrowserRouter>
            <div className="sideBarContainer">{showSideBar ? <SideBar /> : null}</div>
            <Collections />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </div >
  );
}
