"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { decrement, increment, reset } from "@/redux/features/counterSlice";
import { addTagText } from "@/redux/features/tagSlice";

const TagSection = () => {

    const { tagSection, tagTextAdded } = useAppSelector((state) => state.tagReducer);
    const dispatch = useAppDispatch();

    const [textValue, setTextValue] = useState<string>('');
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>(tagSection[0].tags);
    const [addTagValue, setAddTagValue] = useState<string>('');

    const handleAddTagClick = () => {

    };

    const handleTagClick = (tag: string) => {
        dispatch(addTagText(tag));
    };


    const handleDeleteClick = () => {
        alert('Delete mode');
    };

    const handleTagDelete = (tagToDelete: string) => {
        alert('Delete tag: ' + tagToDelete);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddTagValue(event.target.value);
    };

    const renderTags = () => {
        return tags.map((tag) => (
            <div key={tag} className="inline-block p-1" >

                <Button
                    variant={`${textValue.split(',').map((t) => t.trim()).includes(tag) ? 'default' : 'outline'}`}
                    onClick={() => handleTagClick(tag)}
                >
                    {tag}
                </Button>
                {deleteMode && (
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full text-sm ml-1"
                        onClick={() => handleTagDelete(tag)}
                    >
                        X
                    </button>
                )}

            </div>
        ));
    };

    return (
        <div className='p-4 border border-gray-300 rounded-md mb-8'>

            <p className='font-bold mb-4 text-2xl'>Travel 🧳</p>

            {/* Input field and Button to add tags */}
            <div className="flex mb-4">
                <input
                    type="text"
                    value={addTagValue}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 mr-2"
                />
                <Button onClick={handleAddTagClick}>
                    Add new tag 🏷️
                </Button>
            </div>

            <div>
                <Button className='mb-2' onClick={handleDeleteClick} variant="destructive">
                    {deleteMode ? 'Done' : 'Delete tag 🗑️'}
                </Button>
            </div>

            {/* Tags */}
            <div>
                {renderTags()}
            </div>
        </div>
    )
}

export default TagSection