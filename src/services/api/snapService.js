import { delay } from '../index'
import snapsData from '../mockData/snaps.json'

let snaps = [...snapsData]

const snapService = {
  async getAll() {
    await delay(300)
    return [...snaps]
  },

  async getById(id) {
    await delay(200)
    const snap = snaps.find(s => s.id === id)
    if (!snap) throw new Error('Snap not found')
    return { ...snap }
  },

  async create(snapData) {
    await delay(400)
    const newSnap = {
      id: Date.now().toString(),
      ...snapData,
      createdAt: new Date().toISOString(),
      expiresAt: snapData.duration > 0 
        ? new Date(Date.now() + snapData.duration * 1000).toISOString() 
        : null
    }
    snaps.unshift(newSnap)
    return { ...newSnap }
  },

  async update(id, updates) {
    await delay(300)
    const index = snaps.findIndex(s => s.id === id)
    if (index === -1) throw new Error('Snap not found')
    
    snaps[index] = { ...snaps[index], ...updates }
    return { ...snaps[index] }
  },

  async delete(id) {
    await delay(250)
    const index = snaps.findIndex(s => s.id === id)
    if (index === -1) throw new Error('Snap not found')
    
    snaps.splice(index, 1)
    return true
  },

  async getExpired() {
    await delay(200)
    const now = new Date()
    return snaps.filter(snap => 
      snap.expiresAt && new Date(snap.expiresAt) < now
    )
  },

  async archive(id) {
    await delay(250)
    return this.update(id, { isArchived: true })
  }
}

export default snapService