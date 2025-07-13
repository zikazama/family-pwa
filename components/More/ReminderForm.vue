<template>
  <div class="responsive-container">
    <form @submit.prevent="onSubmit" class="reminder-form">
      <input v-model="form.title" placeholder="Judul Reminder" required class="input-primary" />
      <textarea v-model="form.desc" placeholder="Deskripsi" class="input-primary" />
      <input v-model="form.datetime" type="datetime-local" required class="input-primary" />
      <div class="form-actions">
        <button type="submit" class="btn-primary">{{ form.id ? 'Update' : 'Tambah' }} Reminder</button>
        <button v-if="form.id" type="button" @click="$emit('cancel')" class="btn-primary btn-cancel">Batal</button>
      </div>
    </form>
  </div>
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
<style lang="scss">
@use '~/assets/styles/theme-pink.scss' as *;
.responsive-container {
  max-width: 600px;
  margin: 1.5rem auto;
  padding: 0 1rem;
}
.reminder-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  background: rgba(255,255,255,0.85);
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(233,30,99,0.08);
  padding: 2rem 1.2rem 1.2rem 1.2rem;
}
.input-primary {
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: 2px solid $color-primary-light;
  background: $color-white;
  color: $color-primary-dark;
  font-size: 1rem;
  font-weight: 600;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(233,30,99,0.07);
  margin-bottom: 0.2rem;
}
.input-primary:focus {
  border: 2px solid $color-accent;
  outline: none;
  box-shadow: 0 2px 8px rgba(233,30,99,0.13);
}
.btn-primary {
  background: $color-primary;
  color: $color-white;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(233,30,99,0.07);
}
.btn-primary:hover, .btn-primary:focus {
  background: $color-primary-dark;
  outline: none;
}
.btn-cancel {
  background: #eee !important;
  color: #333 !important;
}
.form-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}
@media (max-width: 600px) {
  .responsive-container {
    padding: 0 0.2rem;
  }
  .reminder-form {
    padding: 1.1rem 0.3rem 0.7rem 0.3rem;
  }
  .form-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style> 