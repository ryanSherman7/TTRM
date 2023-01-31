import './header.style.scss';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import SettingsIcon from '@mui/icons-material/Settings';

export class Header extends React.Component<{ path: Array<{ name: string, pathName: string }> }, {}>  {
  constructor(props: any) {
    super(props);
    console.log(props)
  }
  render() {
    return <div>
      <div className="componentHeader">
        <div className="column bottom">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              <strong>TTRM</strong>
            </Link>
            {
              this.props.path.map(
                (route: { name: string, pathName: string }, index: number) => (
                  index === this.props.path.length - 1 ?
                    <Typography color="text.primary">{route.name}</Typography> :
                    <strong><Link underline="hover" color="inherit" href={route.pathName}>{route.name}</Link></strong>
                )
              )
            }
          </Breadcrumbs>
        </div>
        <div className="column title">
          {this.props.path[this.props.path.length - 1].name}
        </div>
        <div className="column settings bottom">
          <SettingsIcon />
        </div>
      </div>
      <hr />
    </div>
  }
}
