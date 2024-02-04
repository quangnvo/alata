import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	tagSection: [
		{
			sectionName: 'Travel',
			tags: [
				'beach',
				'adventure',
				'hiking',
				'camping',
				'city break',
				'culture',
				'foodie',
				'solo travel',
				'family travel',
				'luxury travel',
				'budget travel',
				'backpacking',
			],
		},
		{
			sectionName: 'Lifestyle',
			tags: [
				'beauty',
				'fashion',
				'health',
				'fitness',
				'wellness',
				'home',
				'garden',
				'family',
				'parenting',
				'pets',
				'books',
			],
		},
	],
	tagTextAdded: '',
}

const tagSlice = createSlice({
	name: 'tagReducer',
	initialState,
	reducers: {
		addTagText: (state, action) => {
			state.tagTextAdded = action.payload
		},
		addTag: (state, action) => {
			const { sectionName, newTag } = action.payload
			const section = state.tagSection.find(
				(section) => section.sectionName === sectionName
			)
			if (section) {
				section.tags.push(newTag)
			}
		},
		addSection: (state, action) => {
			state.tagSection.push(action.payload)
		},
		deleteTag: (state, action) => {
			const { sectionName, tagToDelete } = action.payload
			const section = state.tagSection.find(
				(section) => section.sectionName === sectionName
			)
			if (section) {
				section.tags = section.tags.filter((tag) => tag !== tagToDelete)
			}
		},
	},
})

export const { addTagText, addTag, addSection, deleteTag } = tagSlice.actions

export default tagSlice.reducer
