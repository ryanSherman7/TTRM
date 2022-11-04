import React from 'react';
import { TitleBar } from './titleBar';
import './App.scss';
import SideBar from './sideBar';

export default function App() {
  const [showSideBar, setShowSideBar] = React.useState(false)
  const hideSideBar = () => {
    setShowSideBar(!showSideBar)
  }

  return (
    <div className="App">
      <div className="header">
        <TitleBar title='TTRM' closeSideBar={hideSideBar} />
      </div>
      <div className="mainView">
        <div className="sideBarContainer">{showSideBar ? <SideBar /> : null}</div>
      </div>
    </div >
  );
}
