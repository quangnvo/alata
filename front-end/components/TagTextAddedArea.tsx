"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const TagTextAddedArea = () => {

    const { tagTextAdded } = useAppSelector((state) => state.tagReducer);
    const dispatch = useAppDispatch();

    const [textValue, setTextValue] = useState<string>(tagTextAdded);
    const textAreaStyle = {
        minWidth: '300px', // Default minimum width
        minHeight: '500px', // Default minimum height
        height: 'auto', // Allows vertical expansion

    };

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextValue(event.target.value);
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(textValue);
    };

    return (
        <div className='fixed'>
            <p className='font-bold mb-2'>Tag text</p>
            <Button onClick={handleCopyToClipboard}>
                Copy to clipboard
            </Button>
            <textarea
                className="border rounded px-2 py-1 w-full mb-4 resize-none"
                value={textValue}
                onChange={handleTextAreaChange}
                style={textAreaStyle}
            />
        </div>
    )
}

export default TagTextAddedArea