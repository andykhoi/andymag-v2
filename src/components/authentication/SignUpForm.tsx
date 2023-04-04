import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { SignUpCreateParams, SignUpResource, CodeVerificationAttemptParam, ClerkAPIError } from '@clerk/types'
import { Spinner } from '../Spinner'
import { setAuthMode } from './Authenticate'
import { useRouter } from 'next/router'

export const SignUpForm: FC = () => {
	const router = useRouter()

	const { isLoaded, signUp, setActive } = useSignUp()

	const [emailAddress, setEmailAddress] = useState<string>('')
	const [emailAddressError, setEmailAddressError] = useState<string>('')
	
	const [password, setPassword] = useState<string>('')
	const [passwordError, setPasswordError] = useState<string>('')

	const [name, setName] = useState<string>('')
	const [nameError, setNameError] = useState<string>('')

	const [username, setUsername] = useState<string>('')
	const [usernameError, setUsernameError] = useState<string>('')

	const [code, setCode] = useState<string>('')
	const [codeError, setCodeError] = useState<string>('')

	const [clerkError, setClerkError] = useState<string>('')

	const [loading, setLoading] = useState<boolean>(false)
	const [stage, setStage] = useState<'credentials' | 'verification'>('credentials')

	const extractParams = () => {
		const params: SignUpCreateParams = {}
		params.emailAddress = emailAddress
		params.firstName = name?.split(' ')[0]
		params.lastName = name?.split(' ')[1]
		params.username = username
		params.password = password
		return params
	}

	const validateInputs = (): {
		name: string
		emailAddress: string
		username: string
		password: string
	} | null => {
		// let valid = true
		let errors: {
			name: string
			emailAddress: string
			username: string
			password: string
		} = {
			name: '',
			emailAddress: '',
			username: '',
			password: '',
		}
		
		if (name?.split(' ').length !== 2) {
			errors.name = 'Please provide a first and last name'
			// setNameError(() => 'Please provide a first and last name')
			// valid = false
		}

		const regex = /^[a-zA-Z0-9_-]+$/
		if (!regex.test(username)) {
			errors.username = 'Username can only contains letters, numbers and \'_\' or \'-\''
		}

		let valid = true;
		let key: keyof typeof errors
		for (key in errors) {
			if (errors[key]) {
				valid = false
			}
		}
		return valid ? null : errors
		// return valid
	}

	
	const trySignUpWithCredentials = async (params: SignUpCreateParams): Promise<[undefined | SignUpResource, ClerkAPIError[] | null]> => {
		try {
			const signUpWithCredentials = await signUp?.create(params)

			return [signUpWithCredentials, null]
		} catch (e: any) {
			// setClerkError(e)
			return [signUp, e.errors as ClerkAPIError[]]
		}
	}

	const trySendingVerificationEmail = async (signUpInstance: SignUpResource): Promise<[undefined | SignUpResource, ClerkAPIError[] | null]> => {
		try {
			const sendingVerificationEmail = await signUpInstance.prepareEmailAddressVerification()
			return [sendingVerificationEmail, null]

		} catch (e: any) {
			return [signUp, e.errors as ClerkAPIError[]]
		}
	}

	const continueHandler = async (e: FormEvent) => {
		e.preventDefault()
		if (!isLoaded || loading || !signUp) return 
		
		setLoading(() => true)

		const inputErrors = validateInputs()
		if (inputErrors) {
			for (const field in inputErrors) {
				if (field === 'name') {
					setNameError(() => inputErrors[field])
				} else if (field === 'username') {
					setUsernameError(() => inputErrors[field])
				} else if (field === 'emailAddress') {
					setEmailAddressError(() => inputErrors[field])
				} else if (field === 'password') {
					setPasswordError(() => inputErrors[field])
				}
			}
			setLoading(() => false)
			return
		}

		const params = extractParams()
		const [signUpWithCredentials, clerkParamErrors] = await trySignUpWithCredentials(params)
		
		if (clerkParamErrors) {
			clerkParamErrors.forEach(({ 
				message,
				meta
			} ) => {
				if (meta?.paramName === 'username') {
					setUsernameError(() => message)
				} else if (meta?.paramName === 'last_name') {
					setNameError(() => message)
				} else if (meta?.paramName === 'first_name') {
					setNameError(() => message)
				} else if (meta?.paramName === 'password') {
					setPasswordError(() => message)
				} else if (meta?.paramName === 'email_address') {
					setEmailAddressError(() => message)
				}
			})
			setLoading(() => false)
			return
		}
		
		const [sendingVerificationEmail, clerkEmailErrors] = signUpWithCredentials ? await trySendingVerificationEmail(signUpWithCredentials) : [undefined, null]
		if (clerkEmailErrors || !sendingVerificationEmail || !sendingVerificationEmail?.verifications.emailAddress.status) {
			setClerkError(() => 'Please try again.')
			setLoading(() => false)
			return
		}

		setStage(() => 'verification')
		setLoading(() => false)
	}

	const tryVerifyingEmail = async (params: CodeVerificationAttemptParam): Promise<[undefined | SignUpResource, ClerkAPIError[] | null]> => {
		if (!signUp) return [undefined, null]

		try {
			const verifyingEmail = await signUp.attemptEmailAddressVerification(params)
			if (verifyingEmail.verifications.emailAddress.error) {
				return [verifyingEmail, [verifyingEmail.verifications.emailAddress.error]]
			}

			return [verifyingEmail, null]
		} catch (e: any) {
			return [signUp, e.errors as ClerkAPIError[]]
		}
	}

	const verificationHandler = async (e: FormEvent) => {
		e.preventDefault()
		if (!isLoaded || loading || !signUp || stage !== 'verification') return 
		
		setLoading(() => true)
		const [verifyingEmail, clerkVerifyingErrors] = await tryVerifyingEmail({ code })
		if (clerkVerifyingErrors) {
			setClerkError(() => clerkVerifyingErrors.map(err => err.message).join(', '))
			setLoading(() => false)
			return
		}


		// at this point the sign up should be complete
		if (verifyingEmail && verifyingEmail.status === 'complete') {
			setActive({ session: verifyingEmail.createdSessionId })
			setAuthMode(null, router)
		}
	
		setLoading(() => false)
	}

	return (
		<div>
			{
				stage === 'credentials' &&
				<>
					<form onSubmit={continueHandler}>
						<div>
							<input
								placeholder='First and last name'
								type='text' value={name}
								// onFocus={() => setNameError(() => '')}
								onChange={e => {
									setName(e.target.value)
									setNameError(() => '')
								}}

								required
							/>
							{ nameError && <p>{nameError}</p> }
						</div>
						<div>
							<input
								placeholder='Username'
								type='text'
								value={username}
								// onFocus={() => setUsernameError(() => '')}
								onChange={e => {
									setUsername(e.target.value)
									setUsernameError(() => '')
								}}
								required
							/>
							{ usernameError && <p>{usernameError}</p> }
						</div>
						<div>
							<input
								placeholder='Email'
								type='email'
								value={emailAddress}
								// onFocus={() => setEmailAddressError(() => '')}
								onChange={e => {
									setEmailAddress(e.target.value)
									setEmailAddressError(() => '')
								}}
								required
							/>
							{ emailAddressError && <p>{emailAddressError}</p> }
						</div>
						<div>
							<input
								placeholder='Password'
								type='password'
								value={password}
								// onFocus={() => setPasswordError(() => '')}
								onChange={e => {
									setPassword(e.target.value)
									setPasswordError(() => '')
								}}
								required
							/>
							{ passwordError && <p>{passwordError}</p> }
						</div>
						<button type='submit'>
							<div>
								{ loading ?  <Spinner /> : 'Continue' }
							</div>
						</button>
					</form>
					<style jsx>{`
						input {
							display: flex;
							flex-direction: column;
						}
					`}</style>
				</>
			}
			{
				stage === 'verification' && 
				<>
					<form onSubmit={verificationHandler}>
						<div>
							<input
								placeholder='Verification Code'
								type='text'
								value={code}
								onFocus={() => setCodeError(() => '')}
								onChange={e => setCode(e.target.value)}
								required
							/>
							{ codeError && <p>{codeError}</p> }
						</div>
						<button type='submit'>
							<div>
								{ loading ?  <Spinner /> : 'Verify' }
							</div>
						</button>
					</form>
				</>
			}
		</div>

	)
}