<template>
  <div>
    <div v-for="note in notes" :key="note.id" class="note-item">
      <div>
        <b>{{ note.title }}</b> <br/>
        <div v-html="note.body" class="note-body"></div>
        <small>Dibuat: {{ note.createdBy }} | Diperbarui: {{ note.updatedBy }} ({{ note.updatedAt | date }})</small>
      </div>
      <div class="note-actions">
        <button @click="$emit('edit', note)" class="btn-primary">Edit</button>
        <button @click="$emit('delete', note.id)" class="btn-primary" style="background:#ccc;color:#333;">Hapus</button>
      </div>
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
<style lang="scss">
@use '~/assets/styles/theme-pink.scss' as *;
.note-item {
  margin-bottom: 1rem;
  padding: 1rem;
  background: #fff0f6;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(233,30,99,0.07);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.note-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
@media (max-width: 600px) {
  .note-item {
    padding: 0.5rem;
    border-radius: 6px;
  }
  .note-actions {
    flex-direction: column;
    gap: 0.3rem;
  }
}
</style> 