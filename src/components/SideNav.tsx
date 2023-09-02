import { signIn, signOut, useSession } from "next-auth/react";
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
                        {/* <Link href={`/profiles/${user.id}`}>Profile</Link> */}
                    </li>
                )}
                {user == null ? (
                    <li>
                        <button onClick={() => void signIn}>Log In</button>
                    </li>
                ) : (
                    <li>
                        <button onClick={() => void signOut}>Log Out</button>
                    </li>
                )}
            </ul>
        </nav >
    );
}