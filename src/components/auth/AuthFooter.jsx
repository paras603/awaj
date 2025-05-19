import { AuthLink } from "./AuthLink";

export function AuthFooter({text, linkText, linkHref}){
    return (
        <p className="mt-10 text-center text-sm/6 text-gray-500">
            {text}
            <AuthLink
                href={linkHref}
                linkText={linkText}
            />
        </p>
    );
}