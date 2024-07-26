import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../api/apiConfig'

export default function Register() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errors, setError] = useState({});
    
    const first_name = useRef()
    const last_name = useRef()
    const email = useRef()
    const password = useRef()
    const password2 = useRef(undefined)
    const address = useRef()

    async function onSubmitForm(event) {
        event.preventDefault()
        const data = {
            first_name: first_name.current.value,
            last_name: last_name.current.value,
            email: email.current.value,
            password: password.current.value,
            password2: password2.current.value,
            address: address.current.value
          };

        setLoading(true)

        try {
            const response = await axiosInstance.post('auth/register', JSON.stringify(data))

            setLoading(false)
            navigate('/auth/login')
        } catch (error) {
            setLoading(false)
            setError(error.response ? error.response.data.message : 'Something went wrong. Please try again.');
        }
    }

    return (
        <div className='container'>
            <h2>Register</h2>
            <form onSubmit={onSubmitForm}>
                <div className="mb-3">
                    <input type="text" placeholder='First Name' autoComplete='off' className='form-control' id='first_name' ref={first_name} />
                    {errors.first_name && <div className="invalid-feedback">{errors.first_name[0]}</div>}
                </div>
                <div className="mb-3">
                    <input type="text" placeholder='Last Name' autoComplete='off' className='form-control' id='last_name' ref={last_name} />
                    {errors.last_name && <div className="invalid-feedback">{errors.last_name[0]}</div>}
                </div>
                <div className="mb-3">
                    <input type="email" placeholder='Email' autoComplete='off' className='form-control' id="email" ref={email} />
                    {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Password' autoComplete='off' className='form-control' id="password" ref={password} />
                    {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Confirm Password' autoComplete='off' className='form-control' id="passwordConfirmation" ref={password2} />

                </div>
                <div className="mb-3">
                    <input type="text" placeholder='Ethereum wallet address' autoComplete='off' className='form-control' id="passwordConfirmation" ref={address} />
                    {errors.address && <div className="invalid-feedback">{errors.address[0]}</div>}
                </div>
                <div className="mb-3">
                    <button disabled={loading} className='btn btn-success' type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}