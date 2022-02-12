import propTypes from 'prop-types';
import ModalFromMui from '@mui/material/Modal/Modal';

import './modal.scss';

/**
 * Modal component
 * @param {string} children children
 * @returns {JSX.Element}
 */
const Modal = ({ children, open, onClose, className }) => {
	return (
		<ModalFromMui className="modal" open={open} onClose={onClose}>
			<div className={`modal__content ${className}`}>{children}</div>
		</ModalFromMui>
	);
};

Modal.propTypes = {
	children: propTypes.node.isRequired,
	open: propTypes.bool.isRequired,
	onClose: propTypes.func,
	className: propTypes.string,
};

export default Modal;
