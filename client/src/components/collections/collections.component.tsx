// import './titleBar.scss';
import * as React from 'react';
import './collections.style.scss';
import Box from '@mui/material/Box';
import { Header } from '../_main-components/header.component';
import AddIcon from '@mui/icons-material/Add';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomTabScroll from '../custom-components/scrollableTabs.component'

export class Collections extends React.Component<{}, {}>  {
  state = {
    value: 0
  }
  value: number = 0;
  defaultTabs: Array<string> = ['All Factions', 'Wishlist', 'Painting Queue'];
  userCollection: Array<{ name: string }> = [{ name: 'Slaanesh' }, { name: 'Khorne' }, { name: 'Nurgle' }, { name: 'Tzeentch' }, { name: 'Slaanesh' }, { name: 'Khorne' }, { name: 'Nurgle' }, { name: 'Tzeentch' }, { name: 'Slaanesh' }, { name: 'Khorne' }, { name: 'Nurgle' }, { name: 'Tzeentch' }, { name: 'Slaanesh' }, { name: 'Khorne' }, { name: 'Nurgle' }, { name: 'Tzeentch' }];
  uniqueProperties = function(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  setTab = (value: number) => {
    this.setState({
      value: value
    })
  }

  handleChange = (event: React.SyntheticEvent, newValue: number) => {
    this.setTab(newValue)
  };

  handleFactionChange = (event: React.SyntheticEvent, newValue: number) => {
    this.setTab(newValue + this.defaultTabs.length)
  };

  render() {
    return <Box sx={{ flexGrow: 1 }} className="box">
      <Header path={[{ name: 'My Collection', pathName: '/collections' }]} />
      <div className="tabGroup">
        <Tabs value={this.state.value >= this.defaultTabs.length ? null : this.state.value}
          onChange={this.handleChange} className="defaultTabs">
          {this.defaultTabs.map((tabName: string, index: number) => (
            <Tab label={tabName} {...this.uniqueProperties(index)} />
          ))}
        </Tabs>
        <hr className="vericalDivider" />
        <AddIcon className="fontColor addNew" />
        <Tabs value={this.state.value < this.defaultTabs.length ? null : (this.state.value - this.defaultTabs.length)}
          onChange={this.handleFactionChange} ScrollButtonComponent={CustomTabScroll}
          variant="scrollable" scrollButtons="auto">
          {this.userCollection.map((faction: { name: string }, index: number) => (
            <Tab label={faction.name} {...this.uniqueProperties(index)} />
          ))}
        </Tabs>
      </div>
    </Box>;
  }
}
