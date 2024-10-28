<template>
  <div>
    <div v-for="(p, k) in this.page" :key="k">
      <div v-for="(c, j) in p" :key="j">
        <div v-for="(matra, index) in c" :key="index" :style="{ width: (getTextWidth(matra))+ 'px', display: 'inline-block', textAlign: 'center', padding: this.actualLength(matra.symbols) + 'px'}">
          <span v-if="matra.isComment" style="width: 800px; text-align:left;display:block;">
            <b>{{matra.symbols}}</b>
          </span>
          <span v-else >
            <span v-html="matra.symbols"></span>
            <span :style="{float:'left', color: isMatraNeeded(matra.symbols) ? 'black'  :'transparent', fontSize:'18px', marginTop: '-10px'}">
              <span>◟</span>
              <span v-for="n in actualLength(matra.symbols)" :key="n">_</span>
              <span>◞</span>
            </span>
            <span  :style="{float:'left', color: toGujarati(matra.taliKhali) != '#' ? 'black':'transparent'}">{{toGujarati(matra.taliKhali)}}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="no-print" style="height: 100%;background: aliceblue;position: fixed;width: 600px;right: 0px;top: 0px;">
      <h3>&nbsp; ✍🏻 Type your composition below.</h3>
      <div style="position: fixed;bottom: 0;width: 100%;padding:10px;">
        <textarea style="font-size:18px;" rows="40" cols="50" v-model="input" @input="submit" placeholder="Enter the composition here."></textarea> <br />
        <input class="otherButton" type="button" value="🧹 Clear Page" @click="clear"/> &nbsp;&nbsp;
        <input class="otherButton" type="button" value="⌨️ Google Input" @click="showHideGI"/>&nbsp;&nbsp;
        <input class="otherButton" type="button" value="🖨️ Print" @click="print"/>
      </div>
    </div>
    <div id="gi" class="no-print" style="display:none;position:absolute;width:800px; height:700px;left:0;top:0;">
      <input type="button" value="X" @click="showHideGI" style="position:absolute;right: 0;background: aliceblue;"/>
      <iframe src="https://www.google.com/inputtools/try/" style="width: 100%;height: 100%;"></iframe>
    </div>
  </div>
</template>

<script src='./MlipiMain.js' />
<style src='./MlipiMain.css' scoped />
