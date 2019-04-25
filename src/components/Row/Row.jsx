import React from 'react';

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

export default Row;