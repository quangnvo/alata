import React from 'react';

import BookmarkCard from './BookmarkCard';

import { useAppSelector } from '@/redux/hooks';

const Bookmarks = () => {
	// Take "bookmarks" from Redux store
	const bookmarks = useAppSelector((state) => state.tagReducer.bookmarks);

	// Render Bookmarks with BookmarkCard, in each BookmarkCard, there are 3 buttons: Copy text, Delete Bookmark, Update Bookmark
	return (
		<div className='h-[70vh] overflow-y-auto pr-3'>
			{bookmarks.map((bookmark) => {
				return <BookmarkCard bookmark={bookmark} />
			})}
		</div>
	);
};

export default Bookmarks;
