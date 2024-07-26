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
    const eth_wallet = useRef()

    async function onSubmitForm(event) {
        event.preventDefault()
        let valid = true
        const data = {
            first_name: first_name.current.value,
            last_name: last_name.current.value,
            email: email.current.value,
            password: password.current.value,
            password2: password2.current.value,
            eth_wallet: eth_wallet.current.value
          };
        const error = {}
        if(first_name.current.value === null || first_name.current.value === '') {
            error['first_name'] = ["First Name is Required"]
            valid = false
        } 
        if(last_name.current.value === null || last_name.current.value === '') {
            error['last_name'] = ["Last Name is Required"]
            valid = false
        }
        if(email.current.value === null || email.current.value === '' ) {
            error['email'] = ["Email is Required"]
            valid = false
        }  
        if(password.current.value === null || password.current.value === '') {
            error['password'] = ["Password is Required"]
            valid = false
        }
        if(password2.current.value !== password.current.value) {
            error['password2'] = ["Password must be match"]
            valid = false
        }
        if(eth_wallet.current.value === null || eth_wallet.current.value === '') {
            error['eth_wallet'] = ["ETH Address is Required"]
            valid = false
        } else if(!(/^0x[a-fA-F0-9]{40}$/.test(eth_wallet.current.value))) {
            error['eth_wallet'] = ["ETH Address is must be valid"]
            valid = false
        }
        setError(error)
        if(valid) {
            setLoading(true)
            try {
                const response = await axiosInstance.post('auth/register', JSON.stringify(data))
                setLoading(false)
                navigate('/auth/login')
            } catch (error) {
                setLoading(false)
                setError(error.response ? error.response.data : 'Something went wrong. Please try again.');
            }
        }
    }
    
    return (
        <div className='container'>
            <h2>Register</h2>
            <form onSubmit={onSubmitForm}>
                <div className="mb-3">
                    <input type="text" placeholder='First Name' autoComplete='off' className='form-control' id='first_name' ref={first_name} />
                    {errors.first_name && <div className="invalid-feedback" style={{display: 'block'}}>{errors.first_name[0]}</div>}
                </div>
                <div className="mb-3">
                    <input type="text" placeholder='Last Name' autoComplete='off' className='form-control' id='last_name' ref={last_name} />
                    {errors.last_name && <div className="invalid-feedback" style={{display: 'block'}}>{errors.last_name[0]}</div>}
                </div>
                <div className="mb-3">
                    <input type="email" placeholder='Email' autoComplete='off' className='form-control' id="email" ref={email} />
                    {errors.email && <div className="invalid-feedback" style={{display: 'block'}}>{errors.email[0]}</div>}
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Password' autoComplete='off' className='form-control' id="password" ref={password} />
                    {errors.password && <div className="invalid-feedback" style={{display: 'block'}}>{errors.password[0]}</div>}
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Confirm Password' autoComplete='off' className='form-control' id="passwordConfirmation" ref={password2} />
                    {errors.password2 && <div className="invalid-feedback" style={{display: 'block'}}>{errors.password2[0]}</div>}
                </div>
                <div className="mb-3">
                    <input type="text" placeholder='ETH Wallet Address' autoComplete='off' className='form-control' id="passwordConfirmation" ref={eth_wallet} />
                    {errors.eth_wallet && <div className="invalid-feedback"  style={{display: 'block'}}>{errors.eth_wallet[0]}</div>}
                </div>
                <div className="mb-3">
                    <button disabled={loading} className='btn btn-success' type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}