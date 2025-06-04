import { delay } from '../index'
import filtersData from '../mockData/filters.json'

let filters = [...filtersData]

const filterService = {
  async getAll() {
    await delay(200)
    return [...filters]
  },

  async getById(id) {
    await delay(150)
    const filter = filters.find(f => f.id === id)
    if (!filter) throw new Error('Filter not found')
    return { ...filter }
  },

  async getByType(type) {
    await delay(200)
    return filters.filter(f => f.type === type)
  },

  async create(filterData) {
    await delay(300)
    const newFilter = {
      id: Date.now().toString(),
      ...filterData
    }
    filters.push(newFilter)
    return { ...newFilter }
  },

  async update(id, updates) {
    await delay(250)
    const index = filters.findIndex(f => f.id === id)
    if (index === -1) throw new Error('Filter not found')
    
    filters[index] = { ...filters[index], ...updates }
    return { ...filters[index] }
  },

  async delete(id) {
    await delay(200)
    const index = filters.findIndex(f => f.id === id)
    if (index === -1) throw new Error('Filter not found')
    
    filters.splice(index, 1)
    return true
  }
}

export default filterService