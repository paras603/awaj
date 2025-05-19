export function AuthLabel({labelFor, label}){
    return (
        <label for={labelFor} className="block text-sm/6 font-medium text-gray-900">
            {label}
        </label>
    );
}