<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="firstname">Firstname</label>
      <input id="firstName" v-model.trim="firstName" type="text" />
    </div>
    <div class="form-control">
      <label for="lastName">Lastname</label>
      <input id="lastName" v-model.trim="lastName" type="text" />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea id="description" v-model.trim="description" rows="5"></textarea>
    </div>
    <div class="form-control">
      <label for="hourlyRate">Rate</label>
      <input id="hourlyRate" v-model.number="hourlyRate" type="number" />
    </div>
    <div class="form-control">
      <h3>Areas of experties</h3>
      <div>
        <input id="frontend" v-model="areas" type="checkbox" value="frontend" />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input id="backend" v-model="areas" type="checkbox" value="backend" />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input id="career" v-model="areas" type="checkbox" value="career" />
        <label for="career">Career Advisory</label>
      </div>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: '',
      lastName: '',
      description: '',
      hourlyRate: null,
      areas: [],
    }
  },

  methods: {
    submitForm() {
      const formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        description: this.description,
        hourlyRate: this.hourlyRate,
        areas: this.areas,
      }
      this.$emit('save-data', formData)
    },
  },
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
