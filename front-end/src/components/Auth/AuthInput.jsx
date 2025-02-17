import React from "react";

const AuthInput = ({ label, type, name, value, onChange }) =>{
    return (
        <div className="mb-3 ">
            <input
                type={type}
                name={name}
                className="w-100 form-control"
                placeholder={`${label}`}
                required
                value={value}
                onChange={onChange}
            />
        </div>
    )

}

export default AuthInput;