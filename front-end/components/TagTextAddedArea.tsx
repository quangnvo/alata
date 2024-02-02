"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/redux/hooks";

const TagTextAddedArea = () => {

    const { tagTextAdded } = useAppSelector((state) => state.tagReducer);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(tagTextAdded);
    };

    return (
        <div className='flex flex-col gap-3'>
            <p className='font-bold mb-2'>Tag text</p>

            <Button onClick={handleCopyToClipboard}>
                Copy text
            </Button>

            <p>
                {tagTextAdded}
            </p>
        </div>
    )
}

export default TagTextAddedArea