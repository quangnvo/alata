import React from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

import { Button } from './ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog"

import { deleteBookmark } from '@/redux/features/tagSlice';


const Bookmarks = () => {
	const bookmarks = useAppSelector((state) => state.tagReducer.bookmarks);
	const dispatch = useAppDispatch();

// Copy text in BookmarkCard 
	const handleCopyToClipboard = (tags: string[]) => {
		const tagsText = tags.join(', ');
		navigator.clipboard.writeText(tagsText);
	};

	// BookmarkCard component
	const BookmarkCard = ({ bookmark }: any) => (
		<Card
			key={bookmark.bookmarkName}
			className="mb-4"
		>
			<CardHeader>
				<CardTitle>{bookmark.bookmarkName}</CardTitle>
			</CardHeader>
			<CardContent>
				<ul>
					{bookmark.tags.map((tag: any, index: any) => (
						<li key={index}>{tag}</li>
					))}
				</ul>
			</CardContent>
			<CardFooter className='flex gap-2'>
				{/* Button Copy text in Bookmark */}
				<Button
					variant="secondary"
					onClick={() => handleCopyToClipboard(bookmark.tags)}>
					Copy text
				</Button>

				{/* Button Delete Bookmark */}
				<Dialog key={bookmark.bookmarkName}>
					<DialogTrigger asChild>
						<Button
							variant="destructive"
						>
							Delete Bookmark
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

				{/* Button Update Bookmark */}
				<Button
					variant="secondary"
					onClick={() => console.log('update')}>
					Update
				</Button>
			</CardFooter>
		</Card>
	);

	// Render Bookmarks with BookmarkCard, in each BookmarkCard, there are 3 buttons: Copy text, Delete Bookmark, Update Bookmark
	return (
		<div>
			{bookmarks.map((bookmark) => (
				<BookmarkCard bookmark={bookmark} />
			))}
		</div>
	);
};

export default Bookmarks;
