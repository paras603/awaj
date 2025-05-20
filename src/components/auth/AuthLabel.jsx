export function AuthLabel({labelFor, label}){
    return (
        <label htmlFor={labelFor} className="block text-sm/6 font-medium text-gray-900">
            {label}
        </label>
    );
}