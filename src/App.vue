<template>
  <div id="container">
    <div v-if="isUploading" class="loader-container">
      <div  class="loader"></div> 
    </div>
    <p class="info-text">Enter a base name for the files to get started!</p>

    <div class="main-inputs">
      <input v-model="globalName" placeholder="Global Name" type="text" name="text" id="">
      <input v-model="baseWidth" placeholder="Desired Size" type="number" name="number" id="">
    </div>

    <div class="file-previewer">
      <div v-for="img in imgs" :key="img.src" class="img-area">
        <img :src="img.src" alt="preview" />
        <input v-model="img.desiredWidth" placeholder="Desired Size" type="number" name="number" id="">
        <input v-model="img.fileName" placeholder="Name" type="text" name="text" id="">
        <button class="remove" @click="removeLocalFile(imgs.indexOf(img))">Remove</button>
      </div>
    </div>

    <file-uploader v-if="globalName !== ''" @initiateFileUpload="previewFiles" />

    <button v-if="imgs.length > 0" :disabled="imgs.length <= 0" class="ac-primary-button my-4 text-3xl" @click="uploadFiles">Upload</button>

  </div>
</template>

<script setup>
import { ref } from "vue"
import FileUploader from "./components/fileUploader.vue"
import { uploadFile } from "./functions/aws"

  const isUploading = ref(false)


  const imgs = ref([])
  const fileNameBase = "altevren"

  const globalName = ref("")
  const baseWidth = ref(730)

  const previewFiles = (files) => {
  console.log("Files received from file-uploader component.")
  console.log(files)
  files.forEach((file, i) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result
      img.onload = () => {
        imgs.value.push({
          src: img.src,
          desiredWidth: baseWidth.value,
          fileName: `${fileNameBase}_${globalName.value}_${i + 1}`,
          file: file  // Store the original File object
        })
      }
    }
    reader.readAsDataURL(file)
  })
}


function removeLocalFile(index){
    // Find the index of the file in the uploads.files array
    // Remove the file from the array
    imgs.value.splice(index, 1)
}

async function uploadFiles() {
  isUploading.value = true
  for (const img of imgs.value) {
    if (img.file) {
      const uploadedFileUrl = await uploadFile(img.file, img.fileName, img.desiredWidth);
      if (uploadedFileUrl) {
        console.log(`File uploaded successfully: ${uploadedFileUrl}`);
        // You might want to update your UI here to show the upload was successful
      } else {
        console.error(`Failed to upload file: ${img.fileName}`);
        // Handle the error, maybe update UI to show the upload failed
      }
    } else {
      console.error(`No file object found for: ${img.fileName}`);
    }
  }
  isUploading.value = false
}

</script>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 92.8888%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: stretch;
  flex-direction: column;
  padding: 1.6rem;
  position: relative;

}

.info-text{
  font-size: 1.6rem;
  margin-bottom: 1.6rem;
  text-align: center;
}

.file-previewer{
  display: flex;
  padding: 1.6rem;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  gap: 1.6rem;
  margin-bottom: 1.6rem;
  justify-content: space-between
}

.img-area{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 20%;
  height: 100%;

}

.img-area img{
  max-width: 100%;
  object-fit: contain;
  aspect-ratio: 4 / 3;
}

.main-inputs{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; 
  gap: 1.6rem;
  outline: none !important
}

.main-inputs input{
  padding: .4rem;
  font-size: 1.2rem;
  width: 100%;
}

.file-previewer input{
  padding: .4rem;
  font-size: 1.2rem;
  width: 100%;
  outline: none;
}

button.remove {
  background-color: rgba(51, 51, 51, 0.05);
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 10px 12px;
  text-align: center;
  transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  width:100%;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}


button.ac-primary-button{

  background-color: black;
  color: white;
  font-size: 1.2rem;
  padding: .4rem 0;
  width: 100%;
  margin: 0 auto;
  transition: all .2s;
}

button.ac-primary-button:disabled{
  background-color: #bbbbbb;
}

button.ac-primary-button:hover{
  background-color: #212223
}

.loader-container{
  backdrop-filter: blur(5px);
  height: 100vh;
  width: 100vw;
  position: absolute;

}

.loader{
  position: absolute;
  top: 40%;
  left: 45%;
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border-radius: 50%;
  background:
    linear-gradient(0deg ,rgb(0 0 0/50%) 30%,#0000 0 70%,rgb(0 0 0/100%) 0) 50%/8% 100%,
    linear-gradient(90deg,rgb(0 0 0/25%) 30%,#0000 0 70%,rgb(0 0 0/75% ) 0) 50%/100% 8%;
  background-repeat: no-repeat;
  animation: l23 1s infinite steps(12);
}
.loader::before,
.loader::after {
   content: "";
   grid-area: 1/1;
   border-radius: 50%;
   background: inherit;
   opacity: 0.915;
   transform: rotate(30deg);
}
.loader::after {
   opacity: 0.83;
   transform: rotate(60deg);
}
@keyframes l23 {
  100% {transform: rotate(1turn)}
}

</style>
