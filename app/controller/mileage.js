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
            mileageView: '#mileageView',
            mileageSegBtn: '#mileageSegBtn',
            carSelectionField: '#carSelectionField'
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
            },
            '#carScreen' : {
               newCarAdded: 'updateCarList'
            }
           
        }
    },
           
    launch: function(){
        if(DB == undefined){
            DB = window.openDatabase(DB_NAME, DB_VERSION, DB_DISPLAY_NAME, DB_SIZE);
        }
        this.updateCarList();
    },
    
    doSave: function() {
        var formValues = this.getMileageInputForm().getValues();
        var dateStr = Ext.Date.format(formValues.date, DATE_FORMAT);
        var thisController = this;
        var viewBtn = this.getViewMileageBtn();
        var mileageSegBtn = this.getMileageSegBtn();
           
        DB.transaction(function(tx){
            //Insert a new mileage record
            tx.executeSql('INSERT INTO Mileages (start, end, date, car_id, destination, purpose) VALUES (' + formValues.start + ', ' + formValues.end + ', "' + dateStr + '", ' + formValues.car_id + ', "' + formValues.destination + '", "' + formValues.purpose + '")', [], function(tx, result){
                thisController.doClear();
                thisController.doView();
                mileageSegBtn.setPressedButtons([viewBtn]);
            });
            //Update current car mileage
            tx.executeSql('UPDATE Cars SET current_mileage = ' + formValues.end + ' WHERE id = ' + formValues.car_id, [], function(tx, result){
                thisController.getMileageScreen().fireEvent('newMileageAdded', formValues.car_id, formValues.end);
            });
        }, this.displayError, this.displayCompleted);
    },
    
    doClear: function() {
        this.getMileageInputForm().reset();
    },
           
    doView: function() {
        var mileageView = this.getMileageView();
        this.getMileageScreen().setActiveItem(1);
        DB.transaction(function(tx){
            tx.executeSql('SELECT Mileages.start, Mileages.end, Mileages.date, Mileages.destination, Mileages.purpose, Cars.current_mileage, Cars.name AS car_name FROM Mileages INNER JOIN Cars ON Mileages.car_id = Cars.id', [], function(tx, result){ //Cannot use the regular retrieve all method because it has to put "leaf = true" to every items.
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
        alert('Failed to access local database: ' + error.message);
    },

    displayCompleted: function(){
    },
           
    doSync: function(){ //TODO: this should be global
        var thisController = this;
        DB.transaction(function(tx){
            tx.executeSql('SELECT start, end, date FROM Mileages', [], function(tx, result){
                var allPhoneMileage = [];
                var length = result.rows.length;
                for(var i = 0; i < length; i++){
                var itm = result.rows.item(i);
                    allPhoneMileage[i] = itm;
                }
                          
                Ext.Ajax.request({
                    url: 'http://172.16.99.226:3000/mileages/sync_mileage.json', //TODO: Use http://70.79.15.18:3000/
                    method: 'POST',
    //                headers: {
    //                    'X-CSRF-Token': 'meta[name="csrf-token"]' //TODO: Fix this somehow
    //                },
    //                scope: this,
                    params: {
                        data: Ext.JSON.encode(allPhoneMileage)
                    },
                    success: function(response) {
                        alert('Completed');
    //                    console.log(response.responseText);
                    },
                    failure: function(response) {
                        alert(response);
                    }
                });
                          
            }, thisController.displayError, thisController.displayCompleted);
        });
    },
           
    updateCarList: function(){
        var thisController = this;
        DB.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS Mileages (id INTEGER PRIMARY KEY AUTOINCREMENT, start INTEGER NOT NULL, end INTEGER NOT NULL, date TEXT NOT NULL, car_id INTEGER NOT NULL, destination TEXT, purpose TEXT, was_synced INTEGER DEFAULT 0, FOREIGN KEY(car_id) REFERENCES Cars(id))'); //TODO: Figure out why FOREIGN KEY doesn't do the validation
            //Build Car list
            tx.executeSql('SELECT * FROM Cars', [], function(tx, result){ //TODO: Need to make sure that Cars table exists
                var carArray = [];
                for(var i = 0; i < result.rows.length; i++){
                    var itm = result.rows.item(i);
                    carArray[i] = itm;
                }
                var carStore = Ext.create('Ext.data.Store', {
                    model: 'AutoDashMobile.model.Car',
                    data: carArray
                });
                thisController.getCarSelectionField().setStore(carStore);
            });
        });
    }
});
