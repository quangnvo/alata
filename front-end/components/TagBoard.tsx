"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import TagSection from './TagSection';
import TagTextAddedArea from './TagTextAddedArea';
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

	const handleFormSubmit = () => {
		const newSection = {
			sectionName: newSectionName,
			tags: [],  // Initialize tags as an empty array
		};
		dispatch(addSection(newSection));
		setNewSectionName('');
	};

	return (
		<div>
			<div className='flex gap-2'>
				{/* Button Add Section */}
				<Dialog>
					<DialogTrigger asChild className='mb-5'>
						<Button>
							Add new section
						</Button>
					</DialogTrigger>

					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>
								Add new section
							</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<label>
								<Input
									type="text"
									value={newSectionName}
									onChange={e => setNewSectionName(e.target.value)}
									placeholder="Section name"
								/>
							</label>
						</div>

						<DialogFooter>
							<Button type="submit" onClick={handleFormSubmit}>Save</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				{/* Button Delete Section */}
				<Button
					variant={isDeleteSectionMode ? "default" : "destructive"}
					onClick={() => setIsDeleteSectionMode(!isDeleteSectionMode)}
				>
					{isDeleteSectionMode ? 'Cancel delete' : 'Delete section'}
				</Button>

			</div>

			<div className="grid grid-cols-12 gap-4">
				{/* Tag sections */}
				{tagSection.map((section, index) => (
					<div key={index} className="col-span-9">
						<TagSection section={section} isDeleteSectionMode={isDeleteSectionMode} />
					</div>
				))}

				{/* Tag text added area */}
				<div className="col-span-3">
					<TagTextAddedArea />
				</div>
			</div>
		</div>
	)
}

export default TagBoard;
