import { useSession } from "next-auth/react";
import { Button } from "./Button";
import { ProfileImage } from "./ProfileImage";
import { api } from "~/utils/api";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

function updateTextAreaHeight(textarea?: HTMLTextAreaElement) {
    if (!textarea) return;
    textarea.style.height = "0";
    textarea.style.height = `${textarea.scrollHeight}px`;
}

function Form() {
    const session = useSession();
    const [inputValue, setInputValue] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>();
    const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
        updateTextAreaHeight(textArea);
        textAreaRef.current = textArea;
    }, []);

    useLayoutEffect(() => {
        updateTextAreaHeight(textAreaRef.current);
    }, [inputValue]);


    const createTweet = api.tweet.create.useMutation({
        onSuccess: (newTweet) => {
            console.log(newTweet);
            setInputValue("");
        },
        onError: (error) => {
            console.log(error);
        }
    });

    if (session.status !== "authenticated") return;

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!inputValue) return;
        createTweet.mutate({ content: inputValue });
        setInputValue("");
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2 px-4 py-2">
            <div className="flex gap-4">
                <ProfileImage src={session.data.user.image} />
                <textarea
                    ref={inputRef}
                    style={{ height: 0 }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none" placeholder="What's happening?"></textarea>
            </div>
            <Button className="self-end">Xend ittt</Button>
        </form>
    );
};

export function NewTweetForm() {
    const session = useSession();
    if (session.status !== "authenticated") return null;

    return <Form />
}