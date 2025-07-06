<template>
  <div class="notes-page">
    <h1>📝 Shared Notes</h1>

    <form @submit.prevent="addNote" class="note-form">
      <textarea v-model="content" rows="3" placeholder="Write a new note..." required></textarea>
      <button type="submit" class="btn-add" :disabled="!content">Add Note</button>
    </form>

    <div v-if="notes.length" class="notes-list">
      <div class="note-item" v-for="n in notes" :key="n.id">
        <textarea v-model="n.content" @change="updateNote(n)" rows="3"></textarea>
        <button class="btn-delete" @click="deleteNote(n.id)">🗑️</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NotesPage',
  head() {
    return { title: 'Shared Notes - Zira' }
  },
  data() {
    return { content: '' }
  },
  computed: { ...mapGetters({ notes: 'notes/notes' }) },
  mounted() { this.$store.dispatch('notes/fetchNotes') },
  methods: {
    async addNote() {
      await this.$store.dispatch('notes/addNote', this.content)
      this.content = ''
    },
    async updateNote(note) {
      await this.$store.dispatch('notes/updateNote', { id: note.id, content: note.content })
    },
    async deleteNote(id) {
      if (confirm('Delete this note?')) {
        await this.$store.dispatch('notes/deleteNote', id)
      }
    }
  }
}
</script>

<style scoped>

.notes-page { max-width: 700px; margin:0 auto; padding:2rem; }
h1 { text-align:center; margin-bottom:1.5rem; }
.note-form { display:flex; flex-direction:column; gap:0.5rem; margin-bottom:2rem; }
.note-form textarea { padding:0.8rem; border:1px solid #ccc; border-radius:6px; font-size:1rem; }
.btn-add { padding:0.6rem 1.2rem; background:#e91e63; color:#fff; border:none; border-radius:25px; cursor:pointer; align-self:flex-end; }
.notes-list { display:flex; flex-direction:column; gap:1rem; }
.note-item { position:relative; }
.note-item textarea { width:100%; padding:0.8rem; border:1px solid #ccc; border-radius:8px; font-size:1rem; }
.btn-delete { position:absolute; right:8px; top:8px; background:none; border:none; cursor:pointer; font-size:1.1rem; }
</style>