<template>
  <div class="responsive-container">
    <div class="couple-summary" :style="backgroundStyle">
      <div class="overlay">
        <h2 class="names">{{ couple.myName }} &amp; {{ couple.partnerName || '...' }}</h2>
        <p v-if="daysTogether !== null" class="days">
          84 {{ daysTogether }} days together
        </p>
        <div class="mood-selector">
          <span v-for="m in moods" :key="m" class="mood-item" :class="{ active: m === couple.mood }" @click="$emit('change-mood', m)">
            {{ m }}
          </span>
        </div>
        <p v-if="nextPeriod" class="period-info">
          78 Next period predicted: {{ formatDate(nextPeriod) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoupleSummary',
  props: {
    couple: {
      type: Object,
      required: true
    },
    daysTogether: {
      type: Number,
      default: null
    },
    nextPeriod: {
      type: Date,
      default: null
    }
  },
  data() {
    return {
      moods: ['😍', '😊', '😐', '😢', '😡']
    }
  },
  computed: {
    backgroundStyle() {
      if (this.couple?.backgroundPhotoUrl) {
        return {
          backgroundImage: `url(${this.couple.backgroundPhotoUrl})`
        }
      }
      return {
        background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)'
      }
    }
  },
  methods: {
    formatDate(date) {
      return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
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
.couple-summary {
  position: relative;
  background-size: cover;
  background-position: center;
  border-radius: 18px;
  overflow: hidden;
  color: $color-white;
  text-align: center;
  padding: 3rem 1rem;
  box-shadow: 0 4px 32px 0 rgba(233,30,99,0.13), 0 1.5px 8px rgba(233,30,99,0.09);
}
.overlay {
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(8px) saturate(1.2);
  -webkit-backdrop-filter: blur(8px) saturate(1.2);
  padding: 2.2rem 1.2rem;
  border-radius: 18px;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 2px 12px rgba(233,30,99,0.08);
}
.names {
  font-size: 2.1rem;
  margin-bottom: 0.7rem;
  color: $color-primary;
  text-shadow: 0 2px 12px $color-white, 0 1px 2px $color-primary-dark;
  font-weight: 800;
}
.days {
  font-size: 1.15rem;
  margin-bottom: 1.2rem;
  color: $color-accent;
  text-shadow: 0 1px 4px $color-white;
}
.mood-selector {
  display: flex;
  justify-content: center;
  gap: 0.7rem;
  margin-bottom: 1.2rem;
}
.mood-item {
  font-size: 1.6rem;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s, color 0.2s;
  background: $color-white;
  color: $color-primary;
  border-radius: 50%;
  padding: 0.4rem 0.7rem;
  box-shadow: 0 1px 4px rgba(233,30,99,0.07);
  user-select: none;
  border: 2px solid transparent;
}
.mood-item:hover {
  transform: scale(1.18);
  background: $color-primary-light;
  color: $color-white;
  border: 2px solid $color-primary-dark;
}
.mood-item.active {
  transform: scale(1.25);
  background: $color-primary;
  color: $color-white;
  border: 2px solid $color-accent;
}
.period-info {
  font-size: 1.05rem;
  margin-top: 1.2rem;
  background: rgba(255,255,255,0.22);
  border-radius: 10px;
  padding: 0.6rem 1.2rem;
  display: inline-block;
  color: $color-primary-dark;
  font-weight: 600;
  text-shadow: 0 1px 4px $color-white;
}
@media (max-width: 600px) {
  .responsive-container {
    padding: 0 0.2rem;
  }
  .overlay {
    padding: 1.1rem 0.3rem;
  }
  .names {
    font-size: 1.3rem;
  }
  .mood-item {
    font-size: 1.1rem;
    padding: 0.2rem 0.4rem;
  }
}
</style>