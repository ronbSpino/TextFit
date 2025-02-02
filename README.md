
# TextFit-Spino

A Vue.js 2 component library for dynamically adjusting text sizes within elements using [TextFit](https://github.com/STRML/textfit). Includes components for managing text fitting and setting text width limits.

## Installation

To install the library, run the following command in your Vue 2 project:

```bash
npm install textfit-spino
```

## Usage

Import and use the `TextfitManager` component in your Vue components:

```javascript
import TextfitManager from 'textfit-spino';

export default {
  components: {
    TextfitManager,
  },
  data() {
    return {
      isMobile: false,  // Adjust based on device type
    };
  },
};
```

### Example Usage

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

### Props

- `i_ElementToTextfit`: **Array** of class names of elements that should be text-fitted.
- `i_SameSizeElements`: **Array** of class names that should have the same font size.
- `i_PrioritizeElement`: **String** of a class name to prioritize the font size of the other elements.
- `i_ResizeStopOn`: **Boolean** flag to stop resizing when the condition is met.
- `i_Component`: **String** identifier for the component.
- `isMobile`: **Boolean** to define if the device is mobile.

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
