<template>
  <div>
    <form @submit.prevent="submit">
      <textarea rows="10" cols="100" v-model="input"></textarea> <br />
      <input type="submit" value="Load"/>
    </form> <br />
    <span v-for="(k, i) in this.khand" :key="i"> 
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
        <span v-if="matra.symbols.length > 1" :style="computeFontSize(matra.symbols)" >⌣</span>
        &nbsp;
      </span>
      <span>|</span>
      <span v-if="isLastKhand(i)">|</span> <br /> <br /> <br /> 
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '[Xr][sr][srg][sr-gmp]|[Xmdn][p][pd,sg][pd]|[0m^dn_][p][pdsg][p$d]|[Xmdn\'][p][pdsg][pd]||',
      matra: {
        taliKhali: -1,
        symbols: []
      },
      khand: []
    };
  },
  methods: {
    isLastKhand(index) {
      return index + 1 == this.khand.length;
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
      var marginTop = (16 - count) +'px'; 
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
        
        const regex = /\[(.*?)\]/g;
        let match;
        var matras = [];
        while ((match = regex.exec(item)) !== null) {
          var taliKhali;
          var m = match[1];
          
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
</style>

