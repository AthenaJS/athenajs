import Display from 'Display/Display';

    /*jshint devel: true*/
		class DisplayManager{
			constructor(options) {
				  console.log('[DisplayManager] Init()'/*, options*/);

                  this.displays = {};
			   }
         
            addDisplay(options, target) {
                console.log('[Display Manager] adding display', options.name/*, 'with options', options*/);

                this.displays[options.name] = new Display(options, target);

                return this.displays[options.name];
            }
        
            getDisplay(id) {
                return this.displays[id];
            }
		};

    console.log('end DisplayManager');
    export default new DisplayManager();
