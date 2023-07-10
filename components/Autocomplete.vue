<template>
  <v-autocomplete
    v-model="selectedItem"
    :items="items"
    :item-text="itemText"
    :item-value="itemValue"
    :label="label"
    :required="required"
    outlined
  ></v-autocomplete>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Autocomplete',
  props: {
    value: {
      type: [String, Number, Object],
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    itemText: {
      type: String,
      required: true
    },
    itemValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selectedItem: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      }
    }
  }
};
</script>
