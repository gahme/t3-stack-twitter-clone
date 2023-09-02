import { useSession } from "next-auth/react";
import Link from "next/link";

export function SideNav() {
    const session = useSession();
    const user = session.data?.user;

    return (
        <nav className="sticky top-0 h-screen w-64 bg-gray-100 border-r">
            <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
                <li className="w-full">
                    <Link href="/">Home</Link>
                </li>
                {user != null && (
                    <li className="w-full">
                        <Link href={`/profiles/${user.id}`}>Profile</Link>
                    </li>
                )}
            </ul>
        </nav >
    );
}