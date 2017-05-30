
import React                            from 'react';
import PropTypes                        from 'prop-types';

export default class HTML extends React.Component {

  render() {
    const {bundle} = this.props;
    return (
      <html>
        <head>
          <meta charset='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='description' content='Some text herey' />
          <title>Project title</title>
          {bundle.env === 'production' ? (<link rel='stylesheet' href={bundle.stylesheet} />) : null}
        </head>
        <body>
          <div id='react-view-root' />
          {bundle.env === 'production' ? (<script src={bundle.commons} />) : null}
          <script src={bundle.core} />
        </body>
      </html>
    );
  }
}

HTML.propTypes = {
  bundle: PropTypes.object.isRequired
};
