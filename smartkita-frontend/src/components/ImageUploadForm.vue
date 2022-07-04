<template>
  <h4>Bild hinzufügen</h4>
  <FileUpload
    name="image"
    :url="this.apiUrl + 'images/' + this.kitaData.id_einrichtung"
    :multiple="true"
    accept="image/*"
    @change="this.$emit('imagesUploaded')"
  ></FileUpload>
</template>

<script>
export default {
  name: "ImageUploadForm",
  inject: ["apiUrl"],
  props: ["kitaData"],
  emits: ["imagesUploaded"],
};
</script>

<style scoped></style>
