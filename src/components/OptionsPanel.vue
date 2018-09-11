<template>
    <div class="options-panel p-3">
        <h3 class="mb-2">iPhone 7</h3>
        <hr>
        <div class="row">
            <div class="col-md-6"><strong>Orientations</strong></div>
            <div class="col-md-6"><OrientationPicker :orientations="orientations" @setOrientation="sendOrientation"/></div>
        </div>
        <div class="row">
            <div class="col-md-6"><strong>Device Color</strong></div>
            <div class="col-md-6"><ColorPicker :colors="colors" @setColor="sendColor"/></div>
        </div>

        <div class="card text-center my-3">
          <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
              <li class="nav-item">
                <a class="nav-link active" href="#">Image</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">Customize</a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between">
                <label for="upload" ref="upload" class="w-50 mr-2">
                    <button class="btn btn-primary btn-block" @click="openFileDialog">Upload</button>
                </label>
                <button class="btn btn-outline-secondary w-50">URL</button>
                <input type="file" id="upload" accept="image/*" @change="fileSelected">
            </div>
          </div>
        </div>
        
        <button class="btn btn-outline-success btn-block" @click="downloadImage">Download</button>
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