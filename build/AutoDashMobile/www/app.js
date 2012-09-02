Ext.define("AutoDashMobile.model.Mileage",{extend:"Ext.data.Model",config:{fields:[{name:"id",type:"int"},{name:"date",type:"string"},{name:"end",type:"int"},{name:"start",type:"int"},{name:"carId",type:"int"}]}});Ext.define("AutoDashMobile.controller.Mileage",{extend:"Ext.app.Controller",config:{refs:{mileageScreen:"#mileageScreen",viewMileageBtn:"#viewMileage",enterMileageBtn:"#enterMileage",saveBtn:"#saveMileage",clearBtn:"#clearMileage",mileageInputForm:"#mileageInputForm",mileageHistoryStore:"#mileageHistoryStore",mileageView:"#mileageView"},control:{saveBtn:{tap:"doSave"},clearBtn:{tap:"doClear"},viewMileageBtn:{tap:"doView"},enterMileageBtn:{tap:"doEnter"}}},init:function(){if(DB==undefined){DB=window.openDatabase(DB_NAME,DB_VERSION,DB_DISPLAY_NAME,DB_SIZE)}DB.transaction(function(a){a.executeSql("CREATE TABLE IF NOT EXISTS Mileages (id INTEGER PRIMARY KEY UNIQUE NOT NULL, start INTEGER NOT NULL, end INTEGER NOT NULL, date TEXT NOT NULL, carId INTEGER)")},this.displayError)},doSave:function(){var b=this.getMileageInputForm().getValues();var a=Ext.Date.format(b.date,DATE_FORMAT);DB.transaction(function(c){c.executeSql("INSERT INTO Mileages (start, end, date, carId) VALUES ("+b.startMileage+", "+b.endMileage+', "'+a+'", 1)')},this.displayError,this.displayCompleted)},doClear:function(){},doView:function(){this.getMileageScreen().setActiveItem(1);DB.transaction(function(a){a.executeSql("SELECT * FROM Mileages",[],function(c,b){var g={};var h=[];var f=b.rows.length;for(var e=0;e<f;e++){var j=b.rows.item(e);j.leaf=true,h[e]=j}g.mileages=h;var d=Ext.create("Ext.data.TreeStore",{model:"AutoDashMobile.model.Mileage",defaultRootProperty:"mileages",root:g});this.getMileageView().setStore(d)}.bind(this))}.bind(this),this.displayError,this.displayCompleted)},doEnter:function(){this.getMileageScreen().setActiveItem(0)},displayError:function(a){alert("Failed to access local Database")},displayCompleted:function(){}});Ext.define("AutoDashMobile.view.Mileage",{extend:"Ext.Carousel",xtype:"mileagescreen",requires:["AutoDashMobile.controller.Mileage"],config:{title:"Mileage",iconCls:"home",items:[{docked:"top",xtype:"toolbar",ui:"neutral",items:[{xtype:"segmentedbutton",items:[{text:"Enter",id:"enterMileage",pressed:true},{text:"View",id:"viewMileage"}]},{xtype:"spacer"},{xtype:"segmentedbutton",id:"mySegBtn",items:[{text:"Save",id:"saveMileage",ui:"action"},{text:"Clear",id:"clearMileage",ui:"action"}]}]},{xtype:"formpanel",id:"mileageInputForm",items:[{xtype:"numberfield",name:"startMileage",label:"Start"},{xtype:"numberfield",name:"endMileage",label:"End"},{xtype:"datepickerfield",name:"date",label:"Date",dateFormat:"Y-m-d H:i",value:new Date()}]},{xtype:"nestedlist",id:"mileageView",title:"Mileage History",displayField:"date",backText:"Back",detailCard:{html:"You are viewing the detail card!"}}]}});Ext.define("AutoDashMobile.view.Main",{extend:"Ext.tab.Panel",xtype:"mainscreen",requires:["AutoDashMobile.view.Mileage"],config:{fullscreen:true,tabBarPosition:"bottom",items:[{xtype:"mileagescreen",id:"mileageScreen"},{title:"Gas",html:"//TODO: Fill this page"}]}});var DB;var DB_NAME="AutoDash";var DB_VERSION="1.0";var DB_DISPLAY_NAME="Auto Dash";var DB_SIZE=65535;var DATE_FORMAT="Y-m-d H:i";Ext.application({name:"AutoDashMobile",views:["Main"],controllers:["Mileage"],models:["Mileage"],launch:function(){Ext.Viewport.add([{xtype:"mainscreen"}])}});