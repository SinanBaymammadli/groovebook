import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";

export default class ScaledImage extends Component {
  state = {
    width: 0,
    height: 0,
  };

  componentDidMount() {
    const { source, style } = this.props;

    Image.getSize(source.uri, (width, height) => {
      if (style.width && !style.height) {
        this.setState({
          width: style.width,
          height: height * (style.width / width),
        });
      } else if (!style.width && style.height) {
        this.setState({
          width: width * (style.height / height),
          height: style.height,
        });
      } else {
        this.setState({ width, height });
      }
    });
  }

  render() {
    const { width, height } = this.state;
    const { source, style } = this.props;

    return <Image source={source} style={[style, { height, width }]} />;
  }
}

ScaledImage.propTypes = {
  source: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }).isRequired,
  style: PropTypes.shape({}),
};

ScaledImage.defaultProps = {
  style: {
    width: 0,
    height: 0,
  },
};
