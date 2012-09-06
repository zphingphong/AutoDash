Ext.define("AutoDashMobile.model.Mileage",{extend:"Ext.data.Model",config:{fields:[{name:"id",type:"int"},{name:"date",type:"string"},{name:"end",type:"int"},{name:"start",type:"int"},{name:"car_id",type:"int"},{name:"destination",type:"string"},{name:"purpose",type:"string"}]}});Ext.define("AutoDashMobile.controller.Mileage",{extend:"Ext.app.Controller",config:{refs:{mileageScreen:"#mileageScreen",viewMileageBtn:"#viewMileage",enterMileageBtn:"#enterMileage",saveBtn:"#saveMileage",clearBtn:"#clearMileage",syncDataBtn:"#syncData",mileageInputForm:"#mileageInputForm",mileageHistoryStore:"#mileageHistoryStore",mileageView:"#mileageView"},control:{saveBtn:{tap:"doSave"},clearBtn:{tap:"doClear"},syncDataBtn:{tap:"doSync"},viewMileageBtn:{tap:"doView"},enterMileageBtn:{tap:"doEnter"}}},init:function(){if(DB==undefined){DB=window.openDatabase(DB_NAME,DB_VERSION,DB_DISPLAY_NAME,DB_SIZE)}DB.transaction(function(a){a.executeSql("CREATE TABLE IF NOT EXISTS Mileages (id INTEGER PRIMARY KEY AUTOINCREMENT, start INTEGER NOT NULL, end INTEGER NOT NULL, date TEXT NOT NULL, car_id INTEGER NOT NULL, destination TEXT, purpose TEXT, was_synced INTEGER DEFAULT 0, FOREIGN KEY(car_id) REFERENCES Cars(id))")},this.displayError)},doSave:function(){var b=this.getMileageInputForm().getValues();var a=Ext.Date.format(b.date,DATE_FORMAT);DB.transaction(function(c){c.executeSql("INSERT INTO Mileages (start, end, date, car_id, destination, purpose) VALUES ("+b.start+", "+b.end+', "'+a+'", 1, "'+b.destination+'", "'+b.purpose+'")')},this.displayError,this.displayCompleted)},doClear:function(){this.getMileageInputForm().reset()},doView:function(){var a=this.getMileageView();this.getMileageScreen().setActiveItem(1);DB.transaction(function(b){b.executeSql("SELECT * FROM Mileages",[],function(d,c){var h={};var j=[];var g=c.rows.length;for(var f=0;f<g;f++){var k=c.rows.item(f);k.leaf=true,j[f]=k}h.mileages=j;var e=Ext.create("Ext.data.TreeStore",{model:"AutoDashMobile.model.Mileage",defaultRootProperty:"mileages",root:h});a.setStore(e)})},this.displayError,this.displayCompleted)},doEnter:function(){this.getMileageScreen().setActiveItem(0)},displayError:function(a){alert("Failed to access local database: "+a.message)},displayCompleted:function(){},doSync:function(){DB.transaction(function(a){a.executeSql("SELECT start, end, date FROM Mileages",[],function(d,b){var c=[];var f=b.rows.length;for(var e=0;e<f;e++){var g=b.rows.item(e);c[e]=g}Ext.Ajax.request({url:"http://192.168.0.40:3000/mileages/sync_mileage.json",method:"POST",headers:{"X-CSRF-Token":'meta[name="csrf-token"]'},scope:this,params:{data:Ext.JSON.encode(c)},success:function(h){console.log(h.responseText)},failure:function(h){alert(h.responseText)}})}.bind(this),this.displayError,this.displayCompleted)}.bind(this))}});Ext.define("AutoDashMobile.controller.Car",{extend:"Ext.app.Controller",config:{refs:{carScreen:"#carScreen",saveBtn:"#saveCar",newBtn:"#newCar",clearBtn:"#clearCar",carInputForm:"#carInputForm"},control:{saveBtn:{tap:"doSave"},clearBtn:{tap:"doClear"},newBtn:{tap:"doNew"}}},launch:function(){var b=this.getCarScreen();var a=this;if(DB==undefined){DB=window.openDatabase(DB_NAME,DB_VERSION,DB_DISPLAY_NAME,DB_SIZE)}DB.transaction(function(c){c.executeSql("CREATE TABLE IF NOT EXISTS Cars (id INTEGER PRIMARY KEY AUTOINCREMENT, license TEXT, name TEXT NOT NULL, current_mileage INTEGER NOT NULL, image BLOB, is_default INTEGER, was_synced INTEGER DEFAULT 0)")},this.displayError);DB.transaction(function(c){c.executeSql("SELECT * FROM Cars",[],function(f,d){var h=d.rows.length;for(var g=0;g<h;g++){var j=d.rows.item(g);var e=Ext.create("Ext.Panel",{id:"car"+j.id,items:[{xtype:"panel",html:j.name},{xtype:"button",text:"Make Default"},{xtype:"button",text:"Delete",handler:function(){var i=b.getActiveItem();b.remove(i,true);DB.transaction(function(k){k.executeSql("DELETE FROM Cars WHERE id = "+i.getId().substring(3))},a.displayError,a.displayCompleted)}}]});b.insert(g,e);b.setActiveItem(0)}},a.displayError,a.displayCompleted)})},doSave:function(){var b=this.getCarInputForm().getValues();var c=this.getCarScreen();var a=this;DB.transaction(function(d){d.executeSql('INSERT INTO Cars (license, name, current_mileage, is_default) VALUES ("'+b.license+'", "'+b.name+'", '+b.current_mileage+", 1)",[],function(g,e){var f=Ext.create("Ext.Panel",{id:"car"+e.insertId,items:[{xtype:"panel",html:b.name},{xtype:"button",text:"Make Default"},{xtype:"button",text:"Delete",handler:function(){var h=c.getActiveItem();c.remove(h,true);DB.transaction(function(i){i.executeSql("DELETE FROM Cars WHERE id = "+h.getId().substring(3))},a.displayError,a.displayCompleted)}}]});c.insert(0,f);c.setActiveItem(0)},this.displayError,this.displayCompleted)},this.displayError,this.displayCompleted)},doClear:function(){this.getCarInputForm().reset()},displayError:function(a){alert("Failed to access local database: "+a.message)},displayCompleted:function(){},doNew:function(){this.getCarScreen().setActiveItem(this.getCarInputForm())}});Ext.define("AutoDashMobile.view.Mileage",{extend:"Ext.Carousel",xtype:"mileagescreen",requires:["AutoDashMobile.controller.Mileage"],config:{title:"Mileage",iconCls:"action",items:[{docked:"top",xtype:"toolbar",ui:"neutral",items:[{xtype:"segmentedbutton",items:[{text:"Enter",id:"enterMileage",pressed:true},{text:"View",id:"viewMileage"}]},{xtype:"spacer"},{text:"Sync",id:"syncData",ui:"action"}]},{xtype:"formpanel",id:"mileageInputForm",items:[{text:"Clear",xtype:"button",id:"clearMileage",ui:"action"},{xtype:"numberfield",name:"start",label:"Start"},{xtype:"numberfield",name:"end",label:"End"},{xtype:"datepickerfield",name:"date",label:"Date",dateFormat:"Y-m-d H:i",value:new Date()},{xtype:"textfield",name:"destination",label:"Destination"},{xtype:"textfield",name:"purpose",label:"Purpose"},{text:"Save",xtype:"button",id:"saveMileage",ui:"action"}]},{xtype:"nestedlist",id:"mileageView",title:"Mileage History",displayField:"date",backText:"Back",detailCard:{html:""},listeners:{leafitemtap:function(e,d,b,f,a){var c=e.getDetailCard();c.setHtml("Date/Time: "+a.get("date")+"<br /> Start Mileage: "+a.get("start")+"<br /> End Mileage: "+a.get("end")+"<br /> Destination: "+a.get("destination")+"<br /> Purpose: "+a.get("purpose"))}}}]}});Ext.define("AutoDashMobile.view.Car",{extend:"Ext.Carousel",xtype:"carcreen",requires:["AutoDashMobile.controller.Car"],config:{title:"Car",iconCls:"home",items:[{docked:"top",xtype:"toolbar",ui:"neutral",items:[{text:"Previous",id:"previousCar",ui:"back"},{xtype:"spacer"},{text:"New",id:"newCar",ui:"action"},{xtype:"spacer"},{text:"Next",id:"nextCar",ui:"forward"}]},{xtype:"formpanel",id:"carInputForm",items:[{text:"Clear",xtype:"button",id:"clearCar",ui:"action"},{xtype:"textfield",name:"license",label:"License"},{xtype:"textfield",name:"name",label:"Name"},{xtype:"numberfield",name:"current_mileage",label:"Mileage"},{text:"Save",xtype:"button",id:"saveCar",ui:"action"}]}]}});Ext.define("AutoDashMobile.view.Main",{extend:"Ext.tab.Panel",xtype:"mainscreen",requires:["AutoDashMobile.view.Mileage","AutoDashMobile.view.Car"],config:{fullscreen:true,tabBarPosition:"bottom",items:[{xtype:"carcreen",id:"carScreen"},{xtype:"mileagescreen",id:"mileageScreen"},{title:"Gas",html:"//TODO: Fill this page"}]}});var DB;var DB_NAME="AutoDash";var DB_VERSION="1.0";var DB_DISPLAY_NAME="Auto Dash";var DB_SIZE=65535;var DATE_FORMAT="Y-m-d H:i";Ext.application({name:"AutoDashMobile",views:["Main"],controllers:["Mileage","Car"],models:["Mileage"],launch:function(){Ext.Viewport.add([{xtype:"mainscreen"}])}});