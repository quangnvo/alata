"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"


const TagBoard = () => {

	const initialTags = ['travel', 'destination', 'famous place', 'tourism', 'vacation', 'holiday', 'tourist', 'tour', 'traveler'];

	const [textValue, setTextValue] = useState<string>('');

	const renderTags = () => {
		return <div className='flex flex-wrap gap-3'>
			{initialTags.map((tag) => (
				<Button variant="outline" onClick={() => handleTagClick(tag)}>
					{tag}
				</Button>
			))}
		</div>
	};

	const handleTagClick = (tag: string) => {
		const tags = textValue.split(',').map((t) => t.trim()); // Split existing tags

		if (tags.includes(tag)) {
			const updatedTags = tags.filter((t) => t !== tag); // Remove the tag
			const newTextValue = updatedTags.length > 0 ? updatedTags.join(', ') : ''; // Update the text without the removed tag
			setTextValue(newTextValue);
		} else {
			const newTextValue = textValue ? `${textValue}, ${tag}` : tag; // Add the tag
			setTextValue(newTextValue);
		}
	};

	return (
		<div className="grid grid-cols-12 gap-4">

			{/* Tags */}
			<div className="col-span-9">
				{renderTags()}
			</div>

			{/* Text */}
			<div className="col-span-3">
				Text
				<input
					type="text"
					className="border rounded px-2 py-1 w-full mb-4"
					value={textValue}
					readOnly
				/>
			</div>
		</div>
	)
}

export default TagBoard