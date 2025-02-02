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
import { textfitConfigs } from "@/utils/textfitConfigs";

export default {
  name: "TextfitLimiter",
  data() {
    return {
      // Configuration for text width based on class names
      configs: textfitConfigs,
    };
  },
  props: {
    i_Class: String,
    i_Text: String,
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

      const minCharWidth = this.configs[this.i_Class]?.minCharWidth ?? 1;
      const maxCharWidth = this.configs[this.i_Class]?.maxCharWidth ?? 50;
      const minPercentage = this.configs[this.i_Class]?.minPercentage ?? 65;
      const maxPercentage = this.configs[this.i_Class]?.maxPercentage ?? 85;

      const percentage =
        minPercentage +
        ((maxPercentage - minPercentage) * (charWidth - minCharWidth)) /
          (maxCharWidth - minCharWidth);

      return this.OverrideWidth(
        Math.min(maxPercentage, Math.max(minPercentage, percentage)) + "%"
      );
    },
    OverrideWidth(i_Percentage) {
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

<style lang="scss">
.break_line {
  white-space: normal !important;
}

.normal_line {
  white-space: nowrap !important;
}


//remove those css style class later , they will be added in in the parent component 


// this class is for resizing textfit font size
// .textfit-max-bet {
//   @include center-elements;
//   text-align: center;
//   line-height: 1;
//   height: 100%;
//   font-size: 15px; // initial fontsize - prevent major jump
//   width: 60%;
// }

// .textfit-buy-feature-text,
// .textfit-buy-feature-text-pc {
//   text-align: center;
//   line-height: 1;
//   height: 100%;
//   width: 60%;
//   font-size: 15px; // initial fontsize - prevent major jump
//   @include center-elements;
// }

// .textfit-counter-text {
//   width: 90%;
//   height: 100%;
//   text-align: center;
//   font-size: 8px;
//   background: transparent; // MUST to not hide the Extra FS animation
//   position: relative;
//   bottom: 0.5px; // MUST Extra FS animation layout plays with limiter position
//   right: 2px; // MUST Extra FS animation layout plays with limiter position
//   @include center-elements;
// }


</style>
