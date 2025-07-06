<template>
  <div class="couple-summary" :style="backgroundStyle">
    <div class="overlay">
      <h2 class="names">{{ couple.myName }} &amp; {{ couple.partnerName || '...' }}</h2>
      <p v-if="daysTogether !== null" class="days">
        ❤️ {{ daysTogether }} days together
      </p>
      <div class="mood-selector">
        <span v-for="m in moods" :key="m" class="mood-item" :class="{ active: m === couple.mood }" @click="$emit('change-mood', m)">
          {{ m }}
        </span>
      </div>
      <p v-if="nextPeriod" class="period-info">
        🩸 Next period predicted: {{ formatDate(nextPeriod) }}
      </p>
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

<style scoped>
.couple-summary {
  position: relative;
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  overflow: hidden;
  color: white;
  text-align: center;
  padding: 3rem 1rem;
}
.overlay {
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border-radius: 15px;
}
.names {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.days {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}
.mood-selector {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.mood-item {
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;
}
.mood-item:hover {
  transform: scale(1.2);
}
.mood-item.active {
  transform: scale(1.3);
}
.period-info {
  font-size: 0.9rem;
}
</style>