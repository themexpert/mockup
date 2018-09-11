<template>
    <div class="device-wrapper m-auto">
        <div class="device"
             :data-device="options.device"
             :data-orientation="options.orientation"
             :data-color="options.color"
        >
            <div class="screen">
                <div class="bg-wrapper" :style="styles"></div>
            </div>
            <div class="button">
                <!-- You can hook the "home button" to some JavaScript events or just remove it -->
            </div>
        </div>
    </div>
</template>

<script>
    import FrameOptions from "../models/FrameOptions";

    export default {
        props: {
            options: {
                type: FrameOptions,
                required: true,
            },
        },
        computed: {
            styles() {
                const styles = {
                    background: '#f9b450',
                    transform: `scale(${this.options.scale})`,
                    backgroundPosition: `${this.options.offsetX}px ${this.options.offsetY}px`,
                };

                if (this.options.image) {
                    styles['backgroundImage'] = `url(${this.options.image})`;
                    delete styles['background'];
                }
                return styles;
            },
        },
    };
</script>

<style scoped>
    .bg-wrapper {
        width: 100%;
        height: 100%;
        background-size: cover;
    }
    .screen {
        overflow: hidden;
    }
</style>
