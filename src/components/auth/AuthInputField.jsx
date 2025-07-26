export function AuthInputField({type, name, id, autoComplete, required = false, onChange, value}){
    return (
        <input 
            type={type} 
            name={name} 
            id={id} 
            autoComplete={autoComplete}
            required = {required}
            value={value}
            onChange={onChange}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
    );
}