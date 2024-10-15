<template>
  <div>
    <div v-for="(p, k) in this.page" :key="k" >
      <div v-for="(c, j) in p" :key="j" :style="{ fontSize: this.baseFontSize + 'px' }">
        <br />
        <span v-for="(k, i) in c" :key="i"> 
          <span v-for="(matra, index) in k" :key="index" style="padding:5px;">
            <span v-if="matra.taliKhali != ''" style="margin-top: 35px;position: absolute;float: left;margin-left: -5px;font-size: 15px;color: green;">
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
      </div>
    </div>
    <div class="no-print" style="height: 150px;background: lightgray;position:fixed;width:100%;bottom:0;left:0;">
      <form @submit.prevent="submit" style="position: fixed;bottom: 0;width: 100%;padding:5px;">
        <textarea rows="5" cols="200" v-model="input" placeholder="Enter the composition here."></textarea> <br />
        <input type="submit" value="Add"/>&nbsp;&nbsp;
        <input type="button" value="Clear" @click="clear"/>
      </form>
    </div>
  </div>
</template>

<script src='./MlipiMain.js' />
<style src='./MlipiMain.css' scoped />
