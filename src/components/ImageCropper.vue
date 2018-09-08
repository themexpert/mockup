<template>
    <div class="modal" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img ref="imageToCrop" class="image-to-crop" :src="localImage" alt="Image To Crop">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="cropImage">Crop and Continue</button>
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
            this.cropper = new Cropper(this.$refs.imageToCrop, {
                aspectRatio: this.aspectRatio,
                viewMode: 1,
                dragMode: 'move',
                cropBoxMovable: false,
                cropBoxResizable: false,
            });
            $('.modal').modal('show');
        },
        methods: {
            cropImage() {
                const canvas = this.cropper.getCroppedCanvas();
                const img = canvas.toDataURL();
                this.cropper.destroy();
                $('.modal').modal('hide');
                this.$emit('imageCropped', img);
            },
        },
        computed: {
            localImage() {
                return this.image;
            },
        },
    };
</script>

<style scoped>
    .image-to-crop {
        max-width: 100%;
    }

    .modal-body {
        min-width: 500px;
        max-width: 800px;
        min-height: 400px;
        max-height: 550px;
    }
</style>