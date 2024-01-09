'use strict';

var self = module.exports = {
    checkMissingKey: (obj, objCheck) => {
        for (let i = 0; i < objCheck.length; i++) {
            if (!obj.hasOwnProperty(objCheck[i])) {
                return objCheck[i]
            }
        }

        return 'okay';
    }
}