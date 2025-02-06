# TextFit-Spino

A Vue.js 2 component library for dynamically adjusting text sizes within elements using [TextFit](https://github.com/STRML/textfit). Includes components for managing text fitting and setting text width limits.

## Installation

To install the library, run the following command in your Vue 2 project:

```bash
npm install textfit-spino
```

## Usage TextfitManager

Import and use the `TextfitManager` component in your Vue components:

```javascript
import { TextfitManager } from "textfit-spino";

export default {
  components: {
    TextfitManager,
  },
  data() {
    return {
      isMobile: false, // Adjust based on device type
    };
  },
};
```

### TextfitManager Example Usage

In your template, use the `TextfitManager` component:

```html
<TextfitManager
  :i_ElementToTextfit="['textfit-subtitle-1', 'textfit-title']"
  :i_SameSizeElements="['textfit-title']"
  :i_ResizeStopOn="modalIsVisible"
  :i_Component="'BuyFeature'"
  :isMobile="isMobile"
/>
```

### Props TextfitManager

- `i_ElementToTextfit`: **Array** of class names of elements that should be text-fitted.
- `i_SameSizeElements`: **Array** of class names that should have the same font size.
- `i_PrioritizeElement`: **String** of a class name to prioritize the font size of the other elements.
- `i_ResizeStopOn`: **Boolean** flag to stop resizing when the condition is met.
- `i_Component`: **String** identifier for the component.
- `isMobile`: **Boolean** to define if the device is mobile.

## Usage TextfitLimiter

Import and use the `TextfitManager` component in your Vue components:

```javascript
import { TextfitLimiter } from "textfit-spino";

export default {
  components: {
    TextfitLimiter,
  },
  data() {
    return {};
  },
};
```

### TextfitLimiter Example Usage

In your template, use the `TextfitManager` component:

```html
<TextfitLimiter
  :i_Class="'custom-class'"
  :i_Text="'Sample Text'"
  :config="{ minCharWidth: 2, maxCharWidth: 40, minPercentage: 70, maxPercentage: 90 }"
  :i_isReactiveFix="true"
  :i_isBreakLine="false"
/>
```

### Props TextfitLimiter

- `i_Class`: **String** — Optional. Specifies a CSS class name that will be applied to the component, allowing for custom styling.

- `i_Text`: **String** — Optional. Defines the text content to be displayed within the component.

- `config`: **Object** — Required. Sets configuration parameters for text fitting within the component. The default configuration is:

  ```javascript
  {
    minCharWidth: 1,
    maxCharWidth: 50,
    minPercentage: 65,
    maxPercentage: 85
  }
  ```

- `i_isReactiveFix`: **Boolean** — Optional (default: `false`). If set to `true`, enables a reactive fix to adjust text dynamically when data changes.

- `i_isBreakLine`: **Boolean** — Optional (default: `false`). If set to `true`, allows text to break into multiple lines if needed.

## Notes

- Ensure the parent container has a defined width to properly fit the text.
- The `config` prop allows customization of text scaling behavior.
- If `i_isBreakLine` is `false`, the text will try to fit within a single line.
- If `i_isReactiveFix` is `true`, text will automatically adjust when content changes.

## Development

To contribute or make changes:

1. Clone the repository:

   ```bash
   git clone https://github.com/ronbSpino/TextFit.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the build process:

   ```bash
   npm run build
   ```

4. Make your changes and test them.

## License

MIT License. See the [LICENSE](LICENSE) file for more details.
