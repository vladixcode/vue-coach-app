<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button v-if="!isLoggedin" link to="/auth?redirect=register"> Login to Register as a Coach </base-button>
          <base-button v-if="isLoggedin && !isCoach && !isLoading" to="/register" link>Register as a Coach</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :id="coach.id"
            :key="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '@/components/coaches/CoachItem.vue'
import CoachFilter from '@/components/coaches/CoachFilter.vue'

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFiters: {
        frontend: true,
        backend: true,
        career: true,
      },
    }
  },
  computed: {
    filteredCoaches() {
      return this.$store.getters['coaches/coaches'].filter((coach) => {
        if (this.activeFiters.frontend && coach.areas.includes('frontend')) {
          return true
        }
        if (this.activeFiters.backend && coach.areas.includes('backend')) {
          return true
        }
        if (this.activeFiters.career && coach.areas.includes('career')) {
          return true
        }
        return false
      })
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach']
    },
    isLoggedin() {
      return this.$store.getters['isAutenticated']
    },
  },
  created() {
    this.loadCoaches()
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFiters = updatedFilters
    },
    async loadCoaches(forceRefresh = false) {
      this.isLoading = true
      try {
        await this.$store.dispatch('coaches/fetchCoaches', { forceRefresh })
      } catch (error) {
        this.error = error.message
      }
      this.isLoading = false
    },
    handleError() {
      this.error = null
    },
  },
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
