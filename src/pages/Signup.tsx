import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/pages/login.css';
import { Link } from 'react-router-dom';
import { Checkbox } from 'rsuite';


const Signup: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [userInfo, setUserInfo] = useState({
        first_name: "",
        last_name: "",
        mobile_number: 0,
        password: ""
    })
    function onChangeUserInfo(event: React.ChangeEvent<HTMLInputElement>){
        console.log(event);
        const { name, value } = event.target;
        const data = { ...userInfo, [name]: value.trim() };
        console.log(data);
        setUserInfo(data);
    }
    async function submitLogic(){
        await axios.post(`https://dropshipping-app-ingsl.ondigitalocean.app/account/signup/`, {
            
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            mobile_number: userInfo.mobile_number,
            password: userInfo.password
        }).then((data) => {
            console.log('submitted',data)
            
            if(data.data.data?.access){
                localStorage.setItem('token', data.data.data.access)
                window.location.href = '/'
            }
            else if(data.data.error.mobile_number){
                setErrorMessage(data.data.error.mobile_number)
            }
        }).catch((error) => {
            console.log('error in submitting' , error)
        })
    }

     function onRegister(event: React.FormEvent){
        event.preventDefault();
        submitLogic()
    } 
    // useEffect(() => {

    // }, [])
    return (
        <div className="col-md-12">
            <div className="card card-bgwhite card-bgwhite-container">
                <div className="titel">
                    <h1>Logo</h1>
                    <h3>Sign up</h3>
                </div>
                { errorMessage && <div className="alert alert-danger" role="alert">
                    <p>{errorMessage}</p>
                </div>}
                
                <form onSubmit={onRegister}>
                    <div className="form-group">
                        <label htmlFor="mobile_number">First name</label>
                        <input
                            type="text"
                            id="text"
                            name='first_name'
                            onChange={onChangeUserInfo}
                            placeholder="First name"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name">Last name</label>
                        <input
                            type="text"
                            id="last_name"
                            name='last_name'
                            onChange={onChangeUserInfo}
                            placeholder="Last name"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile_number">Phone number</label>
                        <input
                            type="number"
                            id="mobile_number"
                            name='mobile_number'
                            onChange={onChangeUserInfo}
                            placeholder="Phone number"
                            className="form-control"
                            required
                        />
                        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.8626 16.3492C17.8434 16.2142 17.8202 16.0963 17.796 15.9913C17.6502 15.3663 17.1968 14.8902 16.6409 14.7802L13.031 14.0593C12.4993 13.9523 11.9668 14.1993 11.6401 14.7013C11.5951 14.7703 11.5518 14.8402 11.5118 14.9112C11.4526 15.0152 11.3351 15.1123 11.2076 15.0453C9.33515 14.0683 7.8568 12.2942 7.04347 10.0472C6.9868 9.89221 7.06594 9.75622 7.15094 9.68722C7.23011 9.62322 7.30678 9.55427 7.38094 9.48227C7.78678 9.08827 7.98848 8.45825 7.90681 7.83725L7.34763 3.58224C7.2618 2.93024 6.88932 2.3972 6.37432 2.1932C6.25349 2.1452 6.11349 2.10125 5.95099 2.06625C4.89599 1.84025 3.8168 2.19821 2.98763 3.05221C2.11847 3.94821 1.63679 5.25028 1.66846 6.62228C1.85096 14.7443 7.29428 21.2773 14.0626 21.4963C14.0968 21.4973 14.131 21.4983 14.1652 21.4983C15.2627 21.4983 16.3001 20.9282 17.0243 19.9222C17.7418 18.9252 18.0476 17.6222 17.8626 16.3492ZM16.0768 18.9422C15.576 19.6372 14.8476 20.0083 14.0951 19.9983C7.99178 19.8003 3.08178 13.9072 2.91678 6.58224C2.89678 5.66324 3.21846 4.79127 3.80179 4.19027C4.24263 3.73627 4.76845 3.49826 5.31679 3.49826C5.45345 3.49826 5.59181 3.5132 5.73015 3.5422C5.82681 3.5632 5.90928 3.58828 5.98095 3.61728C6.05012 3.64428 6.10095 3.72125 6.11345 3.81625L6.67263 8.07125C6.68513 8.16425 6.65515 8.25827 6.59598 8.31527C6.54765 8.36227 6.49845 8.40623 6.44762 8.44723C5.83595 8.94623 5.60932 9.85023 5.89682 10.6452C6.83682 13.2412 8.54598 15.2923 10.7085 16.4203C11.3685 16.7643 12.1235 16.4933 12.5443 15.7563C12.5693 15.7133 12.5951 15.6703 12.6235 15.6263C12.6685 15.5573 12.7468 15.5243 12.826 15.5383L16.436 16.2592C16.5126 16.2752 16.5768 16.3312 16.5926 16.3962C16.6076 16.4582 16.6201 16.5273 16.6318 16.6063C16.7518 17.4343 16.5493 18.2852 16.0768 18.9422Z" fill="#555555" />
                        </svg>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            onChange={onChangeUserInfo}
                            placeholder="Password"
                            className="form-control"
                            required
                        />
                        <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.98649 18.9598C2.8808 18.8409 2.81633 18.6819 2.80514 18.5125C2.79394 18.343 2.83679 18.1746 2.92566 18.0388L2.98649 17.9593L4.62983 16.1001C3.37275 14.7574 2.37998 13.121 1.71816 11.3008C1.68442 11.2126 1.66699 11.1173 1.66699 11.0209C1.66699 10.9246 1.68442 10.8293 1.71816 10.7411C2.46865 8.65908 3.6594 6.82558 5.18233 5.40701C6.54934 4.14301 8.24666 3.44523 10.0007 3.42613C11.5746 3.44111 13.1068 4.00962 14.3915 5.0553L16.1315 3.08209C16.2495 2.94933 16.4081 2.875 16.5732 2.875C16.7383 2.875 16.8968 2.94933 17.0148 3.08209C17.1205 3.2009 17.185 3.3599 17.1962 3.52938C17.2074 3.69887 17.1645 3.86724 17.0757 4.00305L17.0148 4.08259L3.86983 18.9598C3.7518 19.0925 3.59326 19.1668 3.42816 19.1668C3.26306 19.1668 3.10453 19.0925 2.98649 18.9598ZM5.95733 6.51675C4.68814 7.69903 3.6799 9.20953 3.01483 10.9251L2.97566 11.0209L3.01316 11.1168C3.60264 12.6253 4.45329 13.9798 5.51316 15.0977L7.29483 13.0852C6.93047 12.4786 6.73649 11.7582 6.739 11.0209C6.74183 10.5321 6.8285 10.0486 6.99405 9.59836C7.15961 9.14809 7.40079 8.73979 7.70377 8.39688C8.00676 8.05396 8.3656 7.78316 8.75974 7.59999C9.15388 7.41682 9.57557 7.32487 10.0007 7.32942C10.6489 7.32797 11.283 7.54704 11.8232 7.95905L13.4898 6.07017C12.4549 5.28039 11.2427 4.85355 10.0007 4.84159C8.52741 4.86112 7.10292 5.4513 5.95733 6.51675ZM7.989 11.0209C7.98807 11.3792 8.0627 11.7324 8.2065 12.0502L10.9123 8.9835C10.6287 8.82331 10.3166 8.74128 10.0007 8.74392C9.73841 8.74089 9.47823 8.79745 9.23503 8.91035C8.99184 9.02326 8.77044 9.19029 8.58352 9.40186C8.39661 9.61342 8.24787 9.86536 8.14585 10.1432C8.04382 10.421 7.99052 10.7193 7.989 11.0209ZM7.69316 18.1893C7.61583 18.1608 7.54417 18.115 7.48235 18.0545C7.42053 17.9939 7.36977 17.9199 7.33303 17.8366C7.29628 17.7534 7.27428 17.6625 7.26829 17.5694C7.26231 17.4763 7.27246 17.3827 7.29816 17.2942C7.35253 17.115 7.46611 16.9676 7.61429 16.884C7.76247 16.8004 7.93332 16.7873 8.08983 16.8476C8.7065 17.0809 9.35149 17.1999 10.0007 17.2003C12.7507 17.2003 15.3182 15.0325 16.8948 11.3372L17.0248 11.0228L16.9807 10.9107C16.6792 10.1695 16.3208 9.46076 15.9098 8.7928L15.709 8.48038C15.6597 8.40622 15.6237 8.32147 15.6032 8.23111C15.5828 8.14074 15.5783 8.04659 15.5899 7.95418C15.6016 7.86177 15.6291 7.77297 15.6711 7.693C15.713 7.61303 15.7684 7.5435 15.834 7.4885C15.9667 7.37574 16.1325 7.32723 16.2959 7.35339C16.4593 7.37954 16.6073 7.47827 16.7082 7.62842C17.3396 8.58972 17.8689 9.63437 18.2848 10.7401C18.3186 10.8286 18.3361 10.9243 18.3361 11.0209C18.3361 11.1176 18.3186 11.2132 18.2848 11.3017C16.554 15.8404 13.4515 18.6148 10.0023 18.6148C9.21785 18.6148 8.43836 18.4712 7.69316 18.1893ZM9.85983 14.0742C9.84545 13.9824 9.84699 13.8883 9.86437 13.7972C9.88175 13.7061 9.91462 13.6199 9.96109 13.5434C10.0076 13.467 10.0667 13.4019 10.1351 13.3519C10.2036 13.3019 10.2799 13.2679 10.3598 13.2519C10.7577 13.1714 11.1248 12.9535 11.4124 12.6272C11.7 12.3009 11.8944 11.8817 11.9698 11.4253C11.9979 11.2559 12.0782 11.1039 12.1959 10.997C12.3136 10.8902 12.4609 10.8357 12.6107 10.8436L12.694 10.8542C12.7742 10.8697 12.8509 10.9033 12.9197 10.9531C12.9885 11.0028 13.0481 11.0677 13.095 11.144C13.142 11.2204 13.1753 11.3066 13.1931 11.3978C13.211 11.489 13.213 11.5834 13.199 11.6755C13.077 12.4181 12.761 13.1003 12.2932 13.6311C11.8254 14.1618 11.228 14.516 10.5807 14.6463C10.5435 14.6539 10.5059 14.6578 10.4682 14.6578C10.3237 14.6571 10.1839 14.5986 10.0729 14.4922C9.9619 14.3859 9.88655 14.2384 9.85983 14.0751V14.0742Z" fill="#200E32" />
                        </svg>



                    </div>
                    <Checkbox> I agree to Terms of Service and Privacy Policy</Checkbox>

                    <button type="submit" className="btn btn-primary loginbtn">Sign up</button>
                    <div className="foterr">
                        <p>Dont have an account?</p>
                        <Link to={'/login'}>sign in</Link>
                    </div>


                </form>
            </div>
        </div>

    );
};

export default Signup;
