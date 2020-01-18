<template>
  <div class="input">
    <input
      ref="input"
      :name="name"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :class="variant"
      :disabled="disabled"
      :maxlength="max"
      :readonly="readonly"
      @input="updateValue"
    />
    <i v-if="required" class="required">*</i>
    <p v-if="error" class="error-message">{{ error }}</p>
    <p v-if="errorType" class="error-message">{{ errorType }}</p>
  </div>
</template>

<script>
export default {
  props: [
    'name',
    'type',
    'value',
    'placeholder',
    'variant',
    'disabled',
    'error',
    'required',
    'max',
    'readonly',
  ],
  data() {
    return {
      errorType: '',
    }
  },
  mounted() {
    if (this.value) {
      this.$emit('input', this.value)
    }
  },
  methods: {
    updateValue() {
      this.$emit('input', this.$refs.input.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  input {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border: 1px solid #878787;
    height: 35px;
    // font-family: $kanit;
    font-size: 14px;
    padding: 0 15px;
    border-radius: 20px;
    color: #333;
    &:focus {
      outline: 0;
    }
    &:disabled {
      background-color: #fafafa;
      border: #f2f2f2;
    }
    &.block {
      display: block;
      width: 100%;
    }
    &.size {
      height: 50px;
      border-radius: 60px;
    }
    &.error {
      border: 1px solid red;
    }
    &[type='number']::-webkit-outer-spin-button,
    &[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
  .required {
    position: absolute;
    color: red;
    top: 18px;
    right: 20px;
    font-size: 20px;
    text-decoration: none;
    line-height: 1;
    margin-top: -8px;
    font-style: normal;
  }
  .error-message {
    color: red;
    font-size: 12px;
    padding: 0 15px 5px;
  }
}
</style>
