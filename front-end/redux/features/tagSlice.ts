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
	bookmarks: [
		{
			bookmarkName: 'Bookmark 1',
			tags: ['tag1', 'tag2', 'tag3'],
		},
		{
			bookmarkName: 'Bookmark 2',
			tags: ['tag4', 'tag5', 'tag6'],
		},
	],
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
				// Check if the tag already exists in the section
				const isTagExisted = section.tags.includes(newTag)
				if (!isTagExisted) {
					// If the tag doesn't exist, add it
					section.tags.push(newTag)
				}
			}
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

		deleteAllTags: (state, action) => {
			const section = state.tagSection.find(
				(section) => section.sectionName === action.payload
			)
			console.log(section)
			if (section) {
				section.tags = []
				console.log('section.tags', section.tags)
			}
		},

		addSection: (state, action) => {
			state.tagSection.push(action.payload)
		},

		deleteSection: (state, action) => {
			// Find the section to delete
			const sectionToDelete = state.tagSection.find(
				(section) => section.sectionName === action.payload
			)

			if (sectionToDelete) {
				// Remove the section from the tagSection array
				state.tagSection = state.tagSection.filter(
					(section) => section.sectionName !== action.payload
				)

				// Split the tagTextAdded string into an array of tags
				const tags = state.tagTextAdded.split(',').map((tag) => tag.trim())

				// Filter out the tags of the deleted section
				const updatedTags = tags.filter(
					(tag) => !sectionToDelete.tags.includes(tag)
				)

				// Join the array back into a string and update the tagTextAdded string
				state.tagTextAdded = updatedTags.join(', ')
			}
		},

		changeSectionName: (state, action) => {
			const { oldSectionName, newSectionName } = action.payload
			const section = state.tagSection.find(
				(section) => section.sectionName === oldSectionName
			)
			if (section) {
				section.sectionName = newSectionName
			}
		},

		addBookmark: (state, action) => {
			state.bookmarks.push(action.payload)
		},

		deleteBookmark: (state, action) => {
			state.bookmarks = state.bookmarks.filter(
				(bookmark) => bookmark.bookmarkName !== action.payload
			)
		},

		updateBookmark: (state, action) => {
			const { name, newTags } = action.payload
			const bookmark = state.bookmarks.find(
				(bookmark) => bookmark.bookmarkName === name
			)
			if (bookmark) {
				bookmark.tags = newTags
			}
		},
	},
})

export const {
	addTagText,
	addTag,
	deleteTag,
	deleteAllTags,
	addSection,
	deleteSection,
	changeSectionName,
} = tagSlice.actions

export default tagSlice.reducer
