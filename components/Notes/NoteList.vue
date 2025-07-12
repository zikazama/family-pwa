<template>
  <div>
    <div v-for="note in notes" :key="note.id" class="note-item">
      <div>
        <b>{{ note.title }}</b> <br/>
        <div v-html="note.body" class="note-body"></div>
        <small>Dibuat: {{ note.createdBy }} | Diperbarui: {{ note.updatedBy }} ({{ note.updatedAt | date }})</small>
      </div>
      <button @click="$emit('edit', note)">Edit</button>
      <button @click="$emit('delete', note.id)">Hapus</button>
    </div>
  </div>
</template>
<script>
export default {
  props: { notes: Array },
  filters: {
    date(val) {
      if (!val) return ''
      return new Date(val).toLocaleString('id-ID')
    }
  }
}
</script>
<style scoped>
.note-item { margin-bottom: 1rem; padding: 1rem; background: #fff0f6; border-radius: 8px; }
.note-body { margin: 0.5rem 0; }
</style> 