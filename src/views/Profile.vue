<template>
  <div class="profile-container">
    <!-- Your profile page content here -->
    <h1>User Profile</h1>
    <div v-if="user">
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <!-- Add more user details as needed -->
    </div>
    <div v-else>
      Loading profile...
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',  // Using multi-word name
  data() {
    return {
      user: null
    }
  },
  async created() {
    // Fetch user data here
    // this.user = await fetchUserData();
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>