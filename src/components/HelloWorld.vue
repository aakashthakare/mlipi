<template>
  <div>
    <div v-for="(c, j) in this.comp" :key="j">
      <br /><br />
      <span v-for="(k, i) in c" :key="i"> 
        <span v-for="(matra, index) in k" :key="index">
          <span v-if="isTaliCount(matra.taliKhali)" style="margin-top: 30px;position: absolute;float: left;margin-left: -5px;">
            {{ toTaliKhali(matra.taliKhali) }}
          </span>
          <span v-for="(symbol, index) in matra.symbols" :key="index">
            <span v-if="isDashOrAvgrah(symbol)">
              {{ toDashOrAvgrah(symbol) }}
            </span>
            <span v-else-if="isNextChar(index, matra.symbols)">
              {{ toGujarati(symbol) }}
            </span>
            <span v-else-if="isNexQuote(index, matra.symbols)">
              {{ taarSaptak(symbol) }}
            </span>
            <span v-else-if="isNextUnderscore(index, matra.symbols)">
              <u>{{ toGujarati(symbol) }}</u>
            </span>
            <span v-else-if="isNextComma(index, matra.symbols)">
              {{ mandraSaptak(symbol) }}
            </span>
            <span v-else-if="isNextTild(index, matra.symbols)">
              {{ tivraM() }}
            </span>
          </span>
          <span v-if="hasMoreThanOneSymbol(matra.symbols)" :style="computeFontSize(matra.symbols)" >⌣</span>
          &nbsp;
        </span>
        <span>&nbsp;|&nbsp;</span>
      </span>
      <span>&nbsp;|&nbsp;</span>
    </div>
    <div class="no-print" style="height: 200px;background: lightgray;position:fixed;width:100%;bottom:0;left:0;">
      <form @submit.prevent="submit" style="position: fixed;bottom: 0;width: 100%;padding:5px;">
        <textarea rows="10" cols="200" v-model="input"></textarea> <br />
        <input type="submit" value="Add"/>&nbsp;&nbsp;
        <input type="button" value="Clear" @click="clear"/>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: 'r m r p | m r s - | n, - s r | s - s - ||',
      matra: {
        taliKhali: -1,
        symbols: []
      },
      khand: [],
      comp: []
    };
  },
  methods: {
    hasMoreThanOneSymbol(symbols) {
      return symbols.filter(char => 'srgmpdn'.includes(char)).length > 1;
    },
    clear() {
      this.khand = []
      this.comp = []
    },
    tivraM() {
      return 'મે';
    },
    isDashOrAvgrah(symbol) {
      return symbol == '-' || symbol == '$';
    },
    toTaliKhali(taliKhali) {
      return taliKhali == 0 ? '0' : 'X';
    },
    isTaliCount(taliKhali){
      return taliKhali >= 0;
    },
    isNextChar(index, symbols){
      return index + 1 >= symbols.length || 'srgmpdn'.includes(symbols[index + 1]);
    },
    isNexQuote(index, symbols){
      return symbols[index + 1] == '\'';
    },
    isNextComma(index, symbols){
      return symbols[index + 1] == ',';
    },
    isNextTild(index, symbols){
      return symbols[index] == 'm' && symbols[index + 1] == '^';
    },
    isNextUnderscore(index, symbols){
      return symbols[index + 1] == '_';
    },
    toDashOrAvgrah(symbol) {
      return symbol == '-' ? '-' : 'ડ'
    },
    toGujarati(symbol) {
      var s = '';
      switch (symbol) {
          case 's':
            s = 'સા';
            break;
          case 'r':
            s = 'રે';
            break;
          case 'g':
            s = 'ગ';
            break;
          case 'm':
            s = 'મ';
            break;
          case 'p':
            s = 'પ';
            break;
          case 'd':
            s = 'ધ';
            break;
          case 'n':
            s = 'ની';
            break;
          default:
            break;
        }
        
        return s;
    },
    mandraSaptak(symbol) {
      var s = '';
      switch (symbol) {
          case 's':
            s = 'સા઼';
            break;
          case 'r':
            s = 'રે઼';
            break;
          case 'g':
            s = 'ગ઼';
            break;
          case 'm':
            s = 'મ઼';
            break;
          case 'p':
            s = 'પ઼';
            break;
          case 'd':
            s = 'ધ઼';
            break;
          case 'n':
            s = 'ની઼';
            break;
          default:
            break;
        }
        
        return s;
    },
    taarSaptak(symbol) {
      var s = '';
      switch (symbol) {
          case 's':
            s = 'સાં';
            break;
          case 'r':
            s = 'રેં';
            break;
          case 'g':
            s = 'ગં';
            break;
          case 'm':
            s = 'મં';
            break;
          case 'p':
            s = 'પં';
            break;
          case 'd':
            s = 'ધં';
            break;
          case 'n':
            s = 'નીં';
            break;
          default:
            break;
        }
        
        return s;
    },
    computeFontSize(text) {
      var charW = 0;
      var count = 0;
      
      for (let i = 0; i < text.length; i++) {
        switch(text[i]) {
          case 's':
          case 'n':
          case 'r':
          case 'd':
          case 'g':
          case 'm':
          case 'p':
            charW += 16;
            count++;
            break;
        }
      }

      const fontSize = charW + 'px';
      var marginTop = (16 - (count * 2)) +'px'; 
      var marginLeft = (count * -1 * 12) + 'px';

      return {
        fontSize: fontSize,
        position: 'absolute',
        marginTop: marginTop,
        marginLeft: marginLeft,
        color: 'gray'
      };
    },
    parse(input) {
      input.split("|").filter(item => item !== '').map(item => {
        item = item.trim();
        var mt = item.split(' ');
        var matras = [];

        for (var i = 0; i < mt.length; i++) {
          var taliKhali;
          var m = mt[i];
          
          if(m.charAt(0) == '0') {taliKhali = 0;}
          else if(m.charAt(0) == 'X') {taliKhali = 1;}
          else {taliKhali = -1;}

          if(taliKhali >= 0) {m = m.substring(1, m.length);}
          
          const matra = {
            taliKhali: taliKhali,
            symbols: m.split('').map(item =>  item.trim())
          };
          matras.push(matra);
        }
        this.khand.push(matras);
      });
    },
    submit() {
      this.parse(this.input);
      this.comp.push(this.khand);
      this.khand = [];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {display:none;}

@media print {
  .no-print {
    display: none;
  }
}
</style>

