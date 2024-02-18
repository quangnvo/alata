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
		{
			sectionName: 'Business',
			tags: [
				'entrepreneurship',
				'startups',
				'leadership',
				'productivity',
				'career',
				'marketing',
				'social media',
				'finance',
				'investing',
				'technology',
				'ecommerce',
			],
		},
		{
			sectionName: 'Technology',
			tags: [
				'programming',
				'web development',
				'javascript',
				'react',
				'node.js',
				'python',
				'java',
				'c#',
				'cloud computing',
				'cybersecurity',
				'blockchain',
			],
		},
		{
			sectionName: 'Food',
			tags: [
				'recipes',
				'cooking',
				'baking',
				'healthy eating',
				'food culture',
				'restaurants',
				'foodie travel',
				'food trends',
				'food science',
				'food history',
				'food news',
			],
		},
		{
			sectionName: 'Science',
			tags: [
				'biology',
				'chemistry',
				'physics',
				'astronomy',
				'geology',
				'environment',
				'climate change',
				'ecology',
				'conservation',
				'zoology',
				'botany',
			],
		},
		{
			sectionName: 'Sports',
			tags: [
				'football',
				'basketball',
				'baseball',
				'soccer',
				'golf',
				'tennis',
				'cycling',
				'running',
				'swimming',
				'surfing',
				'skateboarding',
			],
		},
		{
			sectionName: 'Entertainment',
			tags: [
				'movies',
				'tv shows',
				'celebrities',
				'music',
				'concerts',
				'festivals',
				'gaming',
				'comics',
				'animation',
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
		{
			bookmarkName: 'Bookmark 3',
			tags: ['tag7', 'tag8', 'tag9'],
		},
		{
			bookmarkName: 'Bookmark 4',
			tags: ['tag10', 'tag11', 'tag12'],
		},
		{
			bookmarkName: 'Bookmark 5',
			tags: ['tag13', 'tag14', 'tag15'],
		},
		{
			bookmarkName: 'Bookmark 6',
			tags: ['tag16', 'tag17', 'tag18'],
		},
		{
			bookmarkName: 'Bookmark 7',
			tags: ['tag19', 'tag20', 'tag21'],
		},
		{
			bookmarkName: 'Bookmark 8',
			tags: ['tag22', 'tag23', 'tag24'],
		},
		{
			bookmarkName: 'Bookmark 9',
			tags: ['tag25', 'tag26', 'tag27'],
		},
		{
			bookmarkName: 'Bookmark 10',
			tags: ['tag28', 'tag29', 'tag30'],
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

		clearAllTagText: (state) => {
			state.tagTextAdded = ''
		},

		addTag: (state, action) => {
			const { sectionName, newTag } = action.payload
			// Trim the tag that the user added from the input
			const trimmedTag = newTag.trim()
			// Find the section that the user wants to add the tag to
			const section = state.tagSection.find(
				(section) => section.sectionName === sectionName
			)
			// If the section exists
			if (section) {
				// Check if the tag already exists in the section
				const isTagExisted = section.tags.includes(trimmedTag)
				// If the tag doesn't exist, add it
				if (!isTagExisted) {
					section.tags.push(trimmedTag)
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
			console.log('đã vào add bookmark', action.payload)
			state.bookmarks.push(action.payload)
		},

		deleteBookmark: (state, action) => {
			state.bookmarks = state.bookmarks.filter(
				(bookmark) => bookmark.bookmarkName !== action.payload
			)
		},

		addTagToBookmark: (state, action) => {
			const { bookmarkName, tag } = action.payload

			state.bookmarks = state.bookmarks.map((eachBookmark) => {
				if (eachBookmark.bookmarkName === bookmarkName) {
					// Check if the tag already exists
					if (!eachBookmark.tags.includes(tag)) {
						// If it doesn't exist, add it
						eachBookmark.tags.push(tag)
					}
				}
				return eachBookmark
			})
		},
	},
})

export const {
	addTagText,
	clearAllTagText,
	addTag,
	deleteTag,
	deleteAllTags,
	addSection,
	deleteSection,
	changeSectionName,
	addBookmark,
	deleteBookmark,
	addTagToBookmark,
} = tagSlice.actions

export default tagSlice.reducer
