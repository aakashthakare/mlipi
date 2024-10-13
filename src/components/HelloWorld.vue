<template>
  <div>
    <form @submit.prevent="submit">
      <textarea v-model="input"></textarea>
      <input type="submit" value="Load"/>
    </form>
    <span v-for="(k, index) in this.khand" :key="index"> 
      <span v-for="(matra, index) in k" :key="index"> 
        <span v-for="(symbol, index) in matra.symbols" :key="index">
          <span>{{ toGujarati(symbol) }}</span>
        </span>
        <span :style="computeFontSize(matra.symbols)" >⌣</span>
        &nbsp;&nbsp;
      </span>
      
      <span>&nbsp;|&nbsp;</span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '[Xr][sr]|[0mdn][pdsg]||',
      matra: {
        taliKhali: -1,
        symbols: []
      },
      khand: []
    };
  },
  methods: {
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
    computeFontSize(text) {
      var charW = 0;
      
      
      for (let i = 0; i < text.length; i++) {
        switch(text[i]) {
          case 's':
          case 'n':
          case 'd':
          case 'r':
            charW += 14;
            break;
          case 'g':
          case 'm':
          case 'p':
            charW += 11;
            break;
        }
      }

      const fontSize = charW + 'px';
      var marginTop = (15 - text.length) +'px';
      var marginLeft = (text.length * -1 * 11) + 'px';

      return {
        fontSize: fontSize,
        position: 'absolute',
        marginTop: marginTop,
        marginLeft: marginLeft
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
          console.log(m);
          
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
      console.log(this.khand);
    }
  }
}
// [Xr][s]|[0m][p]||
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

