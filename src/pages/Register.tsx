import { useRef, useState, useEffect, FormEvent } from 'react'

const USER_REGEX = /^[a-zA-z][a-zA-z0-9_]{3,23}$/
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{7,24}$/
const EMAIL_REGEX = /^[\w.]+@([\w]+\.)+[\w]{2,4}$/
const Register = () => {
	const usernameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	// const errRef = useRef(null)

	const [username, setUser] = useState('')
	const [validUsername, setValidUsername] = useState(false)
	const [usernameFocus, setUserFocus] = useState(false)

	const [email, setEmail] = useState('')
	const [validEmail, setValidEmail] = useState(false)
	const [emailFocus, setEmailFocus] = useState(false)

	const [password, setPassword] = useState('')
	const [validPassword, setValidPassword] = useState(false)
	const [passwordFocus, setPasswordFocus] = useState(false)

	const [matchPassword, setMatchPassword] = useState('')
	const [validMatch, setValidMatch] = useState(false)
	const [matchFocus, setMatchFocus] = useState(false)

	const [errMsg, setErrMsg] = useState('')
	const [success, setSuccess] = useState(false)

	useEffect(() => {
		usernameRef.current!.focus()
	}, [])
	useEffect(() => {
		setValidUsername(USER_REGEX.test(username))
	}, [username])
	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email))
	}, [email])
	useEffect(() => {
		setValidPassword(PASS_REGEX.test(password))
		setValidMatch(password === matchPassword)
	}, [password, matchPassword])
	// useEffect(() => {
	// 	setErrMsg('')
	// 	console.log(5)
	// }, [username, password, matchPassword])
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// const valUsername = USER_REGEX.test(username)
		// const valEmail = EMAIL_REGEX.test(email)
		// const valPassword = PASS_REGEX.test(password)

		// if (!valUsername || !valEmail || !valPassword) {
		// return setErrMsg('invalid Entry')
		// 	return console.log('paso algo')
		// }
		// setSuccess(true)
		// const payload = { username, password, email }

		// console.log(payload)

		fetch('http://localhost:5000/register', {
			method: 'POST',
			body: JSON.stringify({ username, password, email }),
			headers: { 'Content-type': 'application/json' }
		})
			.then(response => response.json())
			.then(json => console.log(json))
			.catch(err => console.log(err))
	}

	// console.log({ password, validPassword })

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={e => handleSubmit(e)}>
				<input
					ref={usernameRef}
					required
					aria-describedby='usernamedesc'
					aria-invalid={validUsername ? 'false' : 'true'}
					autoComplete='off'
					placeholder='Nombre de usuario'
					type='text'
					onBlur={() => setUserFocus(false)}
					onChange={e => setUser(e.target.value)}
					onFocus={() => setUserFocus(true)}
				/>
				<p
					className={
						usernameFocus && username && !validUsername
							? 'instructions'
							: 'offScreen'
					}
					id='usernamedesc'>
					El nombre de usuario debe ser de mínimo 4 caracteres. Debe comenzar
					con una letra. Se permiten letras, numeros y _. No se permiten
					espacios.
				</p>
				<input
					ref={emailRef}
					required
					aria-describedby='emaildesc'
					aria-invalid={validEmail ? 'false' : 'true'}
					autoComplete='off'
					id='email'
					placeholder='Correo electrónico'
					type='email'
					onBlur={() => setEmailFocus(false)}
					onChange={e => setEmail(e.target.value)}
					onFocus={() => setEmailFocus(true)}
				/>
				<p
					className={emailFocus && !validEmail ? 'instructions' : 'offScreen'}
					id='emaildesc'>
					El correo electrónico debe tener un formato válido.
				</p>
				<input
					required
					aria-describedby='passdesc'
					aria-invalid={validPassword ? 'false' : 'true'}
					placeholder='Contraseña'
					type='password'
					onBlur={() => setPasswordFocus(false)}
					onChange={e => setPassword(e.target.value)}
					onFocus={() => setPasswordFocus(true)}
				/>
				<p
					className={
						passwordFocus && !validPassword ? 'instructions' : 'offScreen'
					}
					id='passdesc'>
					La contraseña debe tener mínimo 8 caracteres. Debe contener al menos
					una mayúscula, un numero y un carácter especial (!, @, #, $, %).
				</p>
				<input
					required
					aria-describedby='confpassdesc'
					aria-invalid={validPassword ? 'false' : 'true'}
					placeholder='Repite la contraseña'
					type='password'
					onBlur={() => setMatchFocus(false)}
					onChange={e => setMatchPassword(e.target.value)}
					onFocus={() => setMatchFocus(true)}
				/>
				<p
					className={matchFocus && !validMatch ? 'instructions' : 'offScreen'}
					id='confpassdesc'>
					La contraseña debe ser igual a la ingresada anteriormente
				</p>
				<button
					disabled={
						!!(
							!validUsername ||
							!validUsername ||
							!validPassword ||
							!validMatch
						)
					}>
					Submit
				</button>
				{success ?? <p>Succes</p>}
				{errMsg !== '' ?? <p>{errMsg}</p>}
			</form>
		</div>
	)
}

export default Register
