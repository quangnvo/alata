import { Button } from "@/components/ui/button"
import TagSection from './TagSection';
import TagTextAddedArea from './TagTextAddedArea';

const TagBoard = () => {
	return (
		<div className="grid grid-cols-12 gap-4">
			<div className="col-span-9">
				<Button className='mb-5'>
					Add new category
				</Button>
				<TagSection />
			</div>

			<div className="col-span-3">
				<TagTextAddedArea />
			</div>
		</div>
	)
}

export default TagBoard