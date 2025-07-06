<template>
  <div class="savings-page">
    <h1>💰 Savings Tracker</h1>

    <form @submit.prevent="addSaving" class="savings-form">
      <div class="form-group toggle-group">
        <label for="routine">Routine Saving?</label>
        <input id="routine" type="checkbox" v-model="routine" />
      </div>

      <div class="form-group">
        <label for="monthly">Amount per Month (IDR)</label>
        <input id="monthly" type="number" v-model.number="monthlyAmount" min="0" required />
      </div>

      <div class="form-group">
        <label for="target">Target Amount (IDR)</label>
        <input id="target" type="number" v-model.number="targetAmount" min="0" required />
      </div>

      <p v-if="predictionText" class="prediction">⏳ {{ predictionText }}</p>

      <button type="submit" class="btn-add" :disabled="!canSubmit">Add Goal</button>
    </form>

    <div v-if="savings.length" class="list-wrapper">
      <h2>Existing Goals</h2>
      <div class="goal-item" v-for="s in savings" :key="s.id">
        <div>
          <p class="goal-title"><strong>{{ formatCurrency(s.targetAmount) }}</strong> - {{ s.routine ? 'Routine' : 'Occasional' }}</p>
          <p class="goal-info">Deposit: {{ formatCurrency(s.monthlyAmount) }} / month</p>
          <p v-if="s.estimation" class="goal-info">Estimated: {{ humanizeEstimation(s.estimation) }}</p>
          <p class="goal-date">Started: {{ formatDate(s.createdAt) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SavingsPage',
  head() {
    return { title: 'Savings Goals - Zira' }
  },
  data() {
    return {
      routine: true,
      monthlyAmount: null,
      targetAmount: null,
      predictionText: ''
    }
  },
  computed: {
    ...mapGetters({ savings: 'savings/savingsList' }),
    canSubmit() {
      return this.monthlyAmount > 0 && this.targetAmount > 0
    }
  },
  watch: {
    monthlyAmount: 'updatePrediction',
    targetAmount: 'updatePrediction',
    routine: 'updatePrediction'
  },
  mounted() {
    this.$store.dispatch('savings/fetchSavings')
  },
  methods: {
    updatePrediction() {
      if (!this.canSubmit) {
        this.predictionText = ''
        return
      }
      const months = this.targetAmount / this.monthlyAmount
      const totalDays = Math.ceil(months * 30)
      this.predictionText = this.humanizeDays(totalDays)
    },
    humanizeDays(days) {
      if (days < 7) return `${days} days to reach target`
      const weeks = days / 7
      if (weeks < 4) return `${Math.ceil(weeks)} weeks to reach target`
      const months = days / 30
      if (months < 12) return `${Math.ceil(months)} months to reach target`
      const years = months / 12
      return `${years.toFixed(1)} years to reach target`
    },
    humanizeEstimation(est) {
      if (!est) return 'No prediction'
      const months = est.months
      if (months < 1) {
        const days = Math.ceil(months * 30)
        return `${days} days`
      }
      if (months < 12) return `${Math.ceil(months)} months`
      const years = months / 12
      return `${years.toFixed(1)} years`
    },
    formatCurrency(num) {
      if (num == null) return '-'
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num)
    },
    formatDate(iso) {
      return new Date(iso).toLocaleDateString()
    },
    async addSaving() {
      if (!this.canSubmit) return
      await this.$store.dispatch('savings/addSaving', {
        routine: this.routine,
        monthlyAmount: this.monthlyAmount,
        targetAmount: this.targetAmount
      })
      // reset form
      this.monthlyAmount = null
      this.targetAmount = null
      this.updatePrediction()
    }
  }
}
</script>

<style scoped>

.savings-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.savings-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.toggle-group {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.prediction {
  font-style: italic;
  color: #555;
}

.btn-add {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: #e91e63;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

.btn-add:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.list-wrapper h2 {
  margin-bottom: 1rem;
}

.goal-item {
  background: #fff;
  padding: 1rem 1.2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 1rem;
}

.goal-title {
  margin: 0;
}

.goal-info, .goal-date {
  margin: 0.2rem 0;
  color: #666
}
</style>