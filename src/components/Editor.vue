<template>
    <div class="editor">
        <div class="container">
            <div class="row">
                <div class="col-md-12" v-if="!device">
                    <div class="card">
                        <DeviceChooser @setDevice="setDevice"/>
                    </div>
                </div>
                <div class="col-md-12" v-else>
                    <div class="card">
                        <div class="col-md-8">
                            <EditorCanvas ref="viewport" :options="options" class="canvas"/>
                        </div>
                        <div class="col-md-4">
                            <OptionsPanel class="right-panel"
                                          :orientations="device.orientations"
                                          :colors="device.colors"
                                          :offset-x="options.offsetX"
                                          :offset-y="options.offsetY"
                                          :scale="options.scale"
                                          @downloadImage="downloadImage"
                                          @set="set"/>
                        </div>
                        <ImageCropper v-if="shouldCrop" :image="image" :aspect-ratio="aspectRatio"
                                      @imageCropped="imageCropped"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import html2canvas from 'html2canvas';
    import { saveAs } from 'file-saver';
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
            set(data) {
                switch (data.key) {
                    case 'setImage':
                        this.image = data.value;
                        this.shouldCrop = true;
                        break;
                    case 'setOrientation':
                        this.options.orientation = data.value;
                        break;
                    case 'setColor':
                        this.options.color = data.value;
                        break;
                    default:
                }
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
                    this.options ? this.options.orientation : this.device.orientations[0],
                    this.options ? this.options.color : this.device.colors[0],
                    null,
                    null,
                    null,
                );
            },
            imageCropped(image) {
                this.setFrameOptions(image);
                this.shouldCrop = false;
            },
            downloadImage() {
                const mainNode = this.$refs.viewport.$el.querySelector('.device');
                const node = mainNode.cloneNode(true);
                const width = 600;
                const height = width * this.device.aspectRatio;
                node.style.height = `${height}px`;
                node.style.width = `${width}px`;
                const dom = document.createElement('div');
                dom.append(node);
                dom.style.position = 'absolute';
                dom.style.top = '-1000000px';
                dom.style.background = 'transparent';
                document.body.appendChild(dom);
                html2canvas(dom, {
                    logging: false,
                    backgroundColor: null,
                })
                    .then((canvas) => {
                        canvas.toBlob(function (blob) {
                            saveAs(blob, "downloaded-from-editor.png");
                            document.body.removeChild(dom);
                        });
                    })
                    .catch(() => {
                        document.body.removeChild(dom);
                    });
            },
        },
        computed: {
            aspectRatio() {
                return this.device.aspectRatio[this.options.orientation];
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
