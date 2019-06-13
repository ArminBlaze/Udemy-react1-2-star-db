import React from 'react';
import PropTypes from 'prop-types';

import './Row.css';

//создаём компонент-контейнер
//он отрисовывает в колонках полученные аргументы, даже если это реакт-элементы
const Row = ({ leftColumn, rightColumn }) => {
  return (
    <div className="row mb2 Row">
        <div className="col-md-6">
          { leftColumn }
        </div>
        <div className="col-md-6">
          { rightColumn }
        </div>
      </div>
  )
}

Row.propTypes = {
  leftColumn: PropTypes.node,
  rightColumn: PropTypes.node,
}

export default Row;