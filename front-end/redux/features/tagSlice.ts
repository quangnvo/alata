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
				'road trip',
				'sightseeing',
				'wildlife',
				'national parks',
				'mountains',
				'islands',
				'desert',
				'historical sites',
				'local cuisine',
				'relaxation',
				'exotic destinations',
				'water activities',
				'winter sports',
				'tropical getaways',
				'ecotourism',
				'photography',
				'cultural festivals',
				'travel tips',
				'travel planning',
				'travel gadgets',
				'travel hacks',
				'travel insurance',
				'airbnb',
				'hotels',
				'hostels',
				'resorts',
				'cruise',
				'train travel',
				'backcountry travel',
				'travel health',
				'travel safety',
			],
		},
	],
	tagTextAdded: 'gdgdgd',
}

const tagSlice = createSlice({
	name: 'tagReducer',
	initialState,
	reducers: {},
})

export const {} = tagSlice.actions

export default tagSlice.reducer
