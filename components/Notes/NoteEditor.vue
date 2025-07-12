<template>
  <form @submit.prevent="onSubmit">
    <input v-model="form.title" placeholder="Judul Notes" required />
    <quill-editor v-model="form.body" :options="editorOptions" />
    <button type="submit">{{ form.id ? 'Update' : 'Tambah' }} Notes</button>
    <button v-if="form.id" type="button" @click="$emit('cancel')">Batal</button>
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