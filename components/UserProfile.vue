<template>
  <div class="responsive-container">
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
<style lang="scss">
@use '~/assets/styles/theme-pink.scss' as *;
.responsive-container {
  max-width: 400px;
  margin: 1.5rem auto;
  padding: 0 1rem;
}
.user-profile {
  width: 100%;
  padding: 1.5rem 0.5rem;
}
.profile-card {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.85);
  border-radius: 18px;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 24px rgba(233,30,99,0.13), 0 2px 10px rgba(233,30,99,0.10);
  gap: 1.2rem;
  border: 2px solid $color-primary-light;
  backdrop-filter: blur(6px) saturate(1.1);
  -webkit-backdrop-filter: blur(6px) saturate(1.1);
}
.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin-right: 1.2rem;
  border: 3px solid $color-primary;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(233,30,99,0.13);
  background: $color-white;
}
.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.user-info h3 {
  margin: 0 0 0.5rem 0;
  color: $color-primary-dark;
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: 0.01em;
}
.email {
  color: $color-primary;
  margin: 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
}
.uid {
  color: #8a8a8a;
  margin: 0.25rem 0;
  font-size: 0.9rem;
  font-family: monospace;
  background: #f7f7f7;
  border-radius: 6px;
  padding: 0.1rem 0.5rem;
  display: inline-block;
}
.no-user {
  text-align: center;
  color: #8a8a8a;
  padding: 2rem;
  background: rgba(255,255,255,0.7);
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(233,30,99,0.07);
}
@media (max-width: 600px) {
  .responsive-container {
    padding: 0 0.2rem;
  }
  .profile-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.1rem 0.5rem;
    gap: 0.7rem;
  }
  .avatar {
    width: 54px;
    height: 54px;
    margin-right: 0;
  }
  .user-info h3 {
    font-size: 1.05rem;
  }
  .email {
    font-size: 0.95rem;
  }
  .uid {
    font-size: 0.8rem;
    padding: 0.08rem 0.3rem;
  }
}
</style> 