import React from 'react';

function ButtonJoker(props) {
  return (
    <a
      onClick={props.sendData}
      className="modal-close waves-effect waves-red btn-flat"
    >
      Adicionar
    </a>
  );
}

export default ButtonJoker;
