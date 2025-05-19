export function AuthLink({href, linkText}){
    return (
        <a href={href} className="font-semibold text-indigo-600 hover:text-indigo-500">
            {linkText}
        </a>
    );
}