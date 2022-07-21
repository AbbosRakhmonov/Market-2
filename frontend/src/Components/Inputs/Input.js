import {useState} from 'react';
import {IoEye, IoEyeOff} from 'react-icons/io5';

function Input({placeholder, type, value, onChange, password, label}) {
    const [currentShow, setCurrentShow] = useState(false);
    const changeType = () => {
        setCurrentShow(!currentShow);
    };

    return (
        <div className={'input-container'}>
            {label && <label className={'labelClass leading-[1.125rem]'}>{label}</label>}
            <div className='relative'>
                <input
                    className='inputClass shadow-[0_10px_10px_rgba(0,0,0,0.05)] leading-[1.125rem]'
                    placeholder={placeholder}
                    type={currentShow ? 'text' : type}
                    value={value}
                    onChange={onChange}
                />
                {
                    password && <button className={'iconButton'} type={"button"} onClick={changeType}>
                        {
                            currentShow ? (
                                <IoEye className='iconClass'/>
                            ) : (
                                <IoEyeOff className='iconClass'/>
                            )
                        }
                    </button>
                }
            </div>
        </div>
    );
}

export default Input;
