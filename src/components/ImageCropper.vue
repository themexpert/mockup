<template>
    <div class="modal" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Crop Image</h5>
                </div>
                <div class="modal-body">
                    <img ref="imageToCrop" class="image-to-crop" :src="localImage" alt="Image To Crop">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" @click="cancel">Close</button>
                    <button type="button" class="btn btn-success" @click="cropImage">Crop and Continue</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Cropper from 'cropperjs';

    export default {
        props: ['image', 'aspectRatio'],
        data() {
            return {cropper: null}
        },
        mounted() {
            this.initiateCropper();
        },
        methods: {
            initiateCropper() {
                if (!this.$refs.imageToCrop) {
                    return;
                }
                this.cropper = new Cropper(this.$refs.imageToCrop, {
                    aspectRatio: this.aspectRatio,
                    viewMode: 1,
                    dragMode: 'move',
                    cropBoxMovable: false,
                    cropBoxResizable: false,
                });
                $('.modal').modal('show');
            },
            cropImage() {
                const canvas = this.cropper.getCroppedCanvas();
                const img = canvas.toDataURL();
                this.cropper.destroy();
                $('.modal').modal('hide');
                this.$emit('imageCropped', img);
            },
            cancel() {
                this.cropper.destroy();
                $('.modal').modal('hide');
            },
        },
        computed: {
            localImage() {
                return this.image;
            },
        },
        watch: {
            localImage: {
                handler(a, b) {
                    if (a !== b) {
                        this.initiateCropper();
                    }
                },
                immediate: true,
            }
        }
        ,
    };
</script>

<style scoped>
    .image-to-crop {
        max-width: 100%;
        max-height: 450px;
    }

    .modal-body {
        min-width: 500px;
        max-width: 800px;
        min-height: 400px;
        max-height: 550px;
    }
</style>