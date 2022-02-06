import React from 'react'

const TextArea = ({placeholder, rows,label,id,name, onChange,value}) => {
    return (
        <div>
            <div className="sm:pt-5">
              <label htmlFor="about" className="block text-xs font-medium mb-3 tracking-widest text-gray-400 sm:mt-px sm:pt-2">
                {label}
              </label>
              <div className="mt-1 sm:mt-0 text-base ">
                <textarea
                  id={id}
                  name={name}
                  value={value}
                  rows={rows}
                  onChange={onChange}
                  placeholder={placeholder}
                  className=" p-2 bg-gray-50  block w-full focus-within:border-transparent focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-blue-300 rounded-md"
               
                />
               
              </div>
            </div> 
        </div>
    )
}

export default TextArea
