<template>
  <form @submit.prevent="onSubmit">
    <input v-model="form.title" placeholder="Nama Event" required />
    <textarea v-model="form.desc" placeholder="Deskripsi" />
    <input v-model="form.start" type="datetime-local" required />
    <input v-model="form.end" type="datetime-local" required />
    <button type="submit">{{ form.id ? 'Update' : 'Tambah' }} Event</button>
    <button v-if="form.id" type="button" @click="$emit('cancel')">Batal</button>
  </form>
</template>
<script>
export default {
  props: { event: Object },
  data() {
    return {
      form: this.event ? { ...this.event } : { title: '', desc: '', start: '', end: '' }
    }
  },
  watch: {
    event: {
      handler(val) { this.form = val ? { ...val } : { title: '', desc: '', start: '', end: '' } },
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