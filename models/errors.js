// acceess, form, validation = 400

class AuthError extends Error {
    constructor(props) {
      super(props);
      this.status = 401;
      this.type = 'AuthError';
    }
  }
  
  module.exports = AuthError;


// alt version:

class ErrHandler {
    constructor(status,msg) {
        this.status = status;
        this.msg = msg;
    }

    static needToLogin = () => {
        return new ErrHandler(401,'Please login to continue');
    }

    static userNotFound = () => {
        return new ErrHandler(404,'User not found');
    }

    static loginFailed = () => {
        return new ErrHandler(403,'login attempt failed');
    }
}


// app.get('/route-with-possible-error', async (req, res, next) => {
//     try {
//         // ... handler code
//     } catch (err) {
//         next(err);
//     }
//  });

 
module.exports = ErrHandler;