"use client"

import { useState } from "react";

import { Button } from "@/components/ui/button"
import { addBookmark } from "@/redux/features/tagSlice";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogClose
} from "@/components/ui/dialog"
import { Input } from "./ui/input";

// Import from Redux store and slice
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { clearAllTagText } from "@/redux/features/tagSlice";


const TagTextAddedArea = () => {

	const { tagTextAdded } = useAppSelector((state) => state.tagReducer);
	const dispatch = useAppDispatch()
	const [bookmarkName, setBookmarkName] = useState('');

	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(tagTextAdded);
	};

	const tags = tagTextAdded.split(',').map(t => t.trim());

	const handleAddBookmark = () => {
		dispatch(addBookmark({
			bookmarkName,
			tags: tagTextAdded.split(',').map(t => t.trim())
		}));
	};

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
				{/* Button Bookmark */}
				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant="secondary"
						>
							Bookmark
						</Button>
					</DialogTrigger>

					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>
								Bookmark name
							</DialogTitle>
						</DialogHeader>


						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleAddBookmark();
							}}
							className="grid gap-4 py-4"
						>
							<label>
								<Input
									type="text"
									value={bookmarkName}
									onChange={e => setBookmarkName(e.target.value)}
									placeholder="New bookmark name"
								/>
							</label>

							<DialogFooter>
								<Button
									type="submit"
								>
									Add bookmark
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
				{/* End of Button Bookmark */}

				{/* Button Clear all */}
				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant="destructive"
						>
							Clear all
						</Button>
					</DialogTrigger>

					<DialogContent className="sm:max-w-[425px]">
						<div>
							Are you sure to clear all the tags?
						</div>

						<DialogFooter>
							{/* Button Yes - Clear all tag text*/}
							<DialogClose asChild>
								<Button
									variant="outline"
									onClick={() =>
										dispatch(clearAllTagText())
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

							{/* Button No - Clear all tag text*/}
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

			{/* Button Copy text */}
			<Button onClick={handleCopyToClipboard}>
				Copy text
			</Button>
		</div>
	)
}

export default TagTextAddedArea