<template>
    <div>
        <ul>
            <li v-for="orientation in orientations" :key="orientation" @click="$emit('setOrientation', orientation)" v-text="orientation"></li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['orientations'],
    };
</script>
