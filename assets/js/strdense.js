module.exports = {
    // 加密
    compileStr(code){
    	let c = String.fromCharCode(code.charCodeAt(0) + code.length);
    	
    	for(let i=1; i<code.length; i++){
    		c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
    	}
      
    	return escape(c);
    },
    
    // 解密
    uncompileStr(code){
    	code = unescape(code);
    	
    	let c = String.fromCharCode(code.charCodeAt(0) - code.length);
    	
    	for(var i = 1; i < code.length; i++){        
    		c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));        
    	}        
    	return c;
    }
    
  }