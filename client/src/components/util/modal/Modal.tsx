import ModalFromMui from '@mui/material/Modal/Modal';
import { FC } from 'react';

import './modal.scss';

interface ModalProps {
	children: string | JSX.Element;
	open: boolean;
	onClose?(): any;
	className: string;
}

/**
 * Modal component
 *
 * `children` children
 *
 * `open` open state if `true` modal will open otherwise it will be closed
 *
 * `onClose` this function will run when clicked on body outside modal
 *
 * `className` additional classNames for extra styling
 */
const Modal: FC<ModalProps> = props => {
	return (
		<ModalFromMui
			className="modal"
			open={props.open}
			onClose={props.onClose}
		>
			<div className={`modal__content ${props.className}`}>
				{props.children}
			</div>
		</ModalFromMui>
	);
};

export default Modal;
