import { Typography } from '@mui/material';

import './typography.scss';
import { FC } from 'react';

interface HPrimaryProps {
	title: string;
	className?: string;
}

/**
 * Heading Primary
 * takes `title` prop and `className` prop for additional classNames
 * for additional styling
 */
export const HPrimary: FC<HPrimaryProps> = props => {
	return (
		<Typography
			variant="h1"
			className={`${props.className} heading-primary`}
		>
			{props.title}
		</Typography>
	);
};

interface HSecondaryProps {
	title: string;
	className?: string;
}

/**
 *  Heading Secondary
 *  takes `title` prop and `className` prop for additional classNames
 *  for additional styling
 */
export const HSecondary: FC<HSecondaryProps> = props => {
	return (
		<Typography
			variant="h2"
			className={`${props.className} heading-secondary`}
		>
			{props.title}
		</Typography>
	);
};

interface SPrimaryProps {
	title: string;
	className?: string;
}

/**
 * Para Primary
 * takes `title` prop and `className` prop for additional classNames
 * for additional styling
 */
export const SPrimary: FC<SPrimaryProps> = props => {
	return (
		<Typography
			variant="subtitle1"
			className={`${props.className} subtitle-primary`}
			component="p"
		>
			{props.title}
		</Typography>
	);
};

interface SSecondaryProps {
	title: string;
	className?: string;
}

/**
 * Para Secondary
 * takes `title` prop and `className` prop for additional classNames
 * for additional styling
 */
export const SSecondary: FC<SSecondaryProps> = props => {
	return (
		<Typography
			variant="subtitle2"
			className={`${props.className} subtitle-secondary`}
			component="p"
		>
			{props.title}
		</Typography>
	);
};
