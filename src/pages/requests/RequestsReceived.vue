<template>
  <section>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests">
        <request-item
          v-for="request in receivedRequests"
          :key="request.id"
          :email="request.userEmail"
          :message="request.message"
        ></request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem.vue'

export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    }
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests']
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests']
    },
  },
  mounted() {
    this.loadRequests()
  },
  methods: {
    handleError() {
      this.error = null
    },
    async loadRequests() {
      try {
        this.isLoading = true
        await this.$store.dispatch('requests/fetchCoachRequests')
      } catch (error) {
        this.error = error.message || 'Faild to fetch data!'
      }
      this.isLoading = false
    },
  },
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
