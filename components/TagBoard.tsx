"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"


const TagBoard = () => {

	const initialTags = ['travel', 'destination', 'famous place', 'etc.'];

	const [textValue, setTextValue] = useState<string>('');

	const renderTags = () => {
		return <div className='flex space-x-2'>
			{initialTags.map((tag) => (
				<Button variant="outline" onClick={() => handleTagClick(tag)}>
					{tag}
				</Button>
			))}
		</div>
	};

	const handleTagClick = (tag: string) => {
		if (textValue.includes(tag)) {
			const newTextValue = textValue.replace(tag, '').trim();
			setTextValue(newTextValue);
		} else {
			const newTextValue = `${textValue} ${tag}`.trim();
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