<script setup>

import { reactive, defineEmits } from "vue"
import { useDropzone } from "vue3-dropzone"

const uploads = reactive({
    files: [],
})

const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  accept: "image/*",
});

function onDrop(acceptFiles, rejectReasons) {
  console.log(acceptFiles);
  console.log(rejectReasons);
  uploads.files = acceptFiles;
  console.log(uploads)
  initiateFileUpload()
}


const emits = defineEmits(["initiateFileUpload"])

function initiateFileUpload(){
    emits("initiateFileUpload", uploads.files)
}

</script>

<template>

<div v-bind="getRootProps()" class="dropzone w-full border ac-form-dropzone bg-gray-100 text-center ">
    <input v-bind="getInputProps()" />
    <div class="ac-upload-area" v-if="isDragActive">
        <img width="120px" src="../assets/icons/upload-active.png" alt="Dosya Yükleme">
        <p>Drop to add!</p>
    </div>
    <div v-else class="ac-upload-area text-2xl">
        <img width="120px" src="../assets/icons/upload-inactive.png" alt="Dosya Yükleme">
        <p>Drag and drop files here or click to add!</p>
    </div>
</div>
</template>

<style scoped>

.dropzone {
    border: 1px dashed #dedede;
    padding: 1.6rem;
    text-align: center;
    margin-bottom: 1.6rem;
    width: 100%;
}

</style>s