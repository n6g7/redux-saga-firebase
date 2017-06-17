import React, { PureComponent } from 'react';

import { Button } from './common';

class Footer extends PureComponent {
  render() {
    return <footer>
      <h2>Use it now</h2>

      <nav>
        <Button.GitHub />
        <Button.Docs />
      </nav>
    </footer>;
  }
}

Footer.propTypes = {};

export default Footer;
