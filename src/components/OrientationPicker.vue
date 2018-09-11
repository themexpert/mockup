<template>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button v-for="orientation in orientations" :key="orientation" @click="$emit('setOrientation', orientation)" type="button" class="btn btn-secondary text-uppercase">
        <span v-text="orientation"></span>
      </button>
    </div>
</template>

<script>
    export default {
        props: ['orientations'],
    };
</script>
