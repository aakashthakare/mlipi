<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
  
  <div>
    <input type="text" v-model="iv1" @keydown="onKeyDown('iv1', $event)"/>&nbsp;
    <input type="text" v-model="iv2" @keydown="onKeyDown('iv2', $event)"/>&nbsp;<span style="font-size: 38px;position:absolute; margin-top: -12px;">|</span>&nbsp;
    <input type="text" v-model="iv3" @keydown="onKeyDown('iv3', $event)"/>&nbsp;
    <input type="text" v-model="iv4" @keydown="onKeyDown('iv4', $event)"/>&nbsp;<span style="font-size: 38px;position:absolute; margin-top: -12px;">||</span>&nbsp;

    <input type="button" value="Add" @click="addClicked($event)"/>

    
    <div style="width: auto;float: left;white-space: normal;display: block;"  v-for="(text, index) in addedTexts" :key="index" >
      <span>{{ text }}</span>
      <span :style="computeFontSize(text)" >⌣</span>
      &nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      iv1: '',
      iv2: '',
      iv3: '',
      iv4: '',
      text: '',
      addedTexts: []
    };
  },
  props: {
    msg: String
  },
  methods: {
    computeFontSize(text) {
      console.log(text.length);
      var base = 11;
      var marginTop;
      var marginLeft;

      switch(text.length) {
        case 1:
          marginTop = '15px';
          break;
        case 2:
          marginTop = '9px';
          break;
        case 3:
          marginTop = '4px';
          break;
        case 4:
          marginTop = '0px';
          break;
        default:
          marginTop = base + 'px';
          marginLeft = (base * (text.length - 1) * -1) + 'px';
          break;
      }

      const fontSize = (base * text.length) + 'px';

      return {
        fontSize: fontSize,
        position: 'absolute',
        marginTop: marginTop,
        marginLeft: marginLeft
      };
    },
    addClicked(e) {
      console.log(e);
      this.addedTexts.push(this.iv1);
      this.addedTexts.push(this.iv2);
      this.addedTexts.push(this.iv3);
      this.addedTexts.push(this.iv4);
      console.log(this.addedTexts);
    },
    onKeyDown(m, e) {
        // console.log(e);
        var s = ''
        switch (e.key) {
          case 'Backspace':
          case 'Escape':
          case 'Tab':
            return;
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
            console.log(`The key '${e.key}' is restricted`);
            break;
        }
        e.preventDefault();
        if(s != '') {
          this[m] += ('' + s); 
        }
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
