import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button';

const handleCopyToClipboard = (tags: string[]) => {
    const tagsText = tags.join(', ');
    navigator.clipboard.writeText(tagsText);
};

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
            <Button
                variant="destructive"
                onClick={() => console.log('delete')}>
                Delete
            </Button>

            {/* Button Update Bookmark */}
            <Button
                variant="secondary"
                onClick={() => console.log('update')}>
                Update
            </Button>
        </CardFooter>
    </Card>
);

const Bookmarks = () => {
    const bookmarks = useAppSelector((state) => state.tagReducer.bookmarks);

    return (
        <div>
            {bookmarks.map((bookmark) => (
                <BookmarkCard bookmark={bookmark} />
            ))}
        </div>
    );
};

export default Bookmarks;
