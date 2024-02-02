"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/redux/hooks";

const TagTextAddedArea = () => {

    const { tagTextAdded } = useAppSelector((state) => state.tagReducer);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(tagTextAdded);
    };

    const tags = tagTextAdded.split(',').map(t => t.trim());

    return (
        <div className='flex flex-col gap-3'>
            <p className='mb-2'>Tag text:
                <span className='font-bold'>
                    {tags[0] == "" ? "0" : tags.length}
                </span>
            </p>

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