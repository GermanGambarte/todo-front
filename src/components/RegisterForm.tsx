import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { registerValidationsSchema } from '../utils/validations'

export type UserSubmitForm = {
	username: string
	email: string
	password: string
	confirmPassword: string
}
type Props = {
	onSubmit: (data: UserSubmitForm) => void
}
const RegisterForm = ({ onSubmit }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<UserSubmitForm>({
		resolver: yupResolver(registerValidationsSchema)
	})

	return (
		<>
			<h2>Register</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					<input
						autoComplete='off'
						placeholder='Nombre de usuario'
						type='text'
						{...register('username')}
					/>
					<span>{errors.username?.message}</span>
				</label>
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
				<label>
					<input
						autoComplete='off'
						{...register('confirmPassword')}
						placeholder='Confirmar contraseña'
						type='password'
					/>
					<span>{errors.confirmPassword?.message}</span>
				</label>
				<button type='submit'>Submit</button>
			</form>
		</>
	)
}

export default RegisterForm
