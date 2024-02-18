"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addTagText, addTag, deleteTag, deleteAllTags, deleteSection, changeSectionName } from "@/redux/features/tagSlice";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogFooter,
	DialogClose,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from './ui/input';


type TagSectionProps = {
	section: {
		sectionName: string;
		tags: string[];
	};
	isDeleteSectionMode: boolean;
};


const TagSection: React.FC<TagSectionProps> = ({ section, isDeleteSectionMode }) => {

	const { tagTextAdded } = useAppSelector((state) => state.tagReducer);
	const dispatch = useAppDispatch();

	const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
	const [addTagValue, setAddTagValue] = useState<string>('');
	const [newSectionName, setNewSectionName] = useState('');

	// ********************
	// * This function is used for "Add new tag" button 
	// ********************
	const handleAddTagClick = () => {
		if (addTagValue) {
			dispatch(addTag({
				sectionName: section.sectionName,
				newTag: addTagValue
			}));
			setAddTagValue('');
		}
	};

	// ********************
	// * This function is used when user click on a tag, then add the tag to the tagTextAdded
	// ********************
	const handleTagClick = (tag: string) => {
		// Split the string into an array of tags
		// Initialize tags as an empty array
		let tags: any[] = [];
		// Check if tagTextAdded exists
		if (tagTextAdded) {
			// If it does, split the string into an array of tags and trim each tag
			tags = tagTextAdded.split(',').map(tag => tag.trim());
		}

		// If the tag is already present, remove it
		// If the tag is not present, add it
		if (tags.includes(tag)) {
			tags = tags.filter(t => t !== tag);
		} else {
			tags.push(tag);
		}
		// Join the array back into a string and update the Redux state
		dispatch(addTagText(tags.join(', ')));
	};

	// ********************
	// * This function is used for "Delete tag" button
	// ********************
	const handleDeleteClick = () => {
		setIsDeleteMode(prevDeleteMode => !prevDeleteMode);
	};

	// ********************
	// * This function is used for "X" button of each tag, for deleting the each tag
	// ********************
	const handleTagDelete = (tagToDelete: string) => {
		// Remove the tag from the section
		dispatch(deleteTag({
			sectionName: section.sectionName,
			tagToDelete
		}));

		// Split the string into an array of tags
		let tags = tagTextAdded ? tagTextAdded.split(',').map(t => t.trim()) : [];
		if (tags.includes(tagToDelete)) {
			// If the tag is present, remove it
			tags = tags.filter(t => t !== tagToDelete);
		}
		// Join the array back into a string and update the Redux state
		dispatch(addTagText(tags.join(', ')));
	};

	// ********************
	// * This function is used when user type in the input field for adding new tag
	// ********************
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAddTagValue(event.target.value);
	};

	// ********************
	// * This function is used for changing the section name
	// ********************
	const handleSectionNameChange = (event: any) => {
		event.preventDefault();
		if (newSectionName.trim() === '') {
			return;
		}
		dispatch(changeSectionName({
			oldSectionName: section.sectionName,
			newSectionName: newSectionName
		}));
		setNewSectionName('');
	};

	// ********************
	// * This function is used for rendering the tags
	// ********************
	const renderTags = () => {
		return section.tags.map((tag) => (
			<div key={tag} className="inline-block p-1" >

				<Button
					onClick={() => handleTagClick(tag)}
					// If the tag (meaning the tag button, like "hiking", "camping", "beach", etc.) is present in the tagTextAdded string, use the "default" variant;otherwise use the "outline" variant
					variant={`${tagTextAdded.split(',').map((t) => t.trim()).includes(tag) ? 'default' : 'outline'}`}
					disabled={isDeleteMode || isDeleteSectionMode}
				>
					{tag}
				</Button>

				{isDeleteMode && (
					<button
						className="bg-red-400 hover:bg-red-500 text-white font-semibold py-1 px-2 rounded-full text-xs ml-1 mr-5 border-2 border-black "
						onClick={() => handleTagDelete(tag)}
					>
						X
					</button>
				)}
			</div>
		));
	};

	// Render UI 
	return (
		<div className='p-4 border border-gray-300 rounded-md mb-8'>

			<div className='font-bold mb-4 text-2xl flex justify-between items-center'>
				<div className='flex gap-3 items-center'>
					<p>
						{section.sectionName}
					</p>

					{/* Button Change section name */}
					<Dialog key={section.sectionName}>
						<DialogTrigger asChild>
							<Button
								disabled={isDeleteSectionMode}
								variant="secondary"
							>
								Change section name
							</Button>
						</DialogTrigger>

						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>
									Change section name
								</DialogTitle>
							</DialogHeader>


							<form
								onSubmit={handleSectionNameChange}
								className="grid gap-4 py-4"
							>
								<label>
									<Input
										type="text"
										value={newSectionName}
										onChange={e => setNewSectionName(e.target.value)}
										placeholder="New section name"
									/>
								</label>

								<DialogFooter>
									<Button
										type="submit"
									>
										Change
									</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
					{/* End of Button Change Section Name */}
				</div>

				{/* Delete section button X (invisible, only can be seen by clicking the button Delete Section) */}
				{isDeleteSectionMode && (
					<Dialog key={section.sectionName}>
						<DialogTrigger asChild>
							<button className="bg-red-400 hover:bg-red-500 text-white font-semibold py-1 px-2 rounded-full text-xs border-2 border-black">
								X
							</button>
						</DialogTrigger>

						<DialogContent className="sm:max-w-[425px]">
							<div>
								Are you sure to delete <span className='font-bold'>{section.sectionName}</span> section?
							</div>

							<DialogFooter>
								<DialogClose asChild>
									<Button
										variant="outline"
										onClick={() => dispatch(deleteSection(section.sectionName))}
										onKeyDown={(e) => {
											if (e.key === 'ArrowRight') {
												// Focus on the next button
												(e.currentTarget.nextSibling as HTMLElement)?.focus();
											}
										}}
									>
										Yes
									</Button>
								</DialogClose>

								<DialogClose asChild>
									<Button
										type="button"
										variant="outline"
										onKeyDown={(e) => {
											if (e.key === 'ArrowLeft') {
												// Focus on the previous button
												(e.currentTarget.previousSibling as HTMLElement)?.focus();
											}
										}}
									>
										No
									</Button>
								</DialogClose>

							</DialogFooter>
						</DialogContent>
					</Dialog>
				)}

			</div>

			<div className='flex gap-3'>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleAddTagClick();
					}}
					className="flex gap-3 mb-4"
				>
					{/* Input Add new tag */}
					<input
						type="text"
						value={addTagValue}
						onChange={handleInputChange}
						disabled={isDeleteSectionMode || isDeleteMode}
						className="border rounded px-2 py-1"
					/>

					{/* Button Add new tag */}
					<Button
						type="submit"
						disabled={isDeleteSectionMode || isDeleteMode}
					>
						Add new tag
					</Button>
				</form>

				{/* Button Delete tag */}
				<Button
					onClick={handleDeleteClick}
					variant={isDeleteMode ? 'default' : 'destructive'}
					disabled={isDeleteSectionMode}
				>
					{isDeleteMode ? 'Done' : 'Delete tag'}
				</Button>

				{/* Button Delete all tags */}
				<Dialog key={section.sectionName}>
					<DialogTrigger asChild>
						<Button
							disabled={isDeleteSectionMode}
							variant="destructive"
						>
							Delete all tags
						</Button>
					</DialogTrigger>

					<DialogContent className="sm:max-w-[425px]">
						<div>
							Are you sure to <span className='font-semibold'>delete all tags</span> in the <span className='font-bold'>{section.sectionName}</span> section?
						</div>

						<DialogFooter>
							{/* Button Yes - Delete all tags*/}
							<DialogClose asChild>
								<Button
									variant="outline"
									onClick={() => dispatch(deleteAllTags(section.sectionName))}
									onKeyDown={(e) => {
										if (e.key === 'ArrowRight') {
											// Focus on the next button
											(e.currentTarget.nextSibling as HTMLElement)?.focus();
										}
									}}
								>
									Yes
								</Button>
							</DialogClose>

							{/* Button No - Delete all tags*/}
							<DialogClose asChild>
								<Button
									type="button"
									variant="outline"
									onKeyDown={(e) => {
										if (e.key === 'ArrowLeft') {
											// Focus on the previous button
											(e.currentTarget.previousSibling as HTMLElement)?.focus();
										}
									}}
								>
									No
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{/* Render Tags */}
			<div>
				{renderTags()}
			</div>
		</div>
	)
}

export default TagSection;