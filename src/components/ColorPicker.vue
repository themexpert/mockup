<template>
    <div>
        <ul>
            <li v-for="color in colors" :key="color" @click="$emit('setColor', color)" v-text="color"></li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['colors'],
    };
</script>
