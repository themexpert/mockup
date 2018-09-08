<template>
    <div class="drop-zone"
         @dragenter="onDragOver"
         @dragover.prevent.stop="onDragOver"
         @dragleave="onDragLeave"
         @drop.prevent.stop="onDropIn"
         @click="openFileChooser"
    >
        <p v-if="message" class="message" v-text="message"></p>
        <label ref="fileUploadLabel" for="file-upload"></label>
        <input type="file" accept="image/*" id="file-upload" style="display: none;" @change="fileSelected">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'Click here or drag and drop an image file',
            };
        },
        methods: {
            onDragOver(e) {
                console.log(e, e.dataTransfer.files);
            },
            onDragLeave(e) {
                console.log(e);
            },
            onDropIn(e) {
                e.preventDefault();
                e.stopPropagation();
                const data = e.dataTransfer;
                this.selectFile(data.files);
            },
            openFileChooser() {
                this.$refs.fileUploadLabel.click();
            },
            fileSelected(e) {
                this.selectFile(e.target.files);
            },
            selectFile(files) {
                if (!files || !files.length) {
                    return;
                }
                const file = files[0];
                if (file.type.match(/^image\/.*$/g)) {
                    this.sendFileToParent(file);
                } else {
                    this.message = 'Only image files are accepted';
                }
            },
            sendFileToParent(file) {
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
    .drop-zone {
        position: fixed;
        top: 20px;
        right: 20px;
        bottom: 20px;
        left: 20px;
        z-index: 999;
        background: #000;
        opacity: 0.6;
    }
    .message {
        color: #fff;
    }
</style>
