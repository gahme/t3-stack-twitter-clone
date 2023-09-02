type ProfileImageProps = {
    src?: string | null
    className?: string
}

export function ProfileImage({ src, className = "" }: ProfileImageProps) {
    return <div className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}>
        {src ? <img src={src} alt="Profile Image" className="object-cover w-full h-full" /> : null}
    </div>
}