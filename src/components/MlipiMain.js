
export default {
    data() {
      return {
        baseFontSize: 20,
        input: '',
        matra: {
          taliKhali: '',
          symbols: []
        },
        page: []
      };
    },
    methods: {
      hasMoreThanOneSymbol(symbols) {
        return symbols.filter(char => /[srgmpdn]/.test(char)).length > 1;
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
        const map = new Map();
        map.set('s', 20.09);
        map.set('r', 9.48);
        map.set('g', 14.32);
        map.set('m', 11.52);
        map.set('p', 11.45);
        map.set('d', 13.1);
        map.set('n', 16.19);
        map.set('-', 6.66);
        map.set('$', 10.09);
        var width = text.filter(char =>!/[,'_^\s]/.test(char)).reduce((sum, w) => sum + map.get(w), 0);
        var swar = (text.filter(char => !/[,'_^\s]/.test(char)).length - 1);
  
        return {
          position: 'absolute',
          color: 'gray',
          fontSize: (width + 17.38) + 'px',
          marginLeft: (-1 * width) + 'px',
          marginTop: (27.5 - (swar * 3)) + 'px'
        };
      },
      submit() {
        var comps = this.input.split("\n");
        var c = [];
  
        for(var i = 0; i < comps.length; i++) {
          var item = comps[i].trim();
          
          if(item.length == 0) continue;
  
          var khands = item.split("|");
          var k = [];
  
          for(var j = 0; j < khands.length; j++) {
            console.log(khands[j]);
            var mt = khands[j].split(' ');
            if(mt.length == 0) continue;
            var matras = [];
  
            for (var a = 0; a < mt.length; a++) {
              var taliKhali = '';
              var m = mt[a];
              console.log("m ->"+m);
              if(m.trim().length == 0) continue;
              
              if((m.charAt(0) >= '0' && m.charAt(0) <= '9') || m.charAt(0) == 'X') {
                taliKhali = m.charAt(0);
                m = m.substring(1, m.length);
              }
  
              const matra = {
                taliKhali: taliKhali,
                symbols: m.split('').filter(item => item.trim().length > 0).filter(char => 'srgmpdn$,\'_^'.includes(char)).map(item =>  item.trim())
              };
              matras.push(matra);
            }
            if(matras.length > 0) k.push(matras);
          }
          if(k.length > 0) c.push(k);
        }
        console.log(c);
        this.page.push(c);
      }
    }
  }