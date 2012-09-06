Ext.define('AutoDashMobile.controller.Car', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            carScreen: '#carScreen',
            saveBtn: '#saveCar',
            clearBtn: '#clearCar',
            carInputForm: '#carInputForm'
        }, 
        
        control: {
            saveBtn: {
                tap: 'doSave'
            },
            clearBtn: {
                tap: 'doClear'
            }
        }
    },
           
    init: function(){
        if(DB == undefined){
            DB = window.openDatabase(DB_NAME, DB_VERSION, DB_DISPLAY_NAME, DB_SIZE);
        }
        DB.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS Cars (id INTEGER PRIMARY KEY UNIQUE NOT NULL, license TEXT, name TEXT NOT NULL, current_mileage INTEGER NOT NULL, image BLOB, is_default INTEGER, was_synced INTEGER DEFAULT 0)');
        }, this.displayError);
           
        DB.transaction(function(tx){
            tx.executeSql('SELECT * FROM Cars', [], function(tx, result){ //Cannot use the regular retrieve all method because it has to put "leaf = true" to every items.
                var mileagesArray = [];
                var length = result.rows.length;
                for(var i = 0; i < length; i++){
                    var itm = result.rows.item(i);
                    var panel = Ext.create('Ext.Panel', {
                        items: [{
                            xtype: 'panel',
                            html: itm.name
                        }, {
                            xtype: 'button',
                            text: 'Make Default',
                            id: 'setDefaultCar'
                        }]
                    });
                    this.getCarScreen().insert(i, panel);
                          this.getCarScreen().setActiveItem(0);
                }
            }.bind(this));
        }.bind(this), this.displayError, this.displayCompleted);
    },
    
    doSave: function() {
        var formValues = this.getCarInputForm().getValues();
           
        DB.transaction(function(tx){
            tx.executeSql('INSERT INTO Cars (license, name, current_mileage, is_default) VALUES ("' + formValues.license + '", "' + formValues.name + '", ' + formValues.current_mileage + ', 1)');
        }, this.displayError, this.displayCompleted);
    },
    
    doClear: function() {
        this.getCarInputForm().reset();
    },
           
//    doView: function() {
//        var mileageView = this.getMileageView();
//        this.getMileageScreen().setActiveItem(1);
//        DB.transaction(function(tx){
//            tx.executeSql('SELECT * FROM Mileages', [], function(tx, result){ //Cannot use the regular retrieve all method because it has to put "leaf = true" to every items.
//                var rootObj = {};
//                var mileagesArray = [];
//                var length = result.rows.length;
//                for(var i = 0; i < length; i++){
//                    var itm = result.rows.item(i);
//                    itm.leaf = true,
//                    mileagesArray[i] = itm;
//                }
//                rootObj.mileages = mileagesArray;
//                          
//                var store = Ext.create('Ext.data.TreeStore', {
//                    model: 'AutoDashMobile.model.Mileage',
//                    defaultRootProperty: 'mileages',
//                    root: rootObj
//                });
//                          
//                mileageView.setStore(store);
//            });
//        }, this.displayError, this.displayCompleted);
//    },
//           
//    doEnter: function() {
//        this.getMileageScreen().setActiveItem(0);
//    },
//           
    displayError: function(error){
        alert('Failed to access local database: ' + error.message);
    },

    displayCompleted: function(){
    }//,
           
//    doSync: function(){
//        DB.transaction(function(tx){
//            tx.executeSql('SELECT start, end, date FROM Mileages', [], function(tx, result){
//                var allPhoneMileage = [];
//                var length = result.rows.length;
//                for(var i = 0; i < length; i++){
//                var itm = result.rows.item(i);
//                    allPhoneMileage[i] = itm;
//                }
//                          
//            Ext.Ajax.request({
//                url: 'http://192.168.0.40:3000/mileages/sync_mileage.json', //TODO: Use http://70.79.15.18:3000/
//                method: 'POST',
//                headers: {
//                    'X-CSRF-Token': 'meta[name="csrf-token"]' //TODO: Fix this somehow
//                },
//                scope: this,
//                params: {
//                    data: Ext.JSON.encode(allPhoneMileage)
//                },
//                success: function(response) {
//                    console.log(response.responseText);
//                },
//                failure: function(response) {
//                    alert(response.responseText);
//                }
//            });
//                          
//            }.bind(this), this.displayError, this.displayCompleted);
//        }.bind(this));
//    }
});
