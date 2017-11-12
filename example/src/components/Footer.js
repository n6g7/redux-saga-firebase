import React, { PureComponent } from 'react';

import { Button } from './common';

class Footer extends PureComponent {
  static propTypes = {};

  render() {
    return <footer>
      <h2>Use it now</h2>

      <nav>
        <Button.GitHub />
        <Button.Docs />
      </nav>

      <p className='disclaimer'>The content of this site is reset every 3 hours.</p>
    </footer>;
  }
}

export default Footer;
