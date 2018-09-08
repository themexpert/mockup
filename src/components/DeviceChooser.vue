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
                        colors: ["black", "white"],
                        aspectRatio: {
                            portrait: 0.5654669428620749,
                            landscape: 1.7686873508353222,
                        },
                    },
                    {
                        name: "Pixel",
                        value: "Pixel",
                        orientations: ["portrait"],
                        colors: ["black", "white"],
                        aspectRatio: {
                            portrait: 0.5671345782356729,
                        },
                    },
                ],
            };
        },
    };
</script>
