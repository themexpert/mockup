<template>
    <div class="btn-group mt-2" role="group" aria-label="Basic example">
        <button class="btn btn-outline-secondary text-uppercase" v-for="color in colors" :key="color" @click="$emit('setColor', color)" v-text="color"></button>
    </div>
</template>

<script>
    export default {
        props: ['colors'],
    };
</script>
