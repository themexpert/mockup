<template>
    <div class="options-panel">
        <OrientationPicker :orientations="orientations" @setOrientation="sendOrientation"/>

        <ColorPicker :colors="colors" @setColor="sendColor"/>

        <div class="upload-image">
            <label for="upload" ref="upload">
                <button @click="openFileDialog">Upload</button>
            </label>
            <input type="file" id="upload" accept="image/*" @change="fileSelected">
        </div>

        <div class="download-btn">
            <button class="btn btn-primary" @click="downloadImage">Download</button>
        </div>
    </div>
</template>

<script>
    import OrientationPicker from "./OrientationPicker";
    import ColorPicker from "./ColorPicker";
    export default {
        components: {ColorPicker, OrientationPicker},
        props: ['orientations', 'colors', 'offsetX', 'offsetY', 'scale'],
        methods: {
            openFileDialog() {
                this.$refs.upload.click();
            },
            fileSelected(e) {
                if (e.target.files.length) {
                    this.setImage(e.target.files[0]);
                }
            },
            setImage(file) {
                const reader = new FileReader();
                reader.onloadend = (e) => {
                    if (e.target.error) {
                        this.message = e.target.error;
                        return;
                    }
                    this.$emit('set', {key: 'setImage', value: e.target.result});
                };
                reader.readAsDataURL(file);
            },
            sendOrientation(e) {
                this.$emit('set', {
                    key: 'setOrientation',
                    value: e,
                });
            },
            sendColor(e){
                this.$emit('set', {
                    key: 'setColor',
                    value: e,
                });
            },
            downloadImage() {
                this.$emit('downloadImage');
            },
        },
    };
</script>

<style scoped>
    input[type=file] {
        display: none;
    }
</style>