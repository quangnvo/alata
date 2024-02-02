import { Button } from "@/components/ui/button"
import TagSection from './TagSection';
import TagTextAddedArea from './TagTextAddedArea';
import { useAppSelector } from "@/redux/hooks";

const TagBoard = () => {
	const { tagSection } = useAppSelector((state) => state.tagReducer);

	return (
		<div>
			<Button className='mb-5 bg-yellow-400 text-black'>
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
