<template>
  <div>
    <h1>Notes</h1>
    <NoteEditor v-if="editing" :note="editing" @save="saveNote" @cancel="editing=null" />
    <NoteEditor v-else @save="addNote" />
    <NoteList :notes="notes" @edit="editNote" @delete="deleteNote" />
    <BottomBar />
  </div>
</template>
<script>
import NoteEditor from '~/components/Notes/NoteEditor.vue'
import NoteList from '~/components/Notes/NoteList.vue'
import BottomBar from '~/components/BottomBar.vue'
export default {
  components: { NoteEditor, NoteList, BottomBar },
  data() { return { editing: null } },
  computed: {
    notes() { return this.$store.state.notes.notes }
  },
  async mounted() {
    await this.$store.dispatch('notes/fetchNotes')
  },
  methods: {
    async addNote(note) {
      await this.$store.dispatch('notes/addNote', note)
    },
    async saveNote(note) {
      await this.$store.dispatch('notes/updateNote', note)
      this.editing = null
    },
    editNote(note) { this.editing = note },
    async deleteNote(id) {
      await this.$store.dispatch('notes/deleteNote', id)
    }
  }
}
</script>
