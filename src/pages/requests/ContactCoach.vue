<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your email</label>
      <input id="email" v-model.trim="email" type="email" />
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea id="message" v-model.trim="message" name="message" cols="30" rows="5"></textarea>
    </div>
    <p v-if="!fromIsValid" class="errors">Please enter a valid email and non-empty message</p>
    <div class="action">
      <base-button>Send message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      fromIsValid: true,
    }
  },
  methods: {
    submitForm() {
      this.fromIsValid = true
      if (this.email === '' || !this.email.includes('@') || this.message === '') {
        this.fromIsValid = false
        return
      }
    },
  },
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
