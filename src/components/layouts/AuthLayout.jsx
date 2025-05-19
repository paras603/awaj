export function AuthLayout({title, children}){
    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-20 mb-10 text-center font-serif uppercase text-8xl font-weight: 800">awaj</h1>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">{title}</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {children}
            </div>
        </>
    )
}