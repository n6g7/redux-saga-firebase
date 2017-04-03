import React, { PureComponent } from 'react';

import { Button } from './common';

class Header extends PureComponent {
  render() {
    return <header>
      <h1>redux-saga-firebase</h1>

      <p>
        <abbr title="redux-saga-firebase">RSF</abbr> is a <a href="https://redux-saga.github.io/redux-saga/" target="blank">redux-saga</a> implementation of the <a href="https://firebase.google.com/docs/reference/js/" target="blank">Firebase API</a>.
      </p>

      <p>
        Its aims to make every interaction with Firebase as simple as possible by exposing <a href="https://redux-saga.github.io/redux-saga/docs/api/index.html#callfn-args" target="blank"><code>call</code></a>-able methods and <a href="https://redux-saga.github.io/redux-saga/docs/api/index.html#channel" target="blank">channels</a>.
        It supports authentication, database operations, file storage, messaging and functions calls.
      </p>

      <p>
        Below is a collection of examples.
      </p>

      <nav>
        <Button.GitHub />
      </nav>
    </header>;
  }
}

Header.propTypes = {};

export default Header;
