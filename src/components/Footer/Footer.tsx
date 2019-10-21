import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Footer.scss';

const Footer: React.FC = () => (
  <footer className="footer">
    <span className="content">
      <Typography variant="caption" gutterBottom>
      a
        {' '}
        <a
          href="https://jamesjarvis.io"
          target="_blank"
          rel="noopener"
        >
          James Jarvis
          {' '}
        </a>
        {' '}
      project
      </Typography>
    </span>
  </footer>
);

export default Footer;
