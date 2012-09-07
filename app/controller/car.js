Ext.define('AutoDashMobile.controller.Car', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            carScreen: '#carScreen',
            saveBtn: '#saveCar',
            newBtn: '#newCar',
            clearBtn: '#clearCar',
            nextBtn: '#nextCar',
            previousBtn: '#previousCar',
            carInputForm: '#carInputForm',
            carImage: '#carImage',
            takePhotoCarBtn: '#takePhotoCar',
            selectPhotoCarBtn: '#selectPhotoCar'
        }, 
        
        control: {
            saveBtn: {
                tap: 'doSave'
            },
            clearBtn: {
                tap: 'doClear'
            },
            newBtn: {
                tap: 'doNew'
            },
            nextBtn: {
                tap: 'doNext'
            },
            previousBtn: {
                tap: 'doPrevious'
            },
            takePhotoCarBtn: {
                tap: 'doTakePhoto'
            },
            selectPhotoCarBtn: {
                tap: 'doSelectPhoto'
            }
        }
    },
           
    launch: function(){
           
        var carScreen = this.getCarScreen();
        var thisController = this;
           
        if(DB == undefined){
            DB = window.openDatabase(DB_NAME, DB_VERSION, DB_DISPLAY_NAME, DB_SIZE);
        }
        DB.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS Cars (id INTEGER PRIMARY KEY AUTOINCREMENT, license TEXT, name TEXT NOT NULL, current_mileage INTEGER NOT NULL, image BLOB, is_default INTEGER, was_synced INTEGER DEFAULT 0)');
        }, this.displayError);
           
        DB.transaction(function(tx){
            tx.executeSql('SELECT * FROM Cars', [], function(tx, result){
                var length = result.rows.length;
                for(var i = 0; i < length; i++){
                    var itm = result.rows.item(i);
                    var panel = Ext.create('Ext.Panel', {
                        id: 'car' + itm.id,
                        items: [{
                            xtype: 'panel',
                            html: itm.name //TODO: Make it prettier
                        }, {
                            xtype: 'button',
                            text: 'Make Default', //TODO: Make it works
                            iconMask: true,
                            iconCls: 'star',
                            margin: '10 0 0 0'
                        }, {
                            xtype: 'button',
                            text: 'Delete',
                            iconMask: true,
                            iconCls: 'trash',
                            ui: 'red',
                            margin: '10 0 0 0',
                            handler: function() {
                                var currentCar = carScreen.getActiveItem();
                                carScreen.remove(currentCar, true);
                                   
                                DB.transaction(function(tx){
                                    tx.executeSql('DELETE FROM Cars WHERE id = ' + currentCar.getId().substring(3));
                                }, thisController.displayError, thisController.displayCompleted);
                            }
                        }]
                    });
                    carScreen.insert(i, panel);
                    carScreen.setActiveItem(0);
                }
            }, thisController.displayError, thisController.displayCompleted);
        });
    },
    
    doSave: function() {
        var formValues = this.getCarInputForm().getValues();
        var carScreen = this.getCarScreen();
        var thisController = this;
           
        DB.transaction(function(tx){
            tx.executeSql('INSERT INTO Cars (license, name, current_mileage, is_default) VALUES ("' + formValues.license + '", "' + formValues.name + '", ' + formValues.current_mileage + ', 1)', [], function(tx, result){
                var panel = Ext.create('Ext.Panel', {
                    id: 'car' + result.insertId,
                    items: [{
                        xtype: 'panel',
                        html: formValues.name //TODO: Make it prettier
                    }, {
                        xtype: 'button',
                        text: 'Make Default',
                        iconMask: true,
                        iconCls: 'star',
                        margin: '10 0 0 0'
                    }, {
                        xtype: 'button',
                        text: 'Delete',
                        iconMask: true,
                        iconCls: 'trash',
                        ui: 'red',
                        margin: '10 0 0 0',
                        handler: function() {
                            var currentCar = carScreen.getActiveItem();
                            carScreen.remove(currentCar, true);
                               
                            DB.transaction(function(tx){
                                tx.executeSql('DELETE FROM Cars WHERE id = ' + currentCar.getId().substring(3));
                            }, thisController.displayError, thisController.displayCompleted);
                        }
                    }]
                });
                carScreen.insert(0, panel);
                carScreen.setActiveItem(0);
            }, this.displayError, this.displayCompleted);
        }, this.displayError, this.displayCompleted);
    },
    
    doClear: function() {
        this.getCarInputForm().reset();
    },
          
    displayError: function(error){
        alert('Failed to access local database: ' + error.message);
    },

    displayCompleted: function(){
    },
           
    doNew: function() {
        this.getCarScreen().setActiveItem(this.getCarInputForm());
    },
           
    doNext: function() {
        this.getCarScreen().next();
    },
           
    doPrevious: function() {
        this.getCarScreen().previous();
    },
           
    doTakePhoto: function() {
        var thisController = this;
        function onSuccess(imageData) {
            thisController.getCarImage().setSrc("data:image/png;base64," + imageData);
        };

        function onFail(message) {
            alert(message);
        };
           
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.PNG,
            targetWidth: 150,
            targetHeight: 150
        }); 
    },
           
    doSelectPhoto: function() {
        var thisController = this;
           
        function onSuccess(imageData) {
            thisController.getCarImage().setSrc("data:image/png;base64," + imageData);
        };

        function onFail(message) {
            alert(message);
        };
           
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: Camera.EncodingType.PNG,
            targetWidth: 150,
            targetHeight: 150
        }); 
           
           
//        Ext.device.Camera.capture({
//            success: function(image) {
//                this.getCarImage().setSrc(image);
//            },
//            quality: 75,
//            width: 150,
//            height: 150,
//            source: 'album'
//        }, this, 'data', 'png', 150, 150);
    }
});
