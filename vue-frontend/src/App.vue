<!--
  Main App component providing navigation and layout structure for the Student Survey application.
-->
<template>
  <div class="container">
    <h1 class="mt-2 mb-3">SWE 642 - Student Survey (Vue)</h1>
    <nav class="mb-3">
      <router-link class="btn btn-primary me-2" to="/survey">Student Survey</router-link>
      <router-link class="btn btn-outline-secondary" to="/surveys">List All Surveys</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
// Shell layout with nav; routes render below.
</script>
