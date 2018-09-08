<template>
    <div class="options-panel">
        <div class="upload-image">
            <label for="upload" ref="upload">
                <button @click="openFileDialog">Upload</button>
            </label>
            <input type="file" id="upload" accept="image/*" @change="fileSelected">
        </div>
    </div>
</template>

<script>
    export default {
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
                    this.$emit('setImage', e.target.result);
                };
                reader.readAsDataURL(file);
            },
        },
    };
</script>

<style scoped>
    input[type=file] {
        display: none;
    }
</style>