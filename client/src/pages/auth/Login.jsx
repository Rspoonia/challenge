import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { axiosInstance } from '../../api/apiConfig'
import useAuth from '../../hooks/useAuth'

export default function Login() {

    const { setAccessToken, setCSRFToken, setIsLoggedIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const fromLocation = location?.state?.from?.pathname || '/'
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setError] = useState({})
    function onEmailChange(event) {
        setEmail(event.target.value)
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    async function onSubmitForm(event) {
        event.preventDefault()
        let valid = true
        const error = {}
        if(email === '') {
            error['email'] = ['Email Field is mandatory']
            valid = false
        }
        if(password === '') {
            error['password'] = ['Password is mandatory']
            valid = false
        }
        setError(error)
        if(valid) {
            setLoading(true)
            try {
                const {data, headers} = await axiosInstance.post('auth/login', JSON.stringify({
                    email,
                    password
                })) ?? {access_token: ''}
                localStorage.setItem('access-token', data?.access_token)
                localStorage.setItem('refresh_token', data.refresh_token)
                setAccessToken(data?.access_token)
                setCSRFToken(headers["x-csrftoken"])
                setIsLoggedIn(true);
                setEmail()
                setPassword()
                setLoading(false)
                
                navigate('/hello_world')
                // navigate(fromLocation, { replace: true })
            } catch (error) {
                console.log("=============", error.response.data)
                setLoading(false)
                setError(error.response.data)
            }
        }
    }

    return (
        <div className='container'>
            <h2>Login</h2>
            <form onSubmit={onSubmitForm}>
                <div className="mb-3">
                    <input type="email" placeholder='Email' autoComplete='off' className='form-control' id="email" onChange={onEmailChange} />
                    {errors.email && <div className="invalid-feedback" style={{display: 'block'}}>{errors.email[0]}</div>}
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Password' autoComplete='off' className='form-control' id="password" onChange={onPasswordChange} />
                    {errors.password && <div className="invalid-feedback" style={{display: 'block'}}>{errors.password[0]}</div>}
                </div>
                <div className="mb-3">
                    {errors.detail && <div className="invalid-feedback" style={{display: 'block'}}>{errors.detail}</div>}
                    <button disabled={loading} className='btn btn-success' type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}
