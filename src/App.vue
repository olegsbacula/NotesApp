<script setup>
import { ref, watch } from 'vue'
import { useNoteStore } from './stores/localstore.js'

const showModal = ref(false)
const store = useNoteStore()


function onAddClick() {
  store.addNote()
  showModal.value = false
}

function closeModal() {
  showModal.value = false
}


</script>


<template>
  <main>
    <div class="overlay" v-if="showModal">
    <div class="modal">
      <textarea name="note" id="note" v-model="store.newNote" cols="30" rows="10" placeholder="Enter your note here."></textarea>
        <button @click="onAddClick()">Add Note</button>
        <button class="close" @click="closeModal()">Close</button>
    </div></div> 
    <div class="container">
      <header>
        <h1>Notes</h1>
          <div class="btn-group">
            <button @click="showModal = true">+</button>
            <button class="local" @click="store.clearNotes()">🗑</button>
          </div>
      </header>
  
      <div class="card-container">
        <div class="card"
        v-for="(note, i) in store.notes"
        :key="i"
        :style="{ backgroundColor: note.backgroundColor }">
          <button class="delete-note" @click="store.deleteNote(i)">✖</button>
          <p class="main-text">{{ note.text }}</p>
          <p class="date">{{ new Date(note.date).toLocaleDateString("lv-LV") }}</p>
        </div>
        </div>
      </div>
  </main>
</template>
<style scoped>
header {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  background-color: white;
}


h1 {
  margin-left:15%;      
  font-size: 75px;
  font-weight: bold;
  color: #000;
}


.btn-group {
  display: flex;
  margin-top: 2%;
  margin-right: 15%;
  flex-direction: column;
  gap: 10px;
}


.btn-group button {
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
  background-color: rgb(21,20,20);
  color: white;
  border-radius: 50%;
   margin-left: 10px;
  padding: 0;          
}
  main{
    height: 100vh;
    width: 100vw;
    background-color: white;

  }
  .conainer{
    max-width: 1000px;
    padding:10px;
    margin:0 auto;
  }
  .card{
    position: relative;
    width:225px;
    height:225px;
    background-color: rgb(237,182,44);
    padding:10px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius:15px;
    margin-top:2.5%;
  }
  .main-text{
    color:black;
    font-weight: 5px;
    margin-top:10px;
    word-wrap: break-word;
  overflow-wrap: break-word;
  }
  .date{
    font-size:12.5px;
    color:black;
    font-weight: bold;
  }

  .card-container{
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 0.23fr));
    gap: 16px;
    justify-content: center;
  }

  .overlay{
    position: absolute;
    width: 100%;
    height:100%;
    background-color:rgba(0,0,0,0.27);
    z-index:10;
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .modal{
    width:750px;
    background-color: white;
    border-radius:10px;
    padding:30px;
    position:relative;
    display:flex;
    flex-direction:column;
  }
  .modal button{
    padding:10px 20px;
    font-size: 20px;
    width:100%;
    background-color:blueviolet;
    border:none;
    color:white;
    cursor:pointer;
    margin-top:15px;

  }
  .modal .close{
    background-color: red;
    margin-top:7px;
  }
  .delete-note{
   position: absolute;
  top:  8px;
  right: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  }
</style>