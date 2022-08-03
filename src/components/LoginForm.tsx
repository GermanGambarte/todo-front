import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { loginValidationsSchema } from '../utils/validations'

export type UserLoginForm = {
	email: string
	password: string
}
type Props = {
	onSubmit: (data: UserLoginForm) => void
}
const LoginForm = ({ onSubmit }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<UserLoginForm>({
		resolver: yupResolver(loginValidationsSchema)
	})

	return (
		<>
			<h2>Login</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					<input
						autoComplete='off'
						placeholder='Correo electrónico'
						type='email'
						{...register('email')}
					/>
					<span>{errors.email?.message}</span>
				</label>
				<label>
					<input
						autoComplete='off'
						placeholder='Ingrese una contraseña'
						type='password'
						{...register('password')}
					/>
					<span>{errors.password?.message}</span>
				</label>
				<button type='submit'>Submit</button>
			</form>
		</>
	)
}

export default LoginForm
