const prodPlugins = []
if(process.env.NODE_ENV === 'production'){
  prodPlugins .push('transform-remove-console')
}
modules.exports = {
 presets:["env", {
  "modules": false,
  "targets": {
    "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
  }
}, "stage-2"],
 plugins:[
  [ 'component',
   {
      libraryName :'element-ui' ,
     styleLibraryName:'theme-chalk'
	}],"transform-vue-jsx", "transform-runtime",
	//发布产品时的插件数组
	...prodPlugins 
 ]
}
