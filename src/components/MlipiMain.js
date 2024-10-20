
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
      toGujarati(number) {
        var s = '';
        switch (number) {
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
              s = 'x';
              break;
            default:
              break;
          }
          return s;
      },
      actualLength(text) {
        const segmenter = new Intl.Segmenter('gu', { granularity: 'grapheme' });
        return [...segmenter.segment(text)].length;
      },
      getTextWidth(text) {
        var length = this.actualLength(text);
        console.log("L : " + length);
        var curve = '◟';
        for(var i = 0; i < length; i++) {
          curve += '_';
        }
        curve += '◞';
        console.log("C : " + curve);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = getComputedStyle(document.body).font;
        return context.measureText(curve).width;
      },
      hasMoreThanOneBol(text) {
        return this.actualLength(text) > 1;
      },
      clear() {
        this.page = []
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
            var m = khands[j].split(" ");
            var matras = [];

            for(var x = 0; x < m.length; x++) {
              var mt = m[x];
              var taliKhali = '';
              if(mt.length == 0) continue;
              
              if((mt.charAt(0) >= '0' && mt.charAt(0) <= '9') || mt.charAt(0) == 'X') {
                taliKhali = mt.charAt(0);
                mt = mt.substring(1, mt.length);
              }
              matras.push({
                taliKhali: taliKhali,
                symbols: mt
              });
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