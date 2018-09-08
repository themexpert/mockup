<template>
    <div class="editor">
        <div class="container">
            <div class="row">
                <div class="col-md-8" v-if="!device">
                    <div class="card">
                        <DeviceChooser @setDevice="setDevice"/>
                    </div>
                </div>
                <div class="col-md-4" v-else>
                    <div class="card">
                        <EditorCanvas :options="options" class="canvas"/>
                        <OptionsPanel class="right-panel" @setImage="setImage"/>
                        <ImageCropper v-if="shouldCrop" :image="image" :aspect-ratio="device.aspectRatio"
                                      @imageCropped="imageCropped"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import EditorCanvas from "./EditorCanvas";
    import DeviceChooser from "./DeviceChooser";
    import OptionsPanel from "./OptionsPanel";
    import FrameOptions from "../models/FrameOptions";
    import ImageCropper from "./ImageCropper";

    export default {
        components: {DeviceChooser, ImageCropper, EditorCanvas, OptionsPanel},
        data() {
            return {
                device: null,
                image: null,
                options: null,
                shouldCrop: false,
            };
        },
        methods: {
            setDevice(device) {
                this.device = device;
            },
            setImage(image) {
                this.image = image;
                this.shouldCrop = true;
            },
            setFrameOptions(image) {
                if (!image) {
                    if (this.shouldCrop) {
                        image = null;
                    } else {
                        image = this.image;
                    }
                }
                this.options = new FrameOptions(
                    image,
                    this.device.value,
                    this.device.orientations[0],
                    this.device.colors[0],
                    null,
                    null,
                    null,
                );
            },
            imageCropped(image) {
                this.setFrameOptions(image);
                this.shouldCrop = false;
            },
        },
        watch: {
            device() {
                this.setFrameOptions();
            },
            image() {
                if (this.device) {
                    this.setFrameOptions();
                }
            },
        },
    };
</script>

<style scoped>
    .canvas {
        float: left;
        width: 70%;
    }

    .right-panel {
        float: left;
        width: 30%;
    }
</style>
