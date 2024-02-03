import { Button } from "@/components/ui/button"
import TagSection from './TagSection';
import TagTextAddedArea from './TagTextAddedArea';
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addSection } from "@/redux/features/tagSlice";

const TagBoard = () => {
	const { tagSection } = useAppSelector((state) => state.tagReducer);
	const dispatch = useAppDispatch();

	const handleAddSectionClick = () => {
		const newSection = {
			sectionName: 'New Section',
			tags: [],
		};
		dispatch(addSection(newSection));
	};

	return (
		<div>
			<Button className='mb-5' onClick={handleAddSectionClick}>
				Add new section
			</Button>

			<div className="grid grid-cols-12 gap-4">
				{tagSection.map((section, index) => (
					<div key={index} className="col-span-9">
						<TagSection section={section} />
					</div>
				))}

				<div className="col-span-3">
					<TagTextAddedArea />
				</div>
			</div>
		</div>
	)
}

export default TagBoard;
