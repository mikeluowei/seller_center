// 把时间转换成标准时间
function timeTurn(str) {
  if (!str) return;
  let time = new Date(str).getTime();
  return new Date(time);
};

// 时间不足一位补位
function formatTen(num) {
  return num > 9 ? (num + "") : ("0" + num);
};

// 把标准时间转换成年月日时分秒
function formatDate(date) {
  var date = new Date(date)
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return year + "-" + formatTen(month) + "-" + formatTen(day) + " " + formatTen(hour) + ":" + formatTen(minute) + ":" + formatTen(second);
};

// 把标准时间转换成年月日时分秒
function formatDate2(date) {
  if(Object.prototype.toString.call(date) != '[object String]'){
    var date = new Date(date)
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + "-" + formatTen(month) + "-" + formatTen(day) + " " + formatTen(hour) + ":" + formatTen(minute) + ":" + formatTen(second);
  }
  else{
	  return date;
  }

};

// 把时间转换成毫秒数
function conversionTime(item) {
  if(Object.prototype.toString.call(item) != '[object String]'){
  	item = formatDate(item);
  }

  let arr1 = item.trim().split(" ");

  let arr2 = arr1[0].replace(new RegExp(":", "gm"), "/");

  let arr3 = [arr2, arr1[1]];

  let str1 = arr3.join(" ");

  return (new Date(str1)).getTime();
};


// 深拷贝一个对象
function objDeepCopy(obj) {
  var sourceCopy = obj instanceof Array ? [] : {};
  for (var item in obj) {
    sourceCopy[item] = typeof obj[item] === 'object' ? objDeepCopy(obj[item]) : obj[item];
  }
  return sourceCopy;
};

// 迪卡乘积函数
function cartesianProductOf(array) {
  if (array.length < 2) return array[0] || [];
  return [].reduce.call(array, function(col, set) {
    var res = [];
    col.forEach(function(c) {
      set.forEach(function(s) {
        var t = [].concat(Array.isArray(c) ? c : [c]);
        t.push(s);
        res.push(t);
      })
    });
    return res;
  });
};

export {
  timeTurn,
  objDeepCopy,
  cartesianProductOf,
  conversionTime,
  formatDate,
  formatDate2,
}
