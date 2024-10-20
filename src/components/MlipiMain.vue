<template>
  <div>
    <div v-for="(p, k) in this.page" :key="k" >
      <div v-for="(c, j) in p" :key="j">
        <div v-for="(k, i) in c" :key="i"> 
          <div v-for="(matra, index) in k" :key="index" :style="{ width: getTextWidth(matra.symbols) + 'px', display: 'inline-block', textAlign: 'center', padding: '5px'}">
            <table>
              <tr><span>{{matra.symbols}}</span></tr>
              <tr>
                <span :style="{float:left, color: this.actualLength(matra.symbols) > 1 ? 'black'  :'white', fontSize:'14px'}">
                  <span>◟</span><span v-for="n in actualLength(matra.symbols)" :key="n">_</span><span>◞</span>
                </span>
              </tr>
              <tr>
                <span  :style="{float:left, color:'green'}">{{toGujarati(matra.taliKhali)}}</span>
              </tr>
            </table>
          </div>
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
