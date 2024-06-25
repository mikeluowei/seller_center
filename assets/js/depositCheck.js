// 基础信息暂存
function basicsDepositCheck(obj, This) {
  console.log(obj)
  let arr = [];
  if (obj.goodsLabelID == '') {
    arr.push(1)
  }

  if (obj.healthHousekeeper == '') {
    arr.push(1)
  }

  if (obj.name == '') {
    arr.push(1)
  }

  if (obj.brand1 == '') {
    arr.push(1)
  }

  if (obj.unit == '') {
    arr.push(1)
  }

  if (obj.goodsTypeValue == '') {
    arr.push(1)
  }

  if (obj.goodPacking == '') {
    arr.push(1)
  }

  if (arr.length >= 7) {
    This.$alert('您的输入内容过少不建议暂存', '内容过少', {
      confirmButtonText: '确定',
      callback: action => {
        This.$message({
          message: '暂存失败',
          type: 'warning'
        });
      }
    });

    return;
  } else {

    This.$confirm('视频信息将无法为你暂存,偶然出现部分信息暂存时丢失, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      window.localStorage.setItem('basicsCache', JSON.stringify(obj));
      This.$message({
        type: 'success',
        message: '暂存成功!'
      });
    }).catch(() => {
      This.$message({
        type: 'info',
        message: '已取消暂存'
      });
    });
  }

};


export {
  basicsDepositCheck,
}
