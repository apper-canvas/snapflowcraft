import { delay } from '../index'
import editsData from '../mockData/edits.json'

let edits = [...editsData]

const editService = {
  async getAll() {
    await delay(200)
    return [...edits]
  },

  async getById(id) {
    await delay(150)
    const edit = edits.find(e => e.id === id)
    if (!edit) throw new Error('Edit not found')
    return { ...edit }
  },

  async create(editData) {
    await delay(300)
    const newEdit = {
      id: Date.now().toString(),
      ...editData,
      createdAt: new Date().toISOString()
    }
    edits.push(newEdit)
    return { ...newEdit }
  },

  async update(id, updates) {
    await delay(250)
    const index = edits.findIndex(e => e.id === id)
    if (index === -1) throw new Error('Edit not found')
    
    edits[index] = { ...edits[index], ...updates }
    return { ...edits[index] }
  },

  async delete(id) {
    await delay(200)
    const index = edits.findIndex(e => e.id === id)
    if (index === -1) throw new Error('Edit not found')
    
    edits.splice(index, 1)
    return true
  },

  async applyToSnap(snapId, editData) {
    await delay(300)
    const edit = {
      id: Date.now().toString(),
      snapId,
      ...editData,
      createdAt: new Date().toISOString()
    }
    edits.push(edit)
    return { ...edit }
  }
}

export default editService