import { delay } from '../index'
import storiesData from '../mockData/stories.json'

let stories = [...storiesData]

const storyService = {
  async getAll() {
    await delay(300)
    return [...stories]
  },

  async getById(id) {
    await delay(200)
    const story = stories.find(s => s.id === id)
    if (!story) throw new Error('Story not found')
    return { ...story }
  },

  async create(storyData) {
    await delay(400)
    const newStory = {
      id: Date.now().toString(),
      ...storyData,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    }
    stories.unshift(newStory)
    return { ...newStory }
  },

  async update(id, updates) {
    await delay(300)
    const index = stories.findIndex(s => s.id === id)
    if (index === -1) throw new Error('Story not found')
    
    stories[index] = { 
      ...stories[index], 
      ...updates,
      lastUpdated: new Date().toISOString()
    }
    return { ...stories[index] }
  },

  async delete(id) {
    await delay(250)
    const index = stories.findIndex(s => s.id === id)
    if (index === -1) throw new Error('Story not found')
    
    stories.splice(index, 1)
    return true
  },

  async addSnap(storyId, snapId) {
    await delay(200)
    const story = stories.find(s => s.id === storyId)
    if (!story) throw new Error('Story not found')
    
    if (!story.snapIds.includes(snapId)) {
      story.snapIds.push(snapId)
      story.lastUpdated = new Date().toISOString()
    }
    
    return { ...story }
  },

  async removeSnap(storyId, snapId) {
    await delay(200)
    const story = stories.find(s => s.id === storyId)
    if (!story) throw new Error('Story not found')
    
    story.snapIds = story.snapIds.filter(id => id !== snapId)
    story.lastUpdated = new Date().toISOString()
    
    return { ...story }
  }
}

export default storyService