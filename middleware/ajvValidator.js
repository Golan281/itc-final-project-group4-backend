//move this to midware folder:

const Ajv = require("ajv");
const ajvFormats = require("ajv-formats");
const ajvInstance = new Ajv();
ajvFormats(ajvInstance);
//schema validator:
const validator = (schema) => {
    
    return (req, res, next) => {
        try {

            const validator = ajvInstance.compile(schema);
    
            const valid = validator(req.body); //returns true/false
            
            if (!valid) {
                console.log('ajv validator says that validation is>', valid);
                //return the specific errors here
                let errString = "";
                for (const error of validator.errors) {
                    // console.log(error.message);
                    errString+=error.message;
                  }
                throw new Error(`schema validation failed - ${errString}`);
                // return next(`user input validation failed, missing fields: ${errString}`);
            }
            // console.log(errString)
            next();
        } catch (err) {
            next(err.message);
        }

    }
}

module.exports = validator;