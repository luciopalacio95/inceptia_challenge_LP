import React from 'react';

function Modal(props:{ isOpen:boolean, onClose: () => void, onAcept: () => void, title:string, children:any }) {
  if (!props.isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title">{props.title}</h6>
            <button type="button" className="close" onClick={props.onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {props.children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary mr-2" onClick={props.onClose}>Cerrar</button>
            <button type="button" className="btn btn-primary" style={{backgroundColor:"#00acea"}} onClick={props.onAcept}>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;