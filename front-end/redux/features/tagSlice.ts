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
			state.tagSection[0].tags.push(action.payload)
		},
		addSection: (state, action) => {
			state.tagSection.push(action.payload)
		},
	},
})

export const { addTagText, addTag, addSection } = tagSlice.actions

export default tagSlice.reducer
