import PropTypes from "prop-types";

export const TaskType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  checked: PropTypes.bool
});
