var util = require("util");
var events = require("events");
var fs = require("fs");

var Magellan = function(){
  this._device = '/dev/ttyACM0';
  this.mode = 0;
  events.EventEmitter.call(this);
}



util.inherits(Magellan, events.EventEmitter);
Object.defineProperty(Magellan.prototype, 'device', {
    get: function() {
      return this._device;
    },
    set: function(dev) {
      this._device = dev;
    }
});

Magellan.prototype.read = function(cb){
  var me = this;
  if (fs.existsSync(this.device)){
    me.readStream = fs.createReadStream(this.device,{ flags: 'r',
      encoding: null,
      fd: null,
      mode: 0666,
      autoClose: false
    });
    me.readStream.on('data',function(data){
      if (data.toString('utf8',0,1)==='i'){
        cb(data.toString('utf8',1,data.length-2)); //cut of check digit
      }else{
        cb(data.toString('utf8',1));
      }

    });
    me.readStream.on('close',function(data){
      setTimeout(me.read(cb),2000);
    })
    me.readStream.on('end',function(data){
        setTimeout(me.read(cb),2000);
    });
  }
}

exports.Magellan = Magellan;
