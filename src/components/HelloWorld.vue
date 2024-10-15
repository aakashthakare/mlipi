<template>
  <div>
    <div v-for="(p, k) in this.page" :key="k" >
      <div v-for="(c, j) in p" :key="j" :style="{ fontSize: this.baseFontSize + 'px' }">
        <br /><br />
        <span v-for="(k, i) in c" :key="i"> 
          <span v-for="(matra, index) in k" :key="index">
            <span style="margin-top: 35px;position: absolute;float: left;margin-left: -5px;font-size: 15px;color: green;">
              {{ toGujarati(matra.taliKhali) }}
            </span>
            <span v-for="(symbol, index) in matra.symbols" :key="index">
              <span v-if="isDashOrAvgrah(symbol)">
                {{ toDashOrAvgrah(symbol) }}
              </span>
              <span v-else-if="isNexQuote(index, matra.symbols)">
                {{ taarSaptak(symbol) }}
              </span>
              <span v-else-if="isNextComma(index, matra.symbols)">
                {{ mandraSaptak(symbol) }}
              </span>
              <span v-else-if="isNextTild(index, matra.symbols)">
                {{ tivraM() }}
              </span>
              <span v-else-if="isNextUnderscore(index, matra.symbols)">
                <u>{{ toGujarati(symbol) }}</u>
              </span>
              <span v-else-if="isNextChar(index, matra.symbols)">
                {{ toGujarati(symbol) }}
              </span>
            </span>
            <span v-if="hasMoreThanOneSymbol(matra.symbols)" :style="computeFontSize(matra.symbols)" >⌣</span>
            &nbsp;
          </span>
          <span>&nbsp;|&nbsp;</span>
        </span>
        <span>&nbsp;|&nbsp;</span>
      </div>
    </div>
    <div class="no-print" style="height: 150px;background: lightgray;position:fixed;width:100%;bottom:0;left:0;">
      <form @submit.prevent="submit" style="position: fixed;bottom: 0;width: 100%;padding:5px;">
        <textarea rows="5" cols="200" v-model="input"></textarea> <br />
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
      baseFontSize: 20,
      input: 'Xrmrp m--r 0rpsp pmgr\'|Xmr--  n,-sr 0s-s-||',
      matra: {
        taliKhali: '',
        symbols: []
      },
      page: []
    };
  },
  methods: {
    hasMoreThanOneSymbol(symbols) {
      return symbols.filter(char => 'srgmpdn'.includes(char)).length > 1;
    },
    clear() {
      this.page = []
    },
    tivraM() {
      return 'મે';
    },
    isDashOrAvgrah(symbol) {
      return symbol == '-' || symbol == '$';
    },
    isNextChar(index, symbols){
      return 'srgmpdn'.includes(symbols[index]);
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
          case '0':
            s = '૦';
            break;
          case '1':
            s = '૧';
            break;
          case '2':
            s = '૨';
            break;
          case '3':
            s = '૩';
            break;
          case '4':
            s = '૪';
            break;
          case '5':
            s = '૫';
            break;
          case '6':
            s = '૬';
            break;
          case '7':
            s = '૭';
            break;
          case '8':
            s = '૮';
            break;
          case '9':
            s = '૯';
            break;
          case 'X':
            s = 'X';
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
      var marginLeft = 0;

      for (let i = 0; i < text.length; i++) {
        switch(text[i]) {
          case 's':
          case 'n':
          case 'r':
          case 'd':
          case 'g':
          case 'm':
          case 'p':
          case '-':
            charW += this.baseFontSize;
            break;
        }
        const left = this.baseFontSize / 2;
        switch(text[i]) {
          case 's':
            marginLeft += (left * 1.5);
            break;  
          case 'n':
          case 'r':
            marginLeft += (left * 1.25);
            break;
          case 'm':
          case 'd':
          case 'g':
          case 'p':
          case '-':
            marginLeft += left;
            break;
        }
      }

      const fontSize = (charW - this.baseFontSize) + 'px';
      var marginTop = this.baseFontSize * 0.75;

      return {
        fontSize: fontSize,
        position: 'absolute',
        marginTop: marginTop + 'px',
        marginLeft: (marginLeft * -1) + 'px',
        color: 'gray'
      };
    },
    submit() {
      console.log(this.input);

      var comps = this.input.split("\n");
      var c = [];

      for(var i = 0; i < comps.length; i++) {
        var item = comps[i].trim();
        if(item.length == 0) continue;

        var khands = item.split("|");
        var k = [];

        for(var j = 0; j < khands.length; j++) {
          var mt = khands[j].split(' ');
          if(mt.length == 0) continue;
          var matras = [];

          for (var a = 0; a < mt.length; a++) {
            var taliKhali = '';
            var m = mt[a];
            if(m.trim().length == 0) continue;
            
            if((m.charAt(0) >= '0' && m.charAt(0) <= '9') || m.charAt(0) == 'X') {
              taliKhali = m.charAt(0);
              m = m.substring(1, m.length);
            }

            const matra = {
              taliKhali: taliKhali,
              symbols: m.split('').filter(item => item.trim().length > 0).map(item =>  item.trim())
            };
            matras.push(matra);
          }
          if(matras.length > 0) k.push(matras);
        }
        if(k.length > 0) c.push(k);
      }
      this.page.push(c);
      console.log(this.page);
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

