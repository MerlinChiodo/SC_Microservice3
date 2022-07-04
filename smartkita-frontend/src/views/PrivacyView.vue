<template>
  <div class="legalcontainer">
    <div class="surface-card p-4 shadow-2 border-round-md">
      <div class="flex justify-content-center flex-wrap align-items-center">
        <h1>Datenschutz</h1>
        <br />
        <p size="md" weight="{700}">
          Diese Website ist ein studentisches Projekt der FH Bielefeld im Rahmen
          des Moduls Softwareprojekt des Informatikstudiengangs am Campus
          Minden.
        </p>
        <br />
        <p size="md" weight="{700}">
          Diese Website ist nicht für einen echten Einsatz gedacht. Keine Daten
          sind echt, sondern Musterdaten, um die Funktionalität zu testen und zu
          präsentieren.
        </p>
        <p>
          Bitte tragen Sie keine echten Daten ein und laden keine persönlichen
          Dokumente auf diesen Service hoch.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LegalView",
};
</script>

<style scoped>
.legalcontainer {
  margin: auto;
  margin-top: 2rem;
  max-width: 80rem;
}
</style>
