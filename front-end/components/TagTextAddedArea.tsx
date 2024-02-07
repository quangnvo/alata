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



            <p>
                {tagTextAdded}
            </p>

            <div className='flex gap-2'>
                <Button variant="secondary">
                    Bookmark 🔖
                </Button>

                <Button onClick={handleCopyToClipboard}>
                    Copy text
                </Button>
            </div>


        </div>
    )
}

export default TagTextAddedArea