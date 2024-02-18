"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import TagSection from './TagSection';
import TagTextAddedArea from './TagTextAddedArea';
import Bookmarks from './Bookmarks';
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { Input } from "@/components/ui/input"
import { addSection } from "@/redux/features/tagSlice";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from "@/components/ui/dialog"


const TagBoard = () => {
	const { tagSection } = useAppSelector((state) => state.tagReducer);
	const dispatch = useAppDispatch();
	const [newSectionName, setNewSectionName] = useState('');
	const [isDeleteSectionMode, setIsDeleteSectionMode] = useState(false);

	// Function to handle form submit, to let user click "Enter" to submit the new section
	const handleFormSubmit = (event: any) => {
		event.preventDefault();
		if (newSectionName.trim() === '') {
			return;
		}
		const newSection = {
			sectionName: newSectionName,
			tags: [],  // Initialize tags as an empty array
		};
		dispatch(addSection(newSection));
		setNewSectionName('');
	};

	// Render UI for TagBoard
	return (
		<div>
			<div className='mb-5'>
				<p className='font-bold text-lg mb-2'>Viec can lam</p>
				<ul className='list-disc list-inside space-y-2'>
					<li className='text-blue-600'>Button - Clear all - DONE</li>
					<li className='text-blue-600'>Button - Add bookmark - DONE</li>
					<li className='text-blue-600'>Button - Delete bookmark - DONE</li>
					<li className='text-blue-600'>Button - Update bookmark - DONE</li>
					<li className='text-red-600'>Fix bug - Cố định text area</li>
					<li className='text-red-600'>Fix bug - Add tag bị lỗi "1" và "  1" bị hiểu là khác nhau</li>
				</ul>
			</div>

			<div className="grid grid-cols-12 gap-4">
				{/* Tag sections */}
				<div className='col-span-6'>

					<div className='flex gap-2'>
						{/* Button Add new section */}
						<Dialog>
							<DialogTrigger asChild className='mb-5'>
								<Button
									disabled={isDeleteSectionMode}
								>
									Add new section
								</Button>
							</DialogTrigger>

							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>
										Add new section
									</DialogTitle>
								</DialogHeader>

								<form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
									<label>
										<Input
											type="text"
											value={newSectionName}
											onChange={e => setNewSectionName(e.target.value)}
											placeholder="Section name"
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
						{/* End of Button Add new section */}

						{/* Button Delete Section */}
						<Button
							variant={isDeleteSectionMode ? "default" : "destructive"}
							onClick={() => setIsDeleteSectionMode(!isDeleteSectionMode)}
						>
							{isDeleteSectionMode ? 'Cancel delete' : 'Delete section'}
						</Button>
						{/* End of Button Delete section */}
					</div>

					{/* Render tag sections */}
					{tagSection.length != 0 ?
						tagSection.map((section, index) => (
							<div key={index}>
								<TagSection section={section} isDeleteSectionMode={isDeleteSectionMode} />
							</div>
						))
						: null}
					{/* End of rendering tag sections */}
				</div>

				{/* Bookmarks */}
				<div className='col-span-3'>
					<Bookmarks />
				</div>
				{/* End of Bookmarks */}

				{/* Tag text added area */}
				<div className="col-span-3">
					<TagTextAddedArea />
				</div>
				{/* End of Tag text added area */}
			</div>
		</div>
	)
}

export default TagBoard;