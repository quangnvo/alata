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

// Import icon from lucide-react
import { Trash } from 'lucide-react';


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
			<div className='flex gap-2'>
				{/* Button Add new section */}
				<Dialog>
					<DialogTrigger asChild className='mb-5'>
						<Button
							disabled={isDeleteSectionMode}
							variant="alatagAdd"
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
					variant={isDeleteSectionMode ? "default" : "alatagDelete"}
					onClick={() => setIsDeleteSectionMode(!isDeleteSectionMode)}
				>
					{isDeleteSectionMode ? 'Cancel delete' : <><Trash size={16} className='mr-1' /> section</>}
				</Button>
				{/* End of Button Delete section */}
			</div>

			<div className="grid grid-cols-12 gap-4">
				{/* Tag sections */}
				<div className='col-span-6'>

					{/* Render tag sections */}
					<div className='h-[70vh] overflow-y-auto pr-3'>
						{tagSection.length != 0 ?
							tagSection.map((section, index) => (
								<div key={index}>
									<TagSection section={section} isDeleteSectionMode={isDeleteSectionMode} />
								</div>
							))
							: null}
					</div>
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