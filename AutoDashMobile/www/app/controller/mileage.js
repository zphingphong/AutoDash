Ext.define('AutoDashMobile.controller.Mileage', {
    extend: 'Ext.app.Controller',
           myname: 'PAN',
    
    config: {
        refs: {
            mileageScreen: '#mileageScreen',
            viewMileageBtn: '#viewMileage',
            enterMileageBtn: '#enterMileage',
            saveBtn: '#saveMileage',
            clearBtn: '#clearMileage',
            mileageInputForm: '#mileageInputForm'
        }, 
        
        control: {
            saveBtn: {
                tap: 'doSave'
            },
            clearBtn: {
                tap: 'doClear'
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
            tx.executeSql('INSERT INTO Mileages (start, end, date, carId) VALUES (' + formValues.startMileage + ', ' + formValues.endMileage + ', "' + dateStr + '", 1)');
        }, this.displayError, this.displayCompleted);
    },
    
    doClear: function() {
    },
           
    doView: function() {
        this.getMileageScreen().setActiveItem(1);
    },
           
    doEnter: function() {
        this.getMileageScreen().setActiveItem(0);
    },
           
    displayError: function(error){
        alert('Failed to access local Database');
    },

    displayCompleted: function(){
    }
});
