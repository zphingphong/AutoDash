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
            },
            '#mileageScreen' : {
               newMileageAdded: 'updateCarMileage'
            }
        }
    },
           
    launch: function(){  
        if(DB == undefined){
            DB = window.openDatabase(DB_NAME, DB_VERSION, DB_DISPLAY_NAME, DB_SIZE);
        }
        DB.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS Cars (id INTEGER PRIMARY KEY AUTOINCREMENT, license TEXT, name TEXT NOT NULL, current_mileage INTEGER NOT NULL, image BLOB, is_default INTEGER, was_synced INTEGER DEFAULT 0)');
        }, this.displayError);
           
           this.refreshCarList();
    },
    
    doSave: function() {
        var formValues = this.getCarInputForm().getValues();
        var carScreen = this.getCarScreen();
        var thisController = this;
           
        DB.transaction(function(tx){
            tx.executeSql('INSERT INTO Cars (license, name, current_mileage, image, is_default) VALUES ("' + formValues.license + '", "' + formValues.name + '", ' + formValues.current_mileage + ', "' + thisController.getCarImage().getSrc() + '", 1)', [], function(tx, result){
                var carTpl = new Ext.XTemplate(
                    '<div class="car-name">{name}</div>',
                    '<div class="info-field">[License] <span class="value-field">{license}</span></div>',
                    '<div class="info-field">[Current Mileage] <span class="value-field">{current_mileage}</span></div>' //TODO: Change this to current mileage. Collects data everytimes it's added.
                );
                var panel = Ext.create('Ext.Panel', {
                    id: 'car' + result.insertId,
                    scrollable: {
                        direction: 'vertical',
                        directionLock: true
                    },
                    items: [{
                        xtype: 'image',
                        width: IMAGE_DIMENSION,
                        height: IMAGE_DIMENSION,
                        margin: '10 auto',
                        src: thisController.getCarImage().getSrc()
                    }, {
                        xtype: 'panel',
                        data: formValues,
                        itemId: 'carInfoPanel',
                        tpl: carTpl
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
                        margin: '10 0 10 0',
                        handler: function() {
                            var currentCar = carScreen.getActiveItem();
                            carScreen.remove(currentCar, true);
                               
                            DB.transaction(function(tx){
                                tx.executeSql('DELETE FROM Cars WHERE id = ' + currentCar.getId().substring(3));
                            }, thisController.displayError, thisController.displayCompleted);
                        }
                    }]
                });
                var carInfoPanel = panel.getComponent('carInfoPanel');
                carInfoPanel.setHtml(carInfoPanel.getTpl().apply(formValues));
                carScreen.insert(0, panel);
                carScreen.setActiveItem(0);
                thisController.doClear();
                carScreen.fireEvent('newCarAdded');
            }, this.displayError, this.displayCompleted);
        }, this.displayError, this.displayCompleted);
    },
    
    doClear: function() {
        this.getCarInputForm().reset();
        this.getCarImage().setSrc(BLANK_IMAGE);
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
            targetWidth: IMAGE_DIMENSION,
            targetHeight: IMAGE_DIMENSION
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
            targetWidth: IMAGE_DIMENSION,
            targetHeight: IMAGE_DIMENSION
        }); 
    },
           
    refreshCarList: function() {
        var carScreen = this.getCarScreen();
        var thisController = this;
           
        DB.transaction(function(tx){
            tx.executeSql('SELECT * FROM Cars', [], function(tx, result){
                var length = result.rows.length;
                for(var i = 0; i < length; i++){
                    var itm = result.rows.item(i);
                    var carTpl = new Ext.XTemplate(
                        '<div class="car-name">{name}</div>',
                        '<div class="info-field">[License] <span class="value-field">{license}</span></div>',
                        '<div class="info-field">[Current Mileage] <span class="value-field">{current_mileage}</span></div>' //TODO: Change this to current mileage. Collects data everytimes it's added.
                    );
                    var panel = Ext.create('Ext.Panel', {
                        id: 'car' + itm.id,
                        scrollable: {
                            direction: 'vertical',
                            directionLock: true
                        },
                        items: [{
                            xtype: 'image',
                            width: IMAGE_DIMENSION,
                            height: IMAGE_DIMENSION,
                            margin: '10 auto',
                            src: itm.image
                        }, {
                            xtype: 'panel',
                            data: itm,
                            itemId: 'carInfoPanel',
                            tpl: carTpl
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
                            margin: '10 0 10 0',
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
           
    updateCarMileage: function(carId, mileage){//TODO: User real template to do this
        var carInfoPanel = this.getCarScreen().getComponent('car' + carId).getComponent('carInfoPanel');
        var data = carInfoPanel.getData();
        data.current_mileage = mileage;
        carInfoPanel.setHtml(carInfoPanel.getTpl().apply(data));
    }
});
