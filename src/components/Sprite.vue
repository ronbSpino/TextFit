<template>
  <div class="sprite-container">
    <div class="win-amount-container">
      <div class="win-amount">
        <div
          v-for="(char, i) in CharsArray"
          :key="`char-${i}`"
          :style="{
            width: CharWidth(char) + 'px',
            height: height + 'px',
            display: 'inline-block',
            background:
              'url(' +
              i_SpritePath +
              'chars_sprite.png' +
              ')-' +
              moveX(char) +
              'px ' +
              '0px / ' +
              CharSpriteWidth +
              'px ' +
              height +
              'px',
          }"
        ></div>
      </div>
      <div v-if="IsCurrencyCode" class="currency-code">
        <div
          v-for="(char, i) in LettersArray"
          :key="`letter-${i}`"
          :style="{
            width: LetterWidth(char) + 'px',
            height: height + 'px',
            display: 'inline-block',
            background:
              'url(' +
              i_SpritePath +
              'letters_sprite.png' +
              ')-' +
              moveX(char) +
              'px ' +
              '0px / ' +
              LetterSpriteWidth +
              'px ' +
              height +
              'px',
          }"
        ></div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "SpriteFont",
  props: {
    i_Chars: String,
    i_SpritePath: String,
    i_SizeMultiplater: Number, // never above than 1
    i_CurrencyCode: String, // For Currency Code Support, can be Symbol if its not supposed to be Code
  },
  data() {
    return {
      Chars: "",
      CharsArray: [],
      LettersArray: [],
      IsCurrencyCode: false,
      SpriteChars: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        ",",
        ".",
        "$",
        "¥",
        "€",
        "₽",
        "£",
      ],
      SpriteLetters: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
    };
  },
  computed: {
    // Adjust width according to the font
    CharWidth() {
      return (charIndex) => {
        switch (charIndex) {
          case 0: // char:( 1 )
            return this.i_SizeMultiplater * 110;
          case 10: // char:( , )
          case 11: // char:( . )
            return this.i_SizeMultiplater * 55;
          case 15: // char:( ₽ )
          case 16: // char:( £ )
            return this.i_SizeMultiplater * 145;
          default:
            return this.i_SizeMultiplater * 130;
        }
      };
    },
    LetterWidth() {
      return (charIndex) => {
        switch (charIndex) {
          case 0: //A
          case 12: //M
            return this.i_SizeMultiplater * 135;
          case 1: //B
            return this.i_SizeMultiplater * 118;
          case 2: //C
          case 16: //Q
            return this.i_SizeMultiplater * 122;
          case 3: //D
          case 7: //H
          case 14: //O
          case 17: //R
          case 18: //S
          case 20: //U
            return this.i_SizeMultiplater * 120;
          case 4: //E
          case 5: //F
          case 11: //L
            return this.i_SizeMultiplater * 105;
          case 6: //G
          case 21: //V
            return this.i_SizeMultiplater * 125;
          case 8: //I
            return this.i_SizeMultiplater * 50;
          case 9: //J
          case 10: //K
          case 13: //N
          case 15: //P
          case 25: //Z
            return this.i_SizeMultiplater * 115;
          case 19: //T
            return this.i_SizeMultiplater * 118;
          case 22: //W
            return this.i_SizeMultiplater * 148;
          case 23: //X
            return this.i_SizeMultiplater * 130;
          case 24: //Y
            return this.i_SizeMultiplater * 128;
          default:
            console.log("[Sprite]Invalid Input");
        }
      };
    },
    height() {
      return this.i_SizeMultiplater * 181; // sprite.png heights
    },
    CharSpriteWidth() {
      return this.i_SizeMultiplater * 3400; // 3400/16 = 200 -> char_sprite.png width is 3200 we have 16 chars
    },
    LetterSpriteWidth() {
      return this.i_SizeMultiplater * 5200; // 5200/24 = 200 -> letter_sprite.png width is 5200 we have 24 chars
    },
    moveX() {
      return (charIndex) => charIndex * this.i_SizeMultiplater * 200;
    },
  },
  methods: {
    HandleCurrencyCode() {
      if (this.i_Chars.includes(this.i_CurrencyCode)) {
        this.IsCurrencyCode = true;
      }
    },
    CharsArraySplit(i_String) {
      this.Chars = i_String.toString();

      this.CharsArray = this.Chars.split(/(\s|\d)/) // split only numbers and speical chars: ,. ...
        .filter((element) => element != " " && element != "");
      this.LettersArray = this.i_CurrencyCode.split("");
    },
    CharsMap(i_String) {
      this.CharsArraySplit(i_String);

      this.CharsArray = this.CharsArray.map((item) => {
        let index = this.SpriteChars.findIndex((element) => element == item);
        if (index != -1) {
          return index;
        }
      });

      this.LettersArray = this.LettersArray.map((item) => {
        let index = this.SpriteLetters.findIndex(
          (element) => element.toUpperCase() == item.toUpperCase()
        );
        if (index != -1) {
          return index;
        }
      });

      this.CharsArray = this.CharsArray.filter(
        (item) => item != undefined || item != null
      );
      this.LettersArray = this.LettersArray.filter(
        (item) => item != undefined || item != null
      );

      this.HandleCurrencyCode(); // have to be last, stops function for some reason
    },
  },
  watch: {
    i_Chars(i_NewValue) {
      this.CharsMap(i_NewValue);
    },
  },
  mounted() {
    this.CharsMap(this.i_Chars);
  },
};
</script>
  
  <style scoped lang="scss">
.sprite-container {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.win-amount-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.win-amount {
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
}

.currency-code {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.8);

  img {
    height: 90%;
    width: 70%;
    object-fit: contain;
  }
}
</style>