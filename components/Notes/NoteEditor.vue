<template>
  <form @submit.prevent="onSubmit" class="note-form">
    <input v-model="form.title" placeholder="Judul Notes" required class="input-primary" />
    <quill-editor v-model="form.body" :options="editorOptions" class="input-primary" />
    <div class="form-actions">
      <button type="submit" class="btn-primary">{{ form.id ? 'Update' : 'Tambah' }} Notes</button>
      <button v-if="form.id" type="button" @click="$emit('cancel')" class="btn-primary" style="background:#ccc;color:#333;">Batal</button>
    </div>
  </form>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: { quillEditor },
  props: { note: Object },
  data() {
    return {
      form: this.note ? { ...this.note } : { title: '', body: '' },
      editorOptions: { theme: 'snow', placeholder: 'Isi Notes...' }
    }
  },
  watch: {
    note: {
      handler(val) { this.form = val ? { ...val } : { title: '', body: '' } },
      deep: true
    }
  },
  methods: {
    onSubmit() {
      this.$emit('save', { ...this.form })
    }
  }
}
</script>
<style lang="scss">
@use '~/assets/styles/theme-pink.scss' as *;
.note-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: $color-white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(233,30,99,0.07);
  margin-bottom: 1.5rem;
}
.form-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
@media (max-width: 600px) {
  .note-form {
    padding: 0.7rem;
    border-radius: 8px;
  }
  .form-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style> 