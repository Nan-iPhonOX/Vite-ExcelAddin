<template>
  <div id="Excel">
    <div class="content">
      <div class="content-header">
        <div class="padding">
          <h1>欢迎</h1>
        </div>
      </div>
      <div class="content-main">
        <div class="padding">
          <p>
            点击下面的按钮设置单元格为自定义颜色
          </p>
          <br />
          <h3>尝试一下</h3>
          <button @click="onSetColor">设置颜色</button>
          <input type="button" value="合并" @click="Vmerge">
          <input type="button" value="fetch" @click="fetchWeb">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
Office.onReady()
function onSetColor() {
  window.Excel.run(async context => {
    const range = context.workbook.getSelectedRange();
    range.format.fill.color = 'yellow';
    await context.sync();
  });
}

function Vmerge() {
  Excel.run(async (context) => {
    let activeRange = context.workbook.getSelectedRange();
    activeRange.load(["address","rowCount","columnCount","values"])
    await context.sync();
    const {rowCount,columnCount,values} = activeRange
    for(let col=0; col<columnCount;col++)
    {
      let postCell = activeRange.getAbsoluteResizedRange(1,1).getOffsetRange(0,col);
      let celVal=values[0][col];
      let stepPos=0;
      for(let row = 1;row <rowCount;row++)
      {
        if(values[row][col]===celVal && row ===rowCount-1)
        {
          postCell.getResizedRange(row-stepPos,0).merge();
          break;
        }
        if(values[row][col]===celVal) continue;
        if(values[row][col]!==celVal) {
          postCell.getResizedRange(row-1-stepPos,0).merge();
          celVal=values[row][col];
          postCell = postCell.getOffsetRange(row-stepPos,0);
          stepPos=row
        }
      }
    }
    await context.sync()
  });
}

async function fetchWeb() {
  Excel.run(async () => {
    const response = await fetch("https://www.bing.com/")
    if (!response.ok) {
      console.log("err:");
      throw new Error(response.statusText)
    }
    const log = await response.text();
    console.log(log);
    
      
  })
}

</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
}

.content-header {
  background: #620f3b;
  color: #fff;
}

.content-main {
  background: #fff;

}

.padding {
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
</style>