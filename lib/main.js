
var classNames = ['Magellan'];
for(var i=0;i<classNames.length;i++){
  exports[classNames[i]] = (require('./classes/'+classNames[i]))[classNames[i]];
}
