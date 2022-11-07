import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

SearchTerm.propTypes = {
  onSubmit: PropTypes.func,
};

SearchTerm.defaultProps = {
  onSubmit: null,
};

function SearchTerm(props) {
  const { onSubmit } = props;
  const [searchTerm, setsearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);

  function handleSearchTermChange(e) {
    const value = e.target.value;
    setsearchTerm(value);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };
      onSubmit(formValues);
    }, 500);
  }

  return (
    <form style={{ marginLeft: -40 }}>
      <label> Search </label>
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
    </form>
  );
}

export default SearchTerm;
