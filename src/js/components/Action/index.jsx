import React, { PureComponent } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import styles from "./index.module.scss";

class Action extends PureComponent {
  render() {
    const { title, status, onClick } = this.props;
    return (
      <span
        onClick={onClick}
        className={classnames(
          styles.action,
          status && styles[`action__${status}`]
        )}
      >
        {title}
      </span>
    );
  }
}

Action.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string,
  onClick: PropTypes.func
};

Action.defaultProps = {
  title: "",
  status: "normal",
  onClick: () => Promise.resolve()
};

export default Action;
