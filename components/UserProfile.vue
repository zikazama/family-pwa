<template>
  <div class="user-profile">
    <div v-if="user" class="profile-card">
      <img :src="user.photoURL" :alt="user.displayName" class="avatar">
      <div class="user-info">
        <h3>{{ user.displayName }}</h3>
        <p class="email">{{ user.email }}</p>
        <p class="uid">ID: {{ user.uid }}</p>
      </div>
    </div>
    <div v-else class="no-user">
      <p>No user information available</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.user-profile {
  max-width: 400px;
  margin: 0 auto;
}

.profile-card {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 1rem;
  border: 3px solid #e91e63;
}

.user-info h3 {
  margin: 0 0 0.5rem 0;
  color: #35495e;
  font-size: 1.2rem;
}

.email {
  color: #526488;
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.uid {
  color: #8a8a8a;
  margin: 0.25rem 0;
  font-size: 0.8rem;
  font-family: monospace;
}

.no-user {
  text-align: center;
  color: #8a8a8a;
  padding: 2rem;
}
</style> 