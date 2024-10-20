<template>
  <div>
    <div v-for="(p, k) in this.page" :key="k" >
      <div v-for="(c, j) in p" :key="j">
        <div v-for="(matra, index) in c" :key="index" :style="{ width: (getTextWidth(matra))+ 'px', display: 'inline-block', textAlign: 'center', padding: this.actualLength(matra.symbols) + 'px'}">
          <span v-if="matra.isComment" style="width: 800px; text-align:left;display:block;">
            <b>{{matra.symbols}}</b>
          </span>
          <span v-else >
            <span>{{matra.symbols}}</span>
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
    <div class="no-print" style="height: 150px;background: lightgray;position:fixed;width:100%;bottom:0;left:0;">
      <form @submit.prevent="submit" style="position: fixed;bottom: 0;width: 100%;padding:5px;">
        <textarea rows="5" cols="200" v-model="input" placeholder="Enter the composition here."></textarea> <br />
        <input type="submit" value="Submit"/>&nbsp;&nbsp;
        <input type="button" value="Clear" @click="clear"/>
      </form>
    </div>
  </div>
</template>

<script src='./MlipiMain.js' />
<style src='./MlipiMain.css' scoped />
