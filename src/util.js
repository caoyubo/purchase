
//设置cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
  console.log(document.cookie);
}
//获取cookie
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}

//上传头
function  headers(){
  return{
    'token':localStorage.getItem('token'),
    'system':'vue-simp'
  }
}


function    sysparam(gcode, result) { //获取参数翻译列表
  this.$request.get(this.API.HTTP.sysparam.getParamMap, {
    gcode: gcode
  }, res => {
    console.log(res);
    result(res);
  })
}

function exportFile(url,param,fileName){
  this.$request.exportDataByPost(url,param,{ responseType:'arraybuffer'})
  .then(res => {
    let blob = new Blob([res.data], {type: "application/vnd.ms-excel"}); 
    var filename = fileName ;
    if(filename == ''||filename == undefined){
      filename ='数据导出.xls';
    }else if(! filename.endsWith(".xls")){
      filename += '.xls';
    }
    
    let URLOBJ = window.URL || window.webkitURL;
    if ('download' in document.createElement('a')) {
    const downloadElement = document.createElement('a');
    let href = URLOBJ.createObjectURL(blob);
    downloadElement.href = href;
    downloadElement.download = filename;
    document.body.appendChild(downloadElement);
    downloadElement.click();
    URLOBJ.revokeObjectURL(href);
    document.body.removeChild(downloadElement);
    } else {
    navigator.msSaveBlob(blob, filename);
    }
  })

}



var MyPlugin = {
  // 自定义插件
  install(Vue, options) {
    Vue.prototype.setCookie = setCookie;
    Vue.prototype.getCookie = getCookie;
    Vue.prototype.sysparam =sysparam;
    Vue.prototype.headers =headers;
    Vue.prototype.exportFile =exportFile;
    

    Vue.prototype.$limit = (str, length) => { // 限制字符数，超过显示为...
      var bytesCount = 0,
        limitedBytes = length * 2;
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (/^[\u0000-\u00ff]$/.test(c)) //匹配双字节
        {
          bytesCount += 1;
        } else {
          bytesCount += 2;
        }
        if (bytesCount > limitedBytes) {
          return str.substring(0, i) + '...';
        }
      }
      return str;
    }


    /**
     * 和PHP一样的时间戳格式化函数
     * @param {string} format 格式
     * @param {int} timestamp 要格式化的时间 默认为当前时间
     * @return {string}   格式化的时间字符串
     *调用：
     timestampToDate('Y-m-d','1350052653');//很方便的将时间戳转换成了2012-10-11
     timestampToDate('Y-m-d H:i:s','1350052653');//得到的结果是2012-10-12 22:37:33
     */
    Vue.prototype.timestampToDate = (format, timestamp) => {
      var a,
        jsdate = ((timestamp) ?
          new Date(timestamp * 1000) :
          new Date());
      var pad = function (n, c) {
        if ((n = n + "").length < c) {
          return new Array(++c - n.length).join("0") + n;
        } else {
          return n;
        }
      };
      var txt_weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      var txt_ordin = {
        1: "st",
        2: "nd",
        3: "rd",
        21: "st",
        22: "nd",
        23: "rd",
        31: "st"
      };
      var txt_months = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      var f = {
        // Day
        d: function () {
          return pad(f.j(), 2)
        },
        D: function () {
          return f
            .l()
            .substr(0, 3)
        },
        j: function () {
          return jsdate.getDate()
        },
        l: function () {
          return txt_weekdays[f.w()]
        },
        N: function () {
          return f.w() + 1
        },
        S: function () {
          return txt_ordin[f.j()] ?
            txt_ordin[f.j()] :
            'th'
        },
        w: function () {
          return jsdate.getDay()
        },
        z: function () {
          return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
        },

        // Week
        W: function () {
          var a = f.z(),
            b = 364 + f.L() - a;
          var nd2,
            nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
          if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
            return 1;
          } else {
            if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
              nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
              return date("W", Math.round(nd2.getTime() / 1000));
            } else {
              return (1 + (nd <= 3 ?
                ((a + nd) / 7) :
                (a - (7 - nd)) / 7) >> 0);
            }
          }
        },

        // Month
        F: function () {
          return txt_months[f.n()]
        },
        m: function () {
          return pad(f.n(), 2)
        },
        M: function () {
          return f
            .F()
            .substr(0, 3)
        },
        n: function () {
          return jsdate.getMonth() + 1
        },
        t: function () {
          var n;
          if ((n = jsdate.getMonth() + 1) == 2) {
            return 28 + f.L();
          } else {
            if (n & 1 && n < 8 || !(n & 1) && n > 7) {
              return 31;
            } else {
              return 30;
            }
          }
        },

        // Year
        L: function () {
          var y = f.Y();
          return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ?
            1 :
            0
        },
        //o not supported yet
        Y: function () {
          return jsdate.getFullYear()
        },
        y: function () {
          return (jsdate.getFullYear() + "").slice(2)
        },

        // Time
        a: function () {
          return jsdate.getHours() > 11 ?
            "pm" :
            "am"
        },
        A: function () {
          return f
            .a()
            .toUpperCase()
        },
        B: function () {
          // peter paul koch:
          var off = (jsdate.getTimezoneOffset() + 60) * 60;
          var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
          var beat = Math.floor(theSeconds / 86.4);
          if (beat > 1000)
            beat -= 1000;
          if (beat < 0)
            beat += 1000;
          if ((String(beat)).length == 1)
            beat = "00" + beat;
          if ((String(beat)).length == 2)
            beat = "0" + beat;
          return beat;
        },
        g: function () {
          return jsdate.getHours() % 12 || 12
        },
        G: function () {
          return jsdate.getHours()
        },
        h: function () {
          return pad(f.g(), 2)
        },
        H: function () {
          return pad(jsdate.getHours(), 2)
        },
        i: function () {
          return pad(jsdate.getMinutes(), 2)
        },
        s: function () {
          return pad(jsdate.getSeconds(), 2)
        },
        //u not supported yet Timezone e not supported yet I not supported yet
        O: function () {
          var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
          if (jsdate.getTimezoneOffset() > 0)
            t = "-" + t;
          else
            t = "+" + t;
          return t;
        },
        P: function () {
          var O = f.O();
          return (O.substr(0, 3) + ":" + O.substr(3, 2))
        },
        //T not supported yet Z not supported yet Full Date/Time
        c: function () {
          return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
        },
        //r not supported yet
        U: function () {
          return Math.round(jsdate.getTime() / 1000)
        }
      };

      return format.replace(/([\]?([a-zA-Z])/g, function (t, s) {
        var ret = '';
        if (t != s) {
          // escaped
          ret = s;
        } else if (f[s]) {
          // a date function exists
          ret = f[s]();
        } else {
          // nothing special
          ret = s;
        }
        return ret;
      });
    };
  }
}
export default MyPlugin
