import Form from '../pages/signup/Signup';

const Signup = ({ setAuthFormSubmit }) => {
	return (
		<main>
			<Form setAuthFormSubmit={setAuthFormSubmit} />
		</main>
	);
};

export default Signup;
