<template>
  <form @submit.prevent="onSubmit">
    <input v-model="form.title" placeholder="Judul Reminder" required />
    <textarea v-model="form.desc" placeholder="Deskripsi" />
    <input v-model="form.datetime" type="datetime-local" required />
    <button type="submit">{{ form.id ? 'Update' : 'Tambah' }} Reminder</button>
    <button v-if="form.id" type="button" @click="$emit('cancel')">Batal</button>
  </form>
</template>
<script>
export default {
  props: { reminder: Object },
  data() {
    return {
      form: this.reminder ? { ...this.reminder } : { title: '', desc: '', datetime: '' }
    }
  },
  watch: {
    reminder: {
      handler(val) { this.form = val ? { ...val } : { title: '', desc: '', datetime: '' } },
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