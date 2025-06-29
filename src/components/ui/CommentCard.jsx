export function CommentCard({children}){
    return (
        <div className="mb-4 text-white rounded-lg hover:bg-white/5 transition-colors duration-200">
            <div className="flex flex-row space-x-3 p-4 border-l-4 border-blue-500">
                {children}
            </div>
        </div>
    )
}