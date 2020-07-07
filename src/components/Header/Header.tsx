import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import MenuIcon from '@material-ui/icons/Menu';
import ExploreIcon from '@material-ui/icons/Explore';
import TodayIcon from '@material-ui/icons/Today';
import React, { useState } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import './Header.scss';

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef<
    HTMLAnchorElement,
    Omit<RouterLinkProps, 'innerRef' | 'to'>
    >((itemProps, ref) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <RouterLink to={to} {...itemProps} innerRef={ref} />
    )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (drawerOpen: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown'
      && ((event as React.KeyboardEvent).key === 'Tab'
        || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(drawerOpen);
  };
  return (
    <>
      <AppBar position="static" className="header">
        <Toolbar className="toolbar">
          <span className="mainText">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="title">
              WhatsUpKent
            </Typography>
          </span>
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
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <List>
          <ListItemLink to="/" primary="All Events" icon={<TodayIcon />} />
          <ListItemLink
            to="/rooms"
            primary="Free Room Finder"
            icon={<MeetingRoomIcon />}
          />
          <ListItemLink
            to="/map"
            primary="Event Map"
            icon={<ExploreIcon />}
          />
        </List>
      </Drawer>
    </>
  );
};
export default Header;
