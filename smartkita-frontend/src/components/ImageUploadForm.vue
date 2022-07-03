<template>
  <h4>Bild hinzufügen</h4>
  <FileUpload
    name="image"
    :url="this.apiUrl + 'images/' + this.kitaData.id_einrichtung"
    :multiple="true"
    accept="image/*"
  ></FileUpload>
</template>

<script>
export default {
  name: "ImageUploadForm",
  inject: ["apiUrl"],
  props: ["kitaData"],
};
</script>

<style scoped></style>
