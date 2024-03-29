"use client"

import React from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { useState } from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';

import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog"

import { deleteBookmark, addTagToBookmark } from '@/redux/features/tagSlice';

// Import icons from lucide-react
import { Trash, Pencil } from 'lucide-react';


type BookmarkCardProps = {
	bookmark: {
		bookmarkName: string;
		tags: string[];
	};
};


const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark }) => {

	const dispatch = useAppDispatch();

	const [newTagForBookmark, setNewTagForBookmark] = useState('');


	// Function to add tag to bookmark
	const handleFormSubmit = (bookmarkName: any) => {
		console.log("da vao day")
		if (newTagForBookmark.trim() === '') {
			return;
		}
		const newTagSentToRedux = {
			bookmarkName,
			tag: newTagForBookmark,
		};
		dispatch(addTagToBookmark(newTagSentToRedux));
		setNewTagForBookmark('');
	};


	// Function to copy text in Bookmark for user to paste
	const handleCopyToClipboard = (tags: string[]) => {
		const tagsText = tags.join(', ');
		navigator.clipboard.writeText(tagsText);
	};

	return (
		<div
			key={bookmark.bookmarkName}
			className='mb-14 pb-5 border-b border-gray-400'
		>
			<div className='font-semibold mb-3 text-lg'>
				{bookmark.bookmarkName}
			</div>

			{/* In the bookmark card content, render will be like "tag1, tag2, tag3" */}
			<div className='mb-5'>
				{bookmark.tags.join(', ')}
			</div>


			<div className='flex gap-1 justify-end'>
				{/* Button Copy text in Bookmark */}
				<Button
					variant="alatagCopyText"
					onClick={() => handleCopyToClipboard(bookmark.tags)}
				>
					Copy text
				</Button>


				{/* Button Update, Edit Bookmark */}
				<Dialog key={bookmark.tags[0]}>
					<DialogTrigger asChild>
						<Button
							variant="alatagEdit"
						>
							<Pencil size={16} />
						</Button>
					</DialogTrigger>

					<DialogContent className="sm:max-w-[425px]">

						<div className='mb-4'>
							{bookmark.tags.join(', ')}
						</div>

						{/* Form to add tag to the bookmark */}
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleFormSubmit(bookmark.bookmarkName);
							}}
							className="flex gap-3 mb-4"
						>
							<label>
								<Input
									type="text"
									value={newTagForBookmark}
									onChange={e => setNewTagForBookmark(e.target.value)}
									placeholder="Enter new tag"
								/>
							</label>

							<DialogFooter>
								<Button
									type="submit"
								>
									Add
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
				{/* End of Button Update Bookmark */}


				{/* Button Delete Bookmark */}
				<Dialog key={bookmark.bookmarkName}>
					<DialogTrigger asChild>
						<Button
							variant="alatagDelete"
						>
							<Trash size={16} />
						</Button>
					</DialogTrigger>

					<DialogContent className="sm:max-w-[425px]">
						<div>
							Are you sure to delete this bookmark?
						</div>

						<DialogFooter>
							{/* Button Yes - Delete the bookmark*/}
							<DialogClose asChild>
								<Button
									variant="outline"
									onClick={() =>
										dispatch(deleteBookmark(bookmark.bookmarkName))
									}
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

							{/* Button No - Delete Bookmar*/}
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
				{/* End of Delete Bookmark */}
			</div>
		</div>
	)
}

export default BookmarkCard