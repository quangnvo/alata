"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import TagSection from './TagSection';

const TagBoard = () => {

	const initialTags = ['Beach',
		'Adventure',
		'Hiking',
		'Camping',
		'City Break',
		'Culture',
		'Foodie',
		'Solo Travel',
		'Family Travel',
		'Luxury Travel',
		'Budget Travel',
		'Backpacking',
		'Road Trip',
		'Sightseeing',
		'Wildlife',
		'National Parks',
		'Mountains',
		'Islands',
		'Desert',
		'Historical Sites',
		'Local Cuisine',
		'Relaxation',
		'Exotic Destinations',
		'Water Activities',
		'Winter Sports',
		'Tropical Getaways',
		'Ecotourism',
		'Photography',
		'Cultural Festivals',
		'Travel Tips',
		'Travel Planning',
		'Travel Gadgets',
		'Travel Hacks',
		'Travel Insurance',
		'Airbnb',
		'Hotels',
		'Hostels',
		'Resorts',
		'Cruise',
		'Train Travel',
		'Backcountry Travel',
		'Travel Health',
		'Travel Safety',];

	const [textValue, setTextValue] = useState<string>('');
	const [deleteMode, setDeleteMode] = useState<boolean>(false);
	const [tags, setTags] = useState<string[]>(initialTags);
	const [addTagValue, setAddTagValue] = useState<string>('');

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

	const handleDeleteClick = () => {
		setDeleteMode(!deleteMode);
	};

	const handleTagDelete = (tagToDelete: string) => {
		const updatedTags = tags.filter((tag) => tag !== tagToDelete);
		setTags(updatedTags);
	};

	const handleAddTagClick = () => {
		if (addTagValue) {
			const updatedTags = [...tags, addTagValue];
			setTags(updatedTags);
			setAddTagValue('');
		}
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
		<div className="grid grid-cols-12 gap-4">

			<div className="col-span-9">
				<Button className='mb-5'>
					Add new category
				</Button>

				<TagSection />

			</div>

			{/* Text */}
			<div className="col-span-3">
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
		</div>
	)
}

export default TagBoard