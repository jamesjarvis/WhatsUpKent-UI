import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './Header.scss';

const Header: React.FC = () => (
  <AppBar position="static" className="header">
    <Toolbar className="toolbar">
      <Typography variant="h6" className="title">
            WhatsUpKent
      </Typography>
      <Tooltip title="View on GitHub" placement="left">
        <IconButton
          href="https://github.com/jamesjarvis/WhatsUpKent-UI"
          target="_blank"
          rel="noopener"
        >
          <GitHubIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  </AppBar>
);
export default Header;
