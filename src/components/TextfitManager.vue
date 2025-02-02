<template>
  <div v-show="false"></div>
</template>

<script>
import textFit from "textfit";
export default {
  name: "TextfitManager",
  props: {
    i_ElementToTextfit: Array,
    i_SameSizeElements: Array, // String[] of ClassName from Textfit.vue, all of the ClassName in this array will get adjusted to the Min FontSize between them
    i_PrioritizeElement: String, // String of ClassName that will prioritize adjusting i_SameSizeElements FontSize to its min FontSize
    i_ResizeStopOn: String,
    i_Component: String,
    isMobile:Boolean,
  },
  methods: {
    // all of the elements that should be textfited
    TextfitLogic(i_Source) {
      if (!this.this.i_ResizeStopOn) {
        // This clause is for not triggering textfit while the components is not displayed,
        // a better solution is to remove the resize eventlistner on component destroyed but at the time of writing it couldnt make it happen
        return;
      }

      const LogSource = `${this.i_Component} Textfit`;

      switch (i_Source) {
        case "resize":
          ServiceWrapper.LogMessage("Textfit Resize Triggered", LogSource);
          break;
        case "debounce":
          ServiceWrapper.LogMessage("Textfit Debounced Triggered", LogSource);
          break;
        default:
          ServiceWrapper.LogMessage("Textfit Triggered", LogSource);
          break;
      }

      this.i_ElementToTextfit.forEach((ClassName) => {
        textFit($(`.${ClassName}`));
      });

      this.InitSameElements();
    },
    // get the smallest font size of a class, smallest fontsize = longest string
    getMinFontSize(i_ClassName) {
      let sizes = $(`.${i_ClassName} span`)
        .map(function (i, el) {
          return $(el).css("font-size").replace("px", "");
        })
        .get();
      return Math.min(...sizes);
    },
    // TODO make all long string that are : GameName - SubGameName a two line with changing the - to \n and putting on the class white-space:pre, text-align:center
    // make a element textfit with the same fontsize
    TextFitSameSize(i_ClassName, i_FontSize, i_IsNameFormat = false) {
      if (!i_FontSize) {
        return;
      }

      $(`.${i_ClassName} span`).css("font-size", i_FontSize + "px");
      if (i_IsNameFormat) {
        $(`[name-format='default']`).css("transform", "scale(1.2)"); // scale up for short strings
      }
    },
    InitSameElements() {
      if (!this.i_SameSizeElements) {
        return;
      }

      let SameSizeObject = [];
      let sizes = [];
      let MainElementIndex = 0;

      // map and deconstruct to obj
      this.i_SameSizeElements.forEach((ClassName, i) => {
        let isMainElement = false;
        let ClassMinSize = this.getMinFontSize(ClassName);

        if (this.i_PrioritizeElement == ClassName) {
          isMainElement = true;
          MainElementIndex = i;
        }

        sizes.push(ClassMinSize);

        SameSizeObject.push({
          className: ClassName,
          MinSize: ClassMinSize,
          isMainElement: isMainElement,
        });
      });

      // trigger textfit
      SameSizeObject.forEach((obj) => {
        if (Math.min(...sizes) >= SameSizeObject[MainElementIndex].MinSize) {
          return this.TextFitSameSize(
            obj.className,
            SameSizeObject[MainElementIndex].MinSize,
            true
          );
        }
        this.TextFitSameSize(obj.className, obj.MinSize, true);
      });
    },
    debounced(delay, fn) {
      let timerId;
      return function (...args) {
        if (timerId) {
          clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
          fn(...args);
          timerId = null;
        }, delay);
      };
    },
    handleTextfit(i_Source) {
      this.TextfitLogic(i_Source);
    },
    handleDebounce() {
      return this.debounced(300, () => this.handleTextfit("debounce"));
    },
    handleResize() {
      this.handleTextfit("resize");
    },
  },
  // on mounted trigger textfit jquery
  mounted() {
    this.$nextTick(() => {
      this.handleTextfit();
      window.addEventListener("textfit", this.handleTextfit);
      if (!this.isMobile) {
        window.addEventListener("resize", this.handleDebounce());
      } else {
        window.addEventListener("resize", this.handleResize);
      }
    });
  },
};
</script>