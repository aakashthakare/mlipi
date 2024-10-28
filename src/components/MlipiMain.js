export default {
    data() {
      return {
        baseFontSize: 20,
        input: localStorage.getItem('lastInput'),
        matra: {
          taliKhali: '',
          symbols: [],
          ending: ''
        },
        page: [],
        transliterationEnabled: true
      };
    },
    methods: {
      print() {
        window.print();
      },
      showHideGI() {
        var gi = document.getElementById("gi");
        gi.style.display = gi.style.display == 'none' ? 'block' : 'none';
      },
      toGujarati(number) {
        var s = '#';
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
        text = text.replaceAll('<u>', '');
        text = text.replaceAll('</u>', '');
        const segmenter = new Intl.Segmenter('gu', { granularity: 'grapheme' });
        return [...segmenter.segment(text)].length;
      },
      isMatraNeeded(text) {
        text = text.replaceAll('|', '');
        text = text.replaceAll('।', '');
        return this.actualLength(text) > 1;
      },
      getTextWidth(matras) {
        var length = this.actualLength(matras.symbols);
        
        var curve = '◟';
        for(var i = 0; i < length; i++) {
          curve += '_';
        }
        curve += '◞';
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = getComputedStyle(document.body).font;
        return context.measureText(curve).width;
      },
      clear() {
        this.page = []
      },
      updateCache() {
        localStorage.setItem('lastInput', this.input);
      },
      replaceSwars(text) {
        text = text.replaceAll('s,', 'સા઼');
        text = text.replaceAll('r,', 'રે઼');
        text = text.replaceAll('g,', 'ગ઼');
        text = text.replaceAll('m,', 'મ઼');
        text = text.replaceAll('p,', 'પ઼');
        text = text.replaceAll('d,', 'ધ઼');
        text = text.replaceAll('n,', 'ની઼');

        text = text.replaceAll('s\'', 'સાં');
        text = text.replaceAll('r\'', 'રેં');
        text = text.replaceAll('g\'', 'ગં');
        text = text.replaceAll('m\'', 'મં');
        text = text.replaceAll('p\'', 'પં');
        text = text.replaceAll('d\'', 'ધં');
        text = text.replaceAll('n\'', 'નીં');

        text = text.replaceAll('m^', 'મે');

        text = text.replaceAll('s_', '<u>સા</u>');
        text = text.replaceAll('r_', '<u>રે</u>');
        text = text.replaceAll('g_', '<u>ગ</u>');
        text = text.replaceAll('m_', '<u>મ</u>');
        text = text.replaceAll('p_', '<u>પ</u>');
        text = text.replaceAll('d_', '<u>ધ</u>');
        text = text.replaceAll('n_', '<u>ની</u>');
        return text;
      },
      submit() {
        this.clear();
        this.updateCache();
        var comps = this.input.split("\n");
        var c = [];
        
  
        for(var i = 0; i < comps.length; i++) {
          var item = comps[i].trim();
          if(item.length == 0) continue;

          if(item.startsWith('==')) {
            c.push([{
              taliKhali: '',
              symbols: item.slice(2),
              isComment: true
            }]);
          } else {
            var matras = [];
            var m = item.split(" ");
            
            for(var x = 0; x < m.length; x++) {
              var mt = m[x];
              var taliKhali = '';
              if(mt.length == 0) continue;
              
              if((mt.charAt(0) >= '0' && mt.charAt(0) <= '9') || mt.charAt(0) == 'X') {
                taliKhali = mt.charAt(0);
                mt = mt.substring(1, mt.length);
              }
              mt = this.replaceSwars(mt);
            
              matras.push({
                taliKhali: taliKhali,
                symbols: mt,
                isComment: false
              });
            }
            if(matras.length > 0) c.push(matras);
          }
        }
        this.page.push(c);
      }
    }
  }