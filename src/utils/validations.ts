import * as Yup from 'yup'

const loginValidationsSchema = Yup.object().shape({
	email: Yup.string()
		.required('Este campo es requerido.')
		.matches(
			/^[\w.]+@([\w]+\.)+[a-z]{2,4}$/,
			'El correo ingresado no tiene un formato válido.'
		),
	password: Yup.string()
		.required('Este campo es requerido.')
		.min(8, 'La contraseña debe tener al menos 8 caracteres.')
})
const registerValidationsSchema = Yup.object().shape({
	username: Yup.string()
		.required('Este campo es requerido.')
		.min(4, 'El nombre de usuario debe tener al menos 4 caracteres.')
		.max(25, 'El nombre de usuario debe tener como máximo 25 caracteres.')
		.matches(
			/^(?![0-9._])(?!._)(?!.*_\d)[a-zA-Z0-9_]+$/,
			'Debe comenzar con una letra y solo puede contener letras,números y "_".'
		),
	email: Yup.string()
		.required('Este campo es requerido.')
		.matches(
			/^[\w.]+@([\w]+\.)+[\w]{2,4}$/,
			'El correo ingresado no tiene un formato válido.'
		),
	password: Yup.string()
		.required('Este campo es requerido.')
		.min(8, 'La contraseña debe tener al menos 8 caracteres.')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])\D*\d/,
			'La constraseña debe contener como mínimo una minúscula, una mayúscula y un número.'
		),
	confirmPassword: Yup.string()
		.required('Este campo es requerido.')
		.oneOf([Yup.ref('password'), null], 'La contraseña no coincide.')
})

export { registerValidationsSchema, loginValidationsSchema }
