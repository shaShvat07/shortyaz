import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

const Modal = ({ show, onClose, value }) => {
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? onClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [onClose]);

  if (!show) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
          <div className="flex justify-end">
            <button
              className="text-gray-600 hover:text-red-600"
              onClick={onClose}
            >
              <svg
                className="h-9 w-9 mb-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-center">
            <QRCode value={value} />
          </div>
          <br></br>
            <div> {value} </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-0 backdrop-blur-sm"></div>
    </>,
    document.body
  );
};

export default Modal;
