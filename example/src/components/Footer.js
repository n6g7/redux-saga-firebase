import React, { PureComponent } from 'react';

import { Button } from './common';

class Footer extends PureComponent {
  render() {
    return <footer>
      <h2>Use it now</h2>

      <Button.GitHub />
    </footer>;
  }
}

Footer.propTypes = {};

export default Footer;
