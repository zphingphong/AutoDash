Ext.define('AutoDashMobile.controller.Mileage', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            mileageScreen: '#mileageScreen',
            viewMileageBtn: '#viewMileage',
            enterMileageBtn: '#enterMileage',
            saveBtn: '#saveMileage',
            clearBtn: '#clearMileage',
            syncDataBtn: '#syncData',
            mileageInputForm: '#mileageInputForm',
            mileageHistoryStore: '#mileageHistoryStore',
            mileageView: '#mileageView'
        }, 
        
        control: {
            saveBtn: {
                tap: 'doSave'
            },
            clearBtn: {
                tap: 'doClear'
            },
            syncDataBtn: {
                tap: 'doSync'
            },
            viewMileageBtn : {
                tap: 'doView'
            },
            enterMileageBtn : {
               tap: 'doEnter'
            }
           
        }
    },
           
    init: function(){
        if(DB == undefined){
            DB = window.openDatabase(DB_NAME, DB_VERSION, DB_DISPLAY_NAME, DB_SIZE);
        }
        DB.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS Mileages (id INTEGER PRIMARY KEY UNIQUE NOT NULL, start INTEGER NOT NULL, end INTEGER NOT NULL, date TEXT NOT NULL, carId INTEGER)');
        }, this.displayError);
    },
    
    doSave: function() {
        var formValues = this.getMileageInputForm().getValues();
        var dateStr = Ext.Date.format(formValues.date, DATE_FORMAT);
           
        DB.transaction(function(tx){
            tx.executeSql('INSERT INTO Mileages (start, end, date, carId) VALUES (' + formValues.start + ', ' + formValues.end + ', "' + dateStr + '", 1)');
        }, this.displayError, this.displayCompleted);
    },
    
    doClear: function() {
    },
           
    doView: function() {
        var mileageView = this.getMileageView();
        this.getMileageScreen().setActiveItem(1);
        DB.transaction(function(tx){
            tx.executeSql('SELECT * FROM Mileages', [], function(tx, result){ //Cannot use the reguar retrieve all method because it has to put "leaf = true" to every items.
                var rootObj = {};
                var mileagesArray = [];
                var length = result.rows.length;
                for(var i = 0; i < length; i++){
                    var itm = result.rows.item(i);
                    itm.leaf = true,
                    mileagesArray[i] = itm;
                }
                rootObj.mileages = mileagesArray;
                          
                var store = Ext.create('Ext.data.TreeStore', {
                    model: 'AutoDashMobile.model.Mileage',
                    defaultRootProperty: 'mileages',
                    root: rootObj
                });
                          
                mileageView.setStore(store);
            });
        }, this.displayError, this.displayCompleted);
    },
           
    doEnter: function() {
        this.getMileageScreen().setActiveItem(0);
    },
           
    displayError: function(error){
        alert('Failed to access local Database');
    },

    displayCompleted: function(){
    },
           
    doSync: function(){
        DB.transaction(function(tx){
            tx.executeSql('SELECT * FROM Mileages', [], function(tx, result){
                          var allPhoneMileage = [];          
                
                var length = result.rows.length;
                for(var i = 0; i < length; i++){
                var itm = result.rows.item(i);
                    allPhoneMileage[i] = itm;
                }
                          
                          console.log(allPhoneMileage);
                          
            }.bind(this), this.displayError, this.displayCompleted);
        }.bind(this));
           
//        Ext.Ajax.request({
//            url: 'http://192.168.0.40:3000/mileages.json', //TODO: Use http://70.79.15.18:3000/
//            method: 'POST',
//            headers: {
//                'X-CSRF-Token': 'meta[name="csrf-token"]' //TODO: Fix this somehow
//            },
//            scope: this,
//            params: this.getMileageInputForm().getValues(),
//            success: function(response) {
//                         alert(response.responseText);
//            },
//            failure: function(response) {
//                alert(response.responseText);
//            }
//        });
    }
});
