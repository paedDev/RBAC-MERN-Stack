import React from "react";

const InputField = ({
  id, label, icon, placeholder, type = "text", value, onChange, required = true, autoComplete, }) => (
  <div className='relative group'>
    <label htmlFor={id} className=" text-sm/6 font-medium text-gray-800 flex items-center space-x-1 absolute -top-4 bg-white left-2 group-focus-within:-top-1 transition-all duration-500">
      <div className='flex items-center justify-center group-focus-within:text-blue-800'>
        {icon}
        <span className="pl-1">{label}</span>
      </div>
    </label>
    <div className="mt-2 ">
      <input
        value={value}
        onChange={onChange}
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete || id}
        placeholder={placeholder}
        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />
    </div>
  </div>

);
export default InputField;