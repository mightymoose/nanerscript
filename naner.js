var run = function(s){
    var program = [];
    $("#NANER").html().trim().split('\n').forEach(function(f){ program.unshift(f.trim()); });
    var last = null;
    program.forEach(function(f){
        var next = null;
        if(f.indexOf("click") == 0){
            next = new nanerClack(f.split(" ").pop());
        }
        if(f.indexOf("tick") == 0){
            next = new tickingNaner(f.split(" ").pop());
        }
        if(f.indexOf("dom") == 0){
            next = new domNaner(f.split(" ").pop());
        }
        if(f.indexOf("const") == 0){
            next = new adaNaner(f.split(" ").slice(1, f.lengh).join(" "));
        }
        if(!next){
            next = new nanerCaf(f);
        }
        if(last){
            next.nextNom = last;
        }
        last = next;
    });
    $(s).html(program.join("<br>"));
    last.call();
}

var adaNaner = function(v){
    var self = this;
    self.call = function(){
        self.nextNom.call(v);
    }
    self.nextNom = { call: function(){} };
}

var nanerClack = function(s){
    var self = this;
    self.call = function(val){
        $(s).click(self.nextNom.call);
    }
    self.nextNom = { call: function(){} };
}

var nanerCaf = function(f){
    var self = this;
    self.call = function(val){
        var val = eval(f)(val);
        self.nextNom.call(val);
    }
    self.nextNom = { call: function(){} };
}

var tickingNaner = function(f){
    var self = this;
    self.call = function(){
        self.nextNom.call(new Date());
        setTimeout(arguments.callee, f);
    };
    self.nextNom = { call: function(){} };
}

var domNaner = function(s){
    var self = this;
    self.call = function(val){
        $(s).html(val);
        self.nextNom.call(val);
    };
    self.nextNom = { call: function(){} };
}

$(function(){ run("#NANER"); });
