<template>
  <div class="dashboard-page">
    <!-- Your dashboard content here -->
    <h1>Dashboard Overview</h1>
    <div class="stats-container">
      <!-- Add your dashboard components -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage'  // Changed from 'Dashboard' to 'DashboardPage'
}
</script>

<style scoped>
.dashboard-page {
  padding: 20px;
}
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>