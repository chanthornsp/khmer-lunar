import { defineStore } from "pinia";

export const useAttributeStore = defineStore("attribute", {
  state: () => ({
    attrs: [],
  }),
});
