import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useNoteStore = defineStore('note', () => {

  function getRandomColor() {
    return `hsl(${Math.random() * 360}, 100%, 75%)`
  }


  const newNote = ref('')


  const notes = ref(
    JSON.parse(localStorage.getItem('notes') || '[]')
  )

    const addNote = () => {
    if (newNote.value.length <= 5) {
      alert('Too short — gotta have more than 10 characters!')
      return
    }
    notes.value.push({
      text: newNote.value,
      date: new Date().toISOString(),
      backgroundColor: getRandomColor(),
    })
    newNote.value = ''
  }


  const deleteNote = idx => {
    notes.value.splice(idx, 1)
  }

  watch(
    notes,
    (newVal) => {
      localStorage.setItem('notes', JSON.stringify(newVal))
    },
    { deep: true }
  )

  return {
    newNote,
    notes,
    addNote,
    deleteNote,
  }
})
