<template>
  <div>
    <div
      :style="{
        width: getCharWidth(this.i_Text) ?? '90%',
      }"
      :class="[
        `textfit-${i_Class}`,
        { break_line: i_isBreakLine, normal_line: !i_isBreakLine },
      ]"
    >
      {{ i_Text }}
    </div>
  </div>
</template>

<script>
import { findLongestWord } from "@/utils/format";

export default {
  name: "TextfitLimiter",
  data() {
    return {};
  },
  props: {
    i_Class: String,
    i_Text: String,
    config: {
      type: Object,
      default: () => ({
        minCharWidth: 1,
        maxCharWidth: 50,
        minPercentage: 65,
        maxPercentage: 85,
      }),
      required: true,
    },
    i_isReactiveFix: {
      type: Boolean,
      default: false,
    },
    i_isBreakLine: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getCharWidth(i_Text) {
      let text = i_Text;
      if (this.i_isBreakLine) {
        text = findLongestWord(i_Text);
      }

      const span = document.createElement("span");
      span.textContent = text;
      span.style.fontSize = "10px";
      span.style.visibility = "hidden";

      document.body.appendChild(span);
      const charWidth = span.getBoundingClientRect().width;
      document.body.removeChild(span);

      const minCharWidth = this.config?.minCharWidth ?? 1;
      const maxCharWidth = this.config?.maxCharWidth ?? 50;
      const minPercentage = this.config?.minPercentage ?? 65;
      const maxPercentage = this.config?.maxPercentage ?? 85;

      const percentage =
        minPercentage +
        ((maxPercentage - minPercentage) * (charWidth - minCharWidth)) /
          (maxCharWidth - minCharWidth);

      return this.OverrideWidth(
        Math.min(maxPercentage, Math.max(minPercentage, percentage)) + "%"
      );
    },
    OverrideWidth(i_Percentage) {
      /// check if it needed

      // this is an example for when we need to override buy-feature-text on isPortrait
      // if (this.i_Class == "buy-feature-text") {
      //   if (this.isPortrait) return `${parseFloat(i_Percentage) - 10}%`;
      // }

      return i_Percentage;
    },
  },
  watch: {
    i_Text(i_NewText) {
      if (this.i_isReactiveFix) {
        $(`.textfit-${this.i_Class} span`).text(i_NewText);
        window.dispatchEvent(new Event("textfit"));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.break_line {
  white-space: normal !important;
}

.normal_line {
  white-space: nowrap !important;
}
</style>
