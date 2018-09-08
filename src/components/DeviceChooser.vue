<template>
    <div class="devices-list">
        <ul>
            <li v-for="device in devices" :key="device.value" @click="$emit('setDevice', device)" v-text="device.name"></li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                devices: [
                    {
                        name: "iPhone 7",
                        value: "iPhone7",
                        orientations: ["portrait", "landscape"],
                        colors: ["black", "white", "gold", "pink", "red"],
                        aspectRatio: 0.5654669428620749,
                    },
                    {
                        name: "Pixel",
                        value: "Pixel",
                        orientations: ["portrait"],
                        colors: ["black", "white"],
                    },
                ],
            };
        },
    };
</script>
