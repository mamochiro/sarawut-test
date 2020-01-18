<template>
  <div class="button">
    <button
      :type="type"
      :value="value"
      :class="variant"
      :disabled="disabled"
      :style="inlineStyle"
      @click="$emit('click')"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  props: ['type', 'value', 'variant', 'disabled', 'inlineStyle'],
}
</script>

<style lang="scss" scoped>
.button {
  button {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: $primaryColor;
    color: #fff;
    border-radius: 30px;
    height: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    font-family: $kanit;
    font-size: 16px;
    border: 0;
    cursor: pointer;
    &:hover {
      background-color: lighten($primaryColor, 10%);
    }
    &:focus {
      outline: 0;
      border: 0;
    }
    &:active {
      border: 0;
      box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.5);
      background-color: darken($primaryColor, 10%);
    }
    &:disabled {
      box-shadow: none;
      background-color: lighten($primaryColor, 60%);
      cursor: auto;
    }
    &.block {
      display: block;
      width: 100%;
      &.submit-address,
      &.add-address {
        width: 100%;
      }
      &.delete {
        background-color: #b71e1e;
      }
      &.canceled-delete {
        width: 200px;
        background-color: #b71e1e;
      }
      &.confirmed-delete {
        width: 200px;
      }
    }
    &.success {
      color: #fff;
      background-color: #2dce89;
      border-color: #2dce89;
      box-shadow: 0 0 10px #2dce89;
      height: auto;
      padding: 0.35rem 3.5rem;
    }
    &.cancel {
      color: #fff;
      background-color: #f5365c;
      border-color: #f5365c;
      box-shadow: 0 0 10px #f5365c;
      height: auto;
      padding: 0.35rem 3.5rem;
    }
    &.block_button {
      display: block;
      width: 90%;
      margin: 30px auto 10px;
    }
    &.block_seemore {
      display: block;
      width: 30%;
      margin: 30px auto 10px;
    }
    &.size {
      width: 50%;
      margin-left: auto;
      margin-right: auto;
    }
    &.changepassword {
      width: 100%;
      margin-top: 35px;
    }
    &.changepassword_success {
      width: 30%;
      margin-top: 35px;
      display: initial;
    }
    &.facebook {
      background-color: #3b5998;
      &:hover {
        background-color: lighten(#3b5998, 10%);
      }
      &:active {
        box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.5);
        background-color: darken(#3b5998, 10%);
      }
      &:disabled {
        background-color: lighten(#3b5998, 60%);
        cursor: auto;
      }
    }
    &.google {
      background-color: #db4a39;
      &:hover {
        background-color: lighten(#db4a39, 10%);
      }
    }
    &.oncoming {
      margin-top: 40px;
      margin-bottom: 20px;
      background-color: rgba(0, 0, 0, 0);
      color: #000000;
      border: 1px solid #000000;
      box-shadow: 0px 0px 0px;
      height: 40px;
    }
    &.seemore {
      margin-top: 40px;
      margin-bottom: 20px;
      background-color: rgba(0, 0, 0, 0);
      color: #ffffff;
      border: 1px solid #ffffff;
      box-shadow: 0px 0px 0px;
      height: 40px;
    }
    &.seemore_payment {
      margin-top: 40px;
      margin-bottom: 20px;
      background-color: rgba(0, 0, 0, 0);
      color: #082c71;
      border: 1px solid #082c71;
      box-shadow: 0px 0px 0px;
      height: 40px;
    }
    &.default {
      background-color: #ffffff;
      color: rgb(145, 145, 145);
      padding: 0.35rem 3rem;
      border: 1px solid rgb(139, 139, 139);
      height: auto;
      box-shadow: none;
    }
    &.buy {
      &__ticket {
        background-color: linear-gradient(
          90deg,
          rgba(12, 76, 202, 1) 0%,
          rgba(11, 63, 164, 1) 100%
        );
        box-shadow: 0px 0px 10px #0c4cca;
        color: #fff;
        border: 0px;
        height: auto;
        padding: 0.35rem 3.5rem;
        &:disabled {
          cursor: not-allowed;
          background: #aaaaaa;
          box-shadow: none;
        }
      }
      &__atthaiticket {
        background: #ba0505;
        box-shadow: 0px 0px 10px #ff0000;
        color: #fff;
        border: 0px;
      }
      &__hide {
        background-color: #aaaaaa;
        color: #fff;
        border: 0px;
        box-shadow: 0px 0px 0px;
        height: auto;
        padding: 0.35rem 3.5rem;
      }
      &:active {
        box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.5);
        background-color: darken(#db4a39, 10%);
      }
      &:disabled {
        background-color: lighten(#db4a39, 60%);
        cursor: auto;
      }
    }
  }
}
</style>
