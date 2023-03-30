<script setup></script>

<template>
  <div class="address">
    <div class="layout-container">
      <div class="address-title">
        <p>выберите адрес</p>
        <router-link to="#">Добавить</router-link>
      </div>

      <div class="address-items">
        <div class="address-item">
          <label class="d-flex align-start">
            <input type="radio" name="radio" checked />
            <div class="input-round">
              <div class="d-flex flex-column align-start">
                <h5>asd</h5>
                <p>asd</p>
              </div>
            </div>
          </label>
          <label>
            <input type="radio" name="radio" />
            <div class="input-round">
              <div class="d-flex flex-column align-start">
                <h5>asd</h5>
                <p>asd</p>
              </div>
            </div>
          </label>
          <label>
            <input type="radio" name="radio" />
            <div class="input-round">
              <div class="d-flex flex-column align-start">
                <h5>asd</h5>
                <p>asd</p>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.address {
  &-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & p {
      @extend .text-15-600;
      color: var(--text-main);
      text-transform: uppercase;
    }

    & a {
      @extend .text-15-600;
      background: var(--gradient-green);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
}

label {
  display: flex;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.375em;
  /* Accessible outline */
  /* Remove comment to use */
  /*
    &:focus-within {
        outline: .125em solid $primary-color;
    }
  */
  input {
    position: absolute;
    left: -9999px;

    &:checked + div {
      &:before {
        box-shadow: inset 0 0 0 0.4375em #7940ae;
      }
    }
  }

  .input-round {
    display: flex;
    align-items: center;
    padding: 0.375em 0.75em 0.375em 0.375em;
    border-radius: 99em; // or something higher...
    transition: 0.25s ease;

    &:before {
      display: flex;
      flex-shrink: 0;
      content: "";
      background-color: transparent;
      width: 1.5em;
      height: 1.5em;
      border-radius: 50%;
      margin-right: 1em;
      transition: 0.25s ease;
      box-shadow: inset 0 0 0 0.125em var(--text-secondary);
    }

    & h5 {
      @extend .text-15-600;
      color: var(--text-main);
      margin-bottom: 6px;
    }

    & p {
      @extend .text-14-400;
      color: var(--text-secondary);
    }
  }
}

// Codepen spesific styling - only to center the elements in the pen preview and viewport
//.container {
//  position: absolute;
//  top: 0;
//  left: 0;
//  right: 0;
//  bottom: 0;
//  width: 100%;
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  padding: 20px;
//}
// End Codepen spesific styling
</style>
